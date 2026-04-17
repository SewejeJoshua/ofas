"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CreditCard, Heart, X } from "lucide-react";
import { useState } from "react";

export default function DonatePage({ onClose }: { onClose?: () => void }) {
  const [amount, setAmount] = useState("50");
  const [customAmount, setCustomAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const finalAmount = amount === "other" ? customAmount : amount;

  async function handleDonate() {
    if (!finalAmount) return;

    setIsSubmitting(true);

    await new Promise((r) => setTimeout(r, 1200));

    console.log("Donated:", finalAmount);

    setIsSubmitting(false);
    setIsSuccess(true);
  }

  const CloseButton = () =>
    onClose ? (
      <button
        onClick={onClose}
        className="
          fixed top-6 right-6 z-[9999]
          p-3 rounded-full
          bg-white/90 dark:bg-gray-900/90
          backdrop-blur-md
          shadow-lg border border-gray-200 dark:border-gray-700
          hover:scale-105 transition
        "
      >
        <X className="w-5 h-5 text-gray-700 dark:text-gray-200" />
      </button>
    ) : null;

  if (isSuccess) {
    return (
      <div className="bg-gray-50 py-16 sm:py-24 relative">
        <CloseButton />

        <Container>
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-10 text-center shadow-xl">
            <div className="text-4xl mb-3">💙</div>
            <h2 className="text-2xl font-bold text-gray-900">
              Thank you for your support!
            </h2>
            <p className="text-gray-600 mt-2">
              Your donation helps us make a real impact.
            </p>

            <Button
              onClick={() => {
                setIsSuccess(false);
                setAmount("50");
                setCustomAmount("");
              }}
              className="mt-6 rounded-full"
              variant="outline"
            >
              Make another donation
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16 sm:py-24 relative">
      <CloseButton />

      <Container>
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl font-heading">
            Support Our Mission
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Your generous donation helps us provide life-saving education,
            advocacy, and support to families affected by asthma.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_60px_rgba(8,8,178,0.15)] border border-gray-100/50 dark:border-gray-800 overflow-hidden relative">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* LEFT */}
            <div className="p-12 sm:p-16 flex flex-col justify-center bg-brand text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl" />

              <Heart className="h-14 w-14 mb-8 text-blue-300 drop-shadow-lg" />

              <h2 className="text-4xl font-extrabold font-heading mb-6 tracking-tight">
                Why Donate?
              </h2>

              <ul className="space-y-6 text-blue-50 text-lg leading-relaxed">
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">&bull;</span>
                  <span>
                    Fund asthma education workshops for low-income families.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">&bull;</span>
                  <span>
                    Provide emergency inhalers and spacers to schools.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">&bull;</span>
                  <span>
                    Support advocacy efforts for cleaner air legislation.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">&bull;</span>
                  <span>Train community health workers.</span>
                </li>
              </ul>
            </div>

            {/* RIGHT */}
            <div className="p-12 sm:p-16 flex flex-col justify-center bg-white dark:bg-gray-900">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
                Choose an Amount
              </h2>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {["25", "50", "100", "250", "500"].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => {
                      setAmount(amt);
                      setCustomAmount("");
                    }}
                    className={`h-14 rounded-xl font-bold transition ${
                      amount === amt
                        ? "bg-blue-600 text-white shadow-lg"
                        : "border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    ${amt}
                  </button>
                ))}

                <button
                  onClick={() => setAmount("other")}
                  className={`h-14 rounded-xl font-bold transition ${
                    amount === "other"
                      ? "bg-blue-600 text-white"
                      : "border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  Other
                </button>
              </div>

              {amount === "other" && (
                <input
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-gray-100 dark:bg-gray-800 mb-6 outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}

              <div className="mb-6 text-sm text-gray-500">
                Donation Amount:{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${finalAmount || "0"}
                </span>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleDonate}
                  disabled={isSubmitting || !finalAmount}
                  className="w-full h-14 text-lg font-bold flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500"
                >
                  <CreditCard className="h-5 w-5" />
                  {isSubmitting ? "Processing..." : "Donate with Card"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-14 text-lg font-bold flex items-center justify-center gap-3"
                >
                  Donate with PayPal
                </Button>
              </div>

              <p className="mt-8 text-sm text-center text-gray-500">
                Secure payment processing by Stripe. <br />
                OFAS is a non-profit organization.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}