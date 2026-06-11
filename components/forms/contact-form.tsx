"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type ResultType = {
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
  recommendation: string;
};

export default function AsthmaScorecardForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_OFAS_API_URL;

  const [form, setForm] = useState({
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
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      if (!API_URL) {
        throw new Error("API URL is missing");
      }

      const endpoint = `${API_URL.replace(/\/$/, "")}/api/asthma-assessments/`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      const text = await res.text();

      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      if (!res.ok) {
        throw new Error(
          data?.detail ||
            data?.message ||
            (typeof data === "string" ? data : "Submission failed")
        );
      }

      setResult(data);

      setForm({
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
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 text-gray-900 space-y-6">

      {/* RESULT */}
      {result && (
        <div className="p-5 rounded-xl border bg-green-50 border-green-200">
          <h2 className="text-xl font-bold text-green-800">
            Assessment Completed 🎉
          </h2>

          <p className="mt-2"><b>Name:</b> {result.full_name}</p>
          <p><b>Total Score:</b> {result.total_score}</p>
          <p><b>Status:</b> {result.status}</p>
          <p className="mt-2"><b>Recommendation:</b> {result.recommendation}</p>

          <Button className="mt-4" onClick={() => setResult(null)}>
            Take Again
          </Button>
        </div>
      )}

      {/* TITLE + INSTRUCTIONS */}
      {!result && (
        <>
          <div>
            <h1 className="text-2xl font-bold">
              OFAS ASTHMA CONTROL SCORECARD (AC–OFAS)
            </h1>

            <p className="italic mt-1">
              "Winning Everyday Despite Asthma"
            </p>
          </div>

          <div className="text-sm bg-blue-50 p-4 rounded-xl border space-y-2">
            <p className="font-semibold">📊 How to Use This Scorecard</p>
            <p>· Answer each question based on the last 4 weeks (one month)</p>
            <p>· Circle or tick the number that matches your experience</p>
            <p>· Add up your score at the end</p>
            <p>· Share your score with your OFAS volunteer or team lead</p>
          </div>

          {/* BASIC INFO */}
          <div className="grid gap-3">
            <input
              name="full_name"
              placeholder="Full Name"
              className="border p-3 rounded-lg"
              value={form.full_name}
              onChange={handleChange}
            />

            <input
              name="volunteer_id"
              placeholder="OFAS Volunteer ID (if any)"
              className="border p-3 rounded-lg"
              value={form.volunteer_id}
              onChange={handleChange}
            />

            <input
              name="state_lga"
              placeholder="State / LGA"
              className="border p-3 rounded-lg"
              value={form.state_lga}
              onChange={handleChange}
            />

            <input
              name="phone_number"
              placeholder="Phone Number"
              className="border p-3 rounded-lg"
              value={form.phone_number}
              onChange={handleChange}
            />

            <input
              type="date"
              name="date_of_birth"
              className="border p-3 rounded-lg"
              value={form.date_of_birth}
              onChange={handleChange}
            />
          </div>

          {/* QUESTIONS (UNCHANGED TEXT EXACTLY) */}
          <div className="space-y-6 text-sm">

            <div>
              <p className="font-bold">
                1. In the past 4 weeks, how often did your asthma stop you from doing your normal activities (work, school, farming, market, chores)?
              </p>
              <select name="q1_answer" className="border p-3 w-full rounded-lg mt-2" onChange={handleChange}>
                <option value="">Select</option>
                <option value="1">All of the time 1</option>
                <option value="2">Most of the time 2</option>
                <option value="3">Some of the time 3</option>
                <option value="4">A little of the time 4</option>
                <option value="5">None of the time 5</option>
              </select>
            </div>

            <div>
              <p className="font-bold">
                2. In the past 4 weeks, how often did you have shortness of breath?
              </p>
              <select name="q2_answer" className="border p-3 w-full rounded-lg mt-2" onChange={handleChange}>
                <option value="">Select</option>
                <option value="1">More than once a day 1</option>
                <option value="2">Once a day 2</option>
                <option value="3">3 to 6 times a week 3</option>
                <option value="4">Once or twice a week 4</option>
                <option value="5">Not at all 5</option>
              </select>
            </div>

            <div>
              <p className="font-bold">
                3. In the past 4 weeks, how often did asthma symptoms (cough, wheeze, chest tightness) wake you up at night or early in the morning?
              </p>
              <select name="q3_answer" className="border p-3 w-full rounded-lg mt-2" onChange={handleChange}>
                <option value="">Select</option>
                <option value="1">4 or more nights a week 1</option>
                <option value="2">2 to 3 nights a week 2</option>
                <option value="3">Once a week 3</option>
                <option value="4">Once or twice 4</option>
                <option value="5">Not at all 5</option>
              </select>
            </div>

            <div>
              <p className="font-bold">
                4. In the past 4 weeks, how often did you use your rescue (blue) inhaler or nebules?
              </p>
              <select name="q4_answer" className="border p-3 w-full rounded-lg mt-2" onChange={handleChange}>
                <option value="">Select</option>
                <option value="1">3 or more times a day 1</option>
                <option value="2">1 to 2 times a day 2</option>
                <option value="3">2 to 3 times a week 3</option>
                <option value="4">Once a week or less 4</option>
                <option value="5">Not at all 5</option>
              </select>
            </div>

            <div>
              <p className="font-bold">
                5. In the past 4 weeks, how would you rate your asthma control?
              </p>
              <select name="q5_answer" className="border p-3 w-full rounded-lg mt-2" onChange={handleChange}>
                <option value="">Select</option>
                <option value="1">Not controlled at all 1</option>
                <option value="2">Poorly controlled 2</option>
                <option value="3">Somewhat controlled 3</option>
                <option value="4">Well controlled 4</option>
                <option value="5">Completely controlled 5</option>
              </select>
            </div>

          </div>

          {error && (
            <p className="text-red-500 font-medium">{error}</p>
          )}

          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Assessment"}
          </Button>
        </>
      )}
    </div>
  );
}