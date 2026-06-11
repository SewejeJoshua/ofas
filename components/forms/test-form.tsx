"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type ResultType = {
  full_name: string;
  total_score: number;
  status: string;
  recommendation: string;
};

export default function AsthmaScorecardForm() {
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
    setForm({ ...form, [e.target.name]: e.target.value });
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

      // reset form
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

      {/* ================= RESULT POPUP ================= */}
      {result && (
        <div className="mb-6 p-5 rounded-xl border bg-green-50 border-green-200">
          <h2 className="text-xl font-bold text-green-800">
            Assessment Completed 🎉
          </h2>

          <div className="mt-3 space-y-1 text-sm">
            <p><b>Full Name:</b> {result.full_name}</p>
            <p><b>Total Score:</b> {result.total_score} / 25</p>
            <p>
              <b>Status:</b>{" "}
              <span className="capitalize text-green-700 font-semibold">
                {result.status}
              </span>
            </p>
          </div>

          <div className="mt-3 text-sm text-gray-700">
            <b>Recommendation:</b> {result.recommendation}
          </div>

          <Button className="mt-4" onClick={() => setResult(null)}>
            Take Again
          </Button>
        </div>
      )}

      {/* ================= FORM ================= */}
      {!result && (
        <>
          <h2 className="text-xl font-bold mb-4">
            OFAS ASTHMA CONTROL SCORECARD (AC–OFAS)
          </h2>

          <p className="text-sm text-gray-600 mb-6">
            "Winning Everyday Despite Asthma"
          </p>

          {/* BASIC INFO */}
          <div className="grid gap-3 mb-6">
            <input
              name="full_name"
              placeholder="Full Name"
              className="border p-3 rounded-lg"
              value={form.full_name}
              onChange={handleChange}
            />

            <input
              name="volunteer_id"
              placeholder="OFAS Volunteer ID (optional)"
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

          {/* INSTRUCTIONS */}
          <div className="text-sm bg-blue-50 p-4 rounded-xl border mb-6">
            <p className="font-semibold mb-2">📊 How to Use:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Answer based on the last 4 weeks</li>
              <li>Select the option that best matches your experience</li>
              <li>All questions are scored from 1–5</li>
              <li>Total score determines asthma control level</li>
            </ul>
          </div>

          {/* QUESTIONS */}

          <select
            name="q1_answer"
            className="border p-3 rounded-lg w-full mb-3"
            value={form.q1_answer}
            onChange={handleChange}
          >
            <option value="">Q1: Activity limitation</option>
            <option value="1">All of the time (1)</option>
            <option value="2">Most of the time (2)</option>
            <option value="3">Some of the time (3)</option>
            <option value="4">A little of the time (4)</option>
            <option value="5">None of the time (5)</option>
          </select>

          <select
            name="q2_answer"
            className="border p-3 rounded-lg w-full mb-3"
            value={form.q2_answer}
            onChange={handleChange}
          >
            <option value="">Q2: Shortness of breath</option>
            <option value="1">More than once a day (1)</option>
            <option value="2">Once a day (2)</option>
            <option value="3">3–6 times a week (3)</option>
            <option value="4">1–2 times a week (4)</option>
            <option value="5">Not at all (5)</option>
          </select>

          <select
            name="q3_answer"
            className="border p-3 rounded-lg w-full mb-3"
            value={form.q3_answer}
            onChange={handleChange}
          >
            <option value="">Q3: Night symptoms</option>
            <option value="1">4+ nights/week (1)</option>
            <option value="2">2–3 nights/week (2)</option>
            <option value="3">Once/week (3)</option>
            <option value="4">1–2 times (4)</option>
            <option value="5">Not at all (5)</option>
          </select>

          <select
            name="q4_answer"
            className="border p-3 rounded-lg w-full mb-3"
            value={form.q4_answer}
            onChange={handleChange}
          >
            <option value="">Q4: Rescue inhaler use</option>
            <option value="1">3+ times/day (1)</option>
            <option value="2">1–2 times/day (2)</option>
            <option value="3">2–3 times/week (3)</option>
            <option value="4">Once/week or less (4)</option>
            <option value="5">Not at all (5)</option>
          </select>

          <select
            name="q5_answer"
            className="border p-3 rounded-lg w-full mb-5"
            value={form.q5_answer}
            onChange={handleChange}
          >
            <option value="">Q5: Overall control</option>
            <option value="1">Not controlled at all (1)</option>
            <option value="2">Poorly controlled (2)</option>
            <option value="3">Somewhat controlled (3)</option>
            <option value="4">Well controlled (4)</option>
            <option value="5">Completely controlled (5)</option>
          </select>

          {/* SUBMIT */}
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