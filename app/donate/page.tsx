"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";
import { useState } from "react";

export default function DonatePage({ onClose }: { onClose?: () => void }) {
  const [copied, setCopied] = useState(false);

  const copyAccount = () => {
    navigator.clipboard.writeText("6995710587");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // CLOSE BUTTON
  const CloseButton = () =>
    onClose ? (
      <button
        onClick={onClose}
        className="fixed top-5 right-5 z-[99999] w-11 h-11 flex items-center justify-center rounded-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border border-gray-200 dark:border-gray-700 hover:scale-110 transition"
      >
        <X className="w-5 h-5" />
      </button>
    ) : null;

  return (
    <div className="bg-gray-50 py-16 sm:py-24 relative">
      <CloseButton />

      <Container>
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Support Our Mission
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Your support helps us provide life-saving education, advocacy,
            and care for families affected by asthma.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_60px_rgba(8,8,178,0.15)] border border-gray-100/50 dark:border-gray-800 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* LEFT */}
            <div className="p-12 sm:p-16 flex flex-col justify-center bg-brand text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl" />

              <Heart className="h-14 w-14 mb-8 text-blue-300 drop-shadow-lg" />

              <h2 className="text-4xl font-extrabold mb-6">
                Why Donate?
              </h2>

              <ul className="space-y-6 text-blue-50 text-lg leading-relaxed">
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">&bull;</span>
                  Fund asthma education workshops for low-income families.
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">&bull;</span>
                  Provide emergency inhalers and spacers to schools.
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">&bull;</span>
                  Support advocacy for cleaner air policies.
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">&bull;</span>
                  Train community health workers.
                </li>
              </ul>
            </div>

            {/* RIGHT */}
            <div className="p-12 sm:p-16 flex flex-col justify-center bg-white dark:bg-gray-900">
              
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
                Donate via Bank Transfer
              </h2>

              {/* BANK DETAILS */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 mb-6 space-y-3">
                <p className="text-sm text-gray-500">Account Number</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  6995710587
                </p>

                <p className="text-sm text-gray-500 mt-4">Bank</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Moniepoint
                </p>

                <p className="text-sm text-gray-500 mt-4">Account Name</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  OFAS
                </p>
              </div>

              {/* COPY BUTTON */}
              <Button
                onClick={copyAccount}
                className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold"
              >
                {copied ? "Copied!" : "Copy Account Number"}
              </Button>

              {/* CONTACT */}
              <div className="mt-10">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  For Partnerships & Collaboration
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Email:{" "}
                  <a
                    href="mailto:theofascommunity@gmail.com"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    theofascommunity@gmail.com
                  </a>
                </p>
              </div>

              <p className="mt-8 text-sm text-center text-gray-500">
                Thank you for supporting OFAS 💙
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}