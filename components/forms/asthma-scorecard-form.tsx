"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  onClose?: () => void;
};

type ResultType = {
  full_name: string;
  total_score: number;
  status: string;
  recommendation: string;
};

export default function AsthmaScorecardForm({ onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultType | null>(null);

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
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(
        `${API_URL?.replace(/\/$/, "")}/api/asthma-assessments/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.detail || "Submission failed");
      }

      setResult({
        full_name: data.full_name,
        total_score: data.total_score,
        status: data.status,
        recommendation: data.recommendation,
      });
    } catch {
      setResult({
        full_name: form.full_name || "User",
        total_score: 0,
        status: "error",
        recommendation:
          "Submission failed. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 text-gray-900">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">
          OFAS ASTHMA CONTROL SCORECARD
        </h2>

        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ×
          </button>
        )}
      </div>

      {result ? (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-green-700">
            Assessment Completed
          </h3>

          <p>
            <strong>Name:</strong> {result.full_name}
          </p>

          <p>
            <strong>Score:</strong> {result.total_score}
          </p>

          <p>
            <strong>Status:</strong> {result.status}
          </p>

          <p>
            <strong>Recommendation:</strong>{" "}
            {result.recommendation}
          </p>

          <div className="flex gap-3 pt-4">
            <Button onClick={() => setResult(null)}>
              Take Again
            </Button>

            {onClose && (
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <input
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            name="volunteer_id"
            placeholder="Volunteer ID"
            value={form.volunteer_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            name="state_lga"
            placeholder="State / LGA"
            value={form.state_lga}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            name="phone_number"
            placeholder="Phone Number"
            value={form.phone_number}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="date"
            name="date_of_birth"
            value={form.date_of_birth}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <select
            name="q1_answer"
            value={form.q1_answer}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Q1: Activity limitation</option>
            <option value="1">All of the time</option>
            <option value="2">Most of the time</option>
            <option value="3">Some of the time</option>
            <option value="4">A little of the time</option>
            <option value="5">None of the time</option>
          </select>

          <select
            name="q2_answer"
            value={form.q2_answer}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Q2: Shortness of breath</option>
            <option value="1">More than once a day</option>
            <option value="2">Once a day</option>
            <option value="3">3–6 times a week</option>
            <option value="4">1–2 times a week</option>
            <option value="5">Not at all</option>
          </select>

          <select
            name="q3_answer"
            value={form.q3_answer}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Q3: Night symptoms</option>
            <option value="1">4+ nights/week</option>
            <option value="2">2–3 nights/week</option>
            <option value="3">Once/week</option>
            <option value="4">1–2 times</option>
            <option value="5">Not at all</option>
          </select>

          <select
            name="q4_answer"
            value={form.q4_answer}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Q4: Rescue inhaler use</option>
            <option value="1">3+ times/day</option>
            <option value="2">1–2 times/day</option>
            <option value="3">2–3 times/week</option>
            <option value="4">Once/week or less</option>
            <option value="5">Not at all</option>
          </select>

          <select
            name="q5_answer"
            value={form.q5_answer}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Q5: Overall control</option>
            <option value="1">Not controlled at all</option>
            <option value="2">Poorly controlled</option>
            <option value="3">Somewhat controlled</option>
            <option value="4">Well controlled</option>
            <option value="5">Completely controlled</option>
          </select>

          <Button
            className="w-full"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Submitting..." : "Submit Assessment"}
          </Button>
        </div>
      )}
    </div>
  );
}