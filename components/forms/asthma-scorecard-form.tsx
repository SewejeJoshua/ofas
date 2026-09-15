"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const API_URL =
  process.env.NEXT_PUBLIC_OFAS_API_URL ||
  "https://backend-ofascommunity.onrender.com";

type FormData = {
  full_name: string;
  volunteer_id: string;
  state_lga: string;
  phone_number: string;
  date_of_birth: string;
  q1_answer: string;
  q2_answer: string;
  q3_answer: string;
  q4_answer: string;
  q5_answer: string;
};

type Recommendation = {
  status: string;
  actions: string[];
};

type ResultType = {
  id: number;
  full_name: string;
  volunteer_id: string;
  state_lga: string;
  phone_number: string;
  date_of_birth: string;
  q1_answer: string;
  q2_answer: string;
  q3_answer: string;
  q4_answer: string;
  q5_answer: string;
  total_score: number;
  status: string;
  recommendation: Recommendation;
  created_at: string;
};

type Question = {
  id: keyof Pick<
    FormData,
    "q1_answer" | "q2_answer" | "q3_answer" | "q4_answer" | "q5_answer"
  >;
  question: string;
  options: {
    value: string;
    label: string;
  }[];
};

/*
|--------------------------------------------------------------------------
| Questions
|--------------------------------------------------------------------------
|
| IMPORTANT:
| These values MUST exactly match the backend Q1_SCORES - Q5_SCORES keys.
|
*/

const questions: Question[] = [
  {
    id: "q1_answer",
    question:
      "During the past 4 weeks, how often did asthma keep you from getting as much done at work, school, or at home?",
    options: [
      {
        value: "all_of_the_time",
        label: "All of the time",
      },
      {
        value: "most_of_the_time",
        label: "Most of the time",
      },
      {
        value: "some_of_the_time",
        label: "Some of the time",
      },
      {
        value: "a_little_of_the_time",
        label: "A little of the time",
      },
      {
        value: "none_of_the_time",
        label: "None of the time",
      },
    ],
  },

  {
    id: "q2_answer",
    question:
      "During the past 4 weeks, how often have you had shortness of breath?",
    options: [
      {
        value: "more_than_once_a_day",
        label: "More than once a day",
      },
      {
        value: "once_a_day",
        label: "Once a day",
      },
      {
        value: "3_to_6_times_a_week",
        label: "3 to 6 times a week",
      },
      {
        value: "once_or_twice_a_week",
        label: "Once or twice a week",
      },
      {
        value: "not_at_all",
        label: "Not at all",
      },
    ],
  },

  {
    id: "q3_answer",
    question:
      "During the past 4 weeks, how often did asthma symptoms wake you up at night?",
    options: [
      {
        value: "4_or_more_nights_a_week",
        label: "4 or more nights a week",
      },
      {
        value: "2_to_3_nights_a_week",
        label: "2 to 3 nights a week",
      },
      {
        value: "once_a_week",
        label: "Once a week",
      },
      {
        value: "once_or_twice",
        label: "Once or twice",
      },
      {
        value: "not_at_all",
        label: "Not at all",
      },
    ],
  },

  {
    id: "q4_answer",
    question:
      "During the past 4 weeks, how often have you used your rescue inhaler or nebulizer medication?",
    options: [
      {
        value: "3_or_more_times_a_day",
        label: "3 or more times a day",
      },
      {
        value: "1_to_2_times_a_day",
        label: "1 to 2 times a day",
      },
      {
        value: "2_to_3_times_a_week",
        label: "2 to 3 times a week",
      },
      {
        value: "once_a_week_or_less",
        label: "Once a week or less",
      },
      {
        value: "not_at_all",
        label: "Not at all",
      },
    ],
  },

  {
    id: "q5_answer",
    question:
      "How would you rate your asthma control during the past 4 weeks?",
    options: [
      {
        value: "not_controlled_at_all",
        label: "Not controlled at all",
      },
      {
        value: "poorly_controlled",
        label: "Poorly controlled",
      },
      {
        value: "somewhat_controlled",
        label: "Somewhat controlled",
      },
      {
        value: "well_controlled",
        label: "Well controlled",
      },
      {
        value: "completely_controlled",
        label: "Completely controlled",
      },
    ],
  },
];

const initialForm: FormData = {
  full_name: "",
  volunteer_id: "",
  state_lga: "",
  phone_number: "",
  date_of_birth: "",
  q1_answer: "",
  q2_answer: "",
  q3_answer: "",
  q4_answer: "",
  q5_answer: "",
};

