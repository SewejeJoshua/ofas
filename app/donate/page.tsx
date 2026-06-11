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

  const CloseButton = () =>
    onClose ? (
      <button
        onClick={onClose}
        className="fixed top-5 right-5 z-[99999] w-10 h-10 flex items-center justify-center rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur shadow-lg border hover:scale-105 transition"
      >
        <X className="w-4 h-4" />
      </button>
    ) : null;

  return (
    <div className="py-10 sm:py-16 relative overflow-x-hidden">
      <CloseButton />

      <Container>
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Support Our Mission
          </h1>
          <p className="mt-2 max-w-md mx-auto text-sm text-gray-500">
            Your support helps us provide life-saving education and care.
          </p>
        </div>

        {/* CARD */}
        <div className="max-w-4xl mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-xl border overflow-hidden">
          
          {/* ✅ Only scroll when necessary */}
          <div className="md:max-h-none max-h-[85vh] overflow-y-auto">

            <div className="grid grid-cols-1 md:grid-cols-2">

              {/* LEFT */}
              <div className="p-6 sm:p-8 bg-brand text-white flex flex-col justify-center">
                <Heart className="h-10 w-10 mb-5 text-blue-300" />

                <h2 className="text-xl font-bold mb-4">
                  Why Donate?
                </h2>

                <ul className="space-y-4 text-sm leading-relaxed text-blue-50">
                  <li>• Fund asthma education workshops</li>
                  <li>• Provide emergency inhalers</li>
                  <li>• Support clean air advocacy</li>
                  <li>• Train community health workers</li>
                </ul>
              </div>

              {/* RIGHT */}
              <div className="p-6 sm:p-8 bg-white dark:bg-gray-900 flex flex-col justify-center">

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Bank Transfer
                </h2>

                {/* BANK BOX */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 space-y-2 mb-4">
                  <p className="text-xs text-gray-500">Account Number</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white break-all">
                    0143908583
                  </p>

                  <p className="text-xs text-gray-500 mt-2">Bank</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Sterling Bank
                  </p>

                  <p className="text-xs text-gray-500 mt-2">Account Name</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    The One Family Asthma Support Community
                  </p>
                </div>

                {/* COPY */}
                <Button
                  onClick={copyAccount}
                  className="w-full h-11 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-semibold"
                >
                  {copied ? "Copied!" : "Copy Account Number"}
                </Button>

                {/* CONTACT */}
                <div className="mt-6 text-sm">
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">
                    Partnerships & Collaboration
                  </p>
                  <a
                    href="mailto:theofascommunity@gmail.com"
                    className="text-blue-600 hover:underline break-all"
                  >
                    theofascommunity@gmail.com
                  </a>
                </div>

                <p className="mt-6 text-xs text-center text-gray-500">
                  Thank you for supporting OFAS  
                </p>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
}