export default function AsthmaScorecardForm({
  onClose,
}: {
  onClose?: () => void;
}) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ResultType | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Phone Number
  |--------------------------------------------------------------------------
  |
  | The backend expects phone_number to be a STRING.
  |
  | 08012345678      -> +2348012345678
  | 2348012345678    -> +2348012345678
  | +2348012345678   -> +2348012345678
  |
  */

  const normalizePhoneNumber = (phone: string) => {
    let value = phone.trim();

    value = value.replace(/[\s\-().]/g, "");

    if (value.startsWith("0")) {
      value = `+234${value.substring(1)}`;
    }

    if (value.startsWith("234") && !value.startsWith("+234")) {
      value = `+${value}`;
    }

    return value;
  };

  const validateForm = () => {
    if (!form.full_name.trim()) {
      return "Please enter the patient's full name.";
    }

    if (!form.volunteer_id.trim()) {
      return "Please enter the volunteer ID.";
    }

    if (!form.state_lga.trim()) {
      return "Please enter the state and LGA.";
    }

    if (!form.phone_number.trim()) {
      return "Please enter the phone number.";
    }

    if (!form.date_of_birth) {
      return "Please enter the date of birth.";
    }

    if (!form.q1_answer) {
      return "Please answer question 1.";
    }

    if (!form.q2_answer) {
      return "Please answer question 2.";
    }

    if (!form.q3_answer) {
      return "Please answer question 3.";
    }

    if (!form.q4_answer) {
      return "Please answer question 4.";
    }

    if (!form.q5_answer) {
      return "Please answer question 5.";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setResult(null);

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const phoneNumber = normalizePhoneNumber(form.phone_number);

      /*
       * IMPORTANT:
       * Do NOT convert q1_answer - q5_answer to Number().
       *
       * The backend expects the exact string values used in
       * Q1_SCORES, Q2_SCORES, Q3_SCORES, Q4_SCORES and Q5_SCORES.
       */

      const payload = {
        full_name: form.full_name.trim(),
        volunteer_id: form.volunteer_id.trim(),
        state_lga: form.state_lga.trim(),

        // Always a string
        phone_number: phoneNumber,

        date_of_birth: form.date_of_birth,

        // Exact backend values
        q1_answer: form.q1_answer,
        q2_answer: form.q2_answer,
        q3_answer: form.q3_answer,
        q4_answer: form.q4_answer,
        q5_answer: form.q5_answer,
      };

      console.log("Submitting asthma assessment:", payload);

      const response = await fetch(
        `${API_URL}/api/asthma-assessments/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      let responseData: any = null;

      try {
        responseData = await response.json();
      } catch {
        responseData = null;
      }

      if (!response.ok) {
        console.error("Asthma assessment error:", {
          status: response.status,
          response: responseData,
          payload,
        });

        let errorMessage =
          `Unable to submit asthma assessment. Server returned ${response.status}.`;

        if (responseData) {
          if (typeof responseData === "string") {
            errorMessage = responseData;
          } else if (responseData.detail) {
            errorMessage = responseData.detail;
          } else if (responseData.message) {
            errorMessage = responseData.message;
          } else {
            const entries = Object.entries(responseData);

            if (entries.length > 0) {
              const [field, value] = entries[0];

              if (Array.isArray(value)) {
                errorMessage = `${field}: ${value.join(", ")}`;
              } else if (typeof value === "string") {
                errorMessage = `${field}: ${value}`;
              } else {
                errorMessage = `${field}: ${JSON.stringify(value)}`;
              }
            }
          }
        }

        throw new Error(errorMessage);
      }

      console.log(
        "Asthma assessment submitted successfully:",
        responseData
      );

      setResult(responseData as ResultType);
    } catch (submissionError) {
      console.error("Submission failed:", submissionError);

      if (submissionError instanceof Error) {
        setError(submissionError.message);
      } else {
        setError(
          "Something went wrong while submitting the assessment."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setResult(null);
    setError("");
  };

  /*
  |--------------------------------------------------------------------------
  | SUCCESS SCREEN
  |--------------------------------------------------------------------------
  */

  if (result) {
    return (
      <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Assessment Completed
          </h2>

          <p className="mt-2 text-slate-600">
            The asthma assessment for{" "}
            <strong>{result.full_name}</strong> has been submitted
            successfully.
          </p>
        </div>

        {/* Score and Status */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Total Score</p>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              {result.total_score}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              Asthma Control
            </p>

            <p className="mt-1 font-bold text-slate-900">
              {result.recommendation?.status ||
                result.status ||
                "Assessment completed"}
            </p>
          </div>
        </div>

        {/* Recommendation */}
        {result.recommendation && (
          <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
            <h3 className="text-lg font-bold text-slate-900">
              Recommendation
            </h3>

            {result.recommendation.status && (
              <p className="mt-2 font-semibold text-blue-900">
                {result.recommendation.status}
              </p>
            )}

            {Array.isArray(result.recommendation.actions) &&
              result.recommendation.actions.length > 0 && (
                <ul className="mt-4 space-y-3">
                  {result.recommendation.actions.map(
                    (action, index) => (
                      <li
                        key={`${action}-${index}`}
                        className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                          {index + 1}
                        </span>

                        <span>{action}</span>
                      </li>
                    )
                  )}
                </ul>
              )}
          </div>
        )}

        {/* Patient Information */}
        <div className="mt-6 rounded-xl border border-slate-200 p-5">
          <h3 className="font-bold text-slate-900">
            Patient Information
          </h3>

          <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <p className="text-slate-500">Full Name</p>
              <p className="font-medium text-slate-900">
                {result.full_name}
              </p>
            </div>

            <div>
              <p className="text-slate-500">Volunteer ID</p>
              <p className="font-medium text-slate-900">
                {result.volunteer_id}
              </p>
            </div>

            <div>
              <p className="text-slate-500">State / LGA</p>
              <p className="font-medium text-slate-900">
                {result.state_lga}
              </p>
            </div>

            <div>
              <p className="text-slate-500">Phone Number</p>
              <p className="font-medium text-slate-900">
                {result.phone_number}
              </p>
            </div>

            <div>
              <p className="text-slate-500">Date of Birth</p>
              <p className="font-medium text-slate-900">
                {result.date_of_birth}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="w-full sm:w-auto text-black"
          >
            New Assessment
          </Button>

          {onClose && (
            <Button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
          )}
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | FORM
  |--------------------------------------------------------------------------
  */

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-3xl rounded-2xl bg-white text-black p-5 shadow-lg sm:p-8"
    >
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Asthma Assessment
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Complete all fields accurately to assess the patient's
            level of asthma control.
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close assessment"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <div>
              <p className="font-semibold text-red-800">
                Submission Error
              </p>

              <p className="mt-1 text-sm leading-6 text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Patient Information */}
      <section>
        <h3 className="mb-4 text-lg font-bold text-slate-900">
          Patient Information
        </h3>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Full Name */}
          <div>
            <label
              htmlFor="full_name"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Full Name
            </label>

            <input
              id="full_name"
              name="full_name"
              type="text"
              value={form.full_name}
              onChange={handleChange}
              placeholder="John Adewale"
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
            />
          </div>

          {/* Volunteer ID */}
          <div>
            <label
              htmlFor="volunteer_id"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Volunteer ID
            </label>

            <input
              id="volunteer_id"
              name="volunteer_id"
              type="text"
              value={form.volunteer_id}
              onChange={handleChange}
              placeholder="001"
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
            />
          </div>

          {/* State / LGA */}
          <div>
            <label
              htmlFor="state_lga"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              State / LGA
            </label>

            <input
              id="state_lga"
              name="state_lga"
              type="text"
              value={form.state_lga}
              onChange={handleChange}
              placeholder="Oyo - Ibadan North"
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone_number"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Phone Number
            </label>

            <input
              id="phone_number"
              name="phone_number"
              type="tel"
              value={form.phone_number}
              onChange={handleChange}
              placeholder="08012345678"
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
            />

            <p className="mt-1 text-xs text-slate-500">
              Example: 08012345678
            </p>
          </div>

          {/* Date of Birth */}
          <div className="sm:col-span-2">
            <label
              htmlFor="date_of_birth"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Date of Birth
            </label>

            <input
              id="date_of_birth"
              name="date_of_birth"
              type="date"
              value={form.date_of_birth}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg text-black border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
            />
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="mt-10">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900">
            Asthma Control Questions
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Select the answer that best describes the patient's
            experience.
          </p>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="rounded-xl border border-slate-200 p-5"
            >
              <label
                htmlFor={question.id}
                className="mb-3 block text-sm font-semibold leading-6 text-slate-800"
              >
                <span className="mr-2 text-blue-600">
                  {index + 1}.
                </span>

                {question.question}
              </label>

              <select
                id={question.id}
                name={question.id}
                value={form[question.id]}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
              >
                <option value="">
                  Select an answer
                </option>

                {question.options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </section>

      {/* Submit */}
      <div className="mt-8 border-t border-slate-200 pt-6">
        <Button
          type="submit"
          disabled={loading}
          className="w-full py-6 text-base sm:w-auto"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="h-5 w-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>

              Submitting...
            </span>
          ) : (
            "Submit Assessment"
          )}
        </Button>
      </div>
    </form>
  );
}