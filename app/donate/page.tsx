 
"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";
import { useState } from "react";

export default function DonatePage({ onClose }: { onClose?: () => void }) {
  const [copied, setCopied] = useState(false);

  const copyAccount = () => {
    navigator.clipboard.writeText("0143908583");
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const CloseButton = () =>
    onClose ? (
      <button
        type="button"
        onClick={onClose}
        aria-label="Close donation window"
        className="
          fixed
          top-5
          right-5
          z-[99999]
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-gray-200
          bg-white/90
          text-gray-700
          shadow-lg
          backdrop-blur-xl
          transition-all
          duration-300
          hover:scale-110
          hover:bg-gray-100
          hover:text-red-500
          active:scale-95
          dark:border-gray-700
          dark:bg-gray-900/90
          dark:text-gray-200
          dark:hover:bg-gray-800
          dark:hover:text-red-400
        "
      >
        <X className="h-4 w-4" />
      </button>
    ) : null;

  return (
    <div className="relative overflow-x-hidden py-6 sm:py-10">
      <CloseButton />

      <Container>
        {/* =====================================================
            MAIN DONATION CARD
        ===================================================== */}
        <div
          className="
            mx-auto
            max-w-4xl
            overflow-hidden
            rounded-2xl
            border
            border-gray-200
            bg-white/95
            shadow-2xl
            backdrop-blur-xl
            dark:border-gray-800
            dark:bg-gray-900/95
          "
        >
          {/* ===================================================
              SCROLLABLE CONTENT
              Scrollbar hidden but scrolling still works
          =================================================== */}
          <div
            className="
              max-h-[90vh]
              overflow-y-auto
              [scrollbar-width:none]
              [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {/* =================================================
                HEADER
            ================================================= */}
            <div
              className="
                border-b
                border-gray-100
                px-6
                py-8
                text-center
                sm:px-8
                sm:py-10
                dark:border-gray-800
              "
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/40">
                <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>

              <h1
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-gray-900
                  sm:text-3xl
                  dark:text-white
                "
              >
                Support Our Mission
              </h1>

              <p
                className="
                  mx-auto
                  mt-2
                  max-w-xl
                  text-sm
                  leading-relaxed
                  text-gray-500
                  sm:text-base
                  dark:text-gray-400
                "
              >
                Your support helps us provide life-saving asthma education,
                awareness, advocacy, and care to individuals and communities.
              </p>
            </div>

            {/* =================================================
                CONTENT
            ================================================= */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* =================================================
                  LEFT — WHY DONATE
              ================================================= */}
              <div
                className="
                  flex
                  flex-col
                  justify-center
                  bg-brand
                  p-6
                  text-white
                  sm:p-8
                  lg:p-10
                "
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                  <Heart className="h-6 w-6 text-blue-200" />
                </div>

                <h2 className="mb-4 text-xl font-bold sm:text-2xl">
                  Why Donate?
                </h2>

                <p className="mb-6 text-sm leading-relaxed text-blue-50">
                  Every contribution helps us create greater awareness,
                  improve access to asthma support, and build healthier
                  communities.
                </p>

                <ul className="space-y-4 text-sm leading-relaxed text-blue-50">
                  <li className="flex gap-3">
                    <span className="mt-0.5 text-blue-300">✓</span>
                    <span>Fund asthma education workshops</span>
                  </li>

                  <li className="flex gap-3">
                    <span className="mt-0.5 text-blue-300">✓</span>
                    <span>Provide emergency inhalers</span>
                  </li>

                  <li className="flex gap-3">
                    <span className="mt-0.5 text-blue-300">✓</span>
                    <span>Support clean air advocacy</span>
                  </li>

                  <li className="flex gap-3">
                    <span className="mt-0.5 text-blue-300">✓</span>
                    <span>Train community health workers</span>
                  </li>
                </ul>
              </div>

              {/* =================================================
                  RIGHT — BANK TRANSFER
              ================================================= */}
              <div
                className="
                  flex
                  flex-col
                  justify-center
                  bg-white
                  p-6
                  sm:p-8
                  lg:p-10
                  dark:bg-gray-900
                "
              >
                <h2
                  className="
                    mb-5
                    text-xl
                    font-bold
                    text-gray-900
                    sm:text-2xl
                    dark:text-white
                  "
                >
                  Bank Transfer
                </h2>

                {/* BANK DETAILS */}
                <div
                  className="
                    mb-4
                    space-y-3
                    rounded-xl
                    bg-gray-100
                    p-4
                    dark:bg-gray-800
                  "
                >
                  {/* ACCOUNT NUMBER */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Account Number
                    </p>

                    <p
                      className="
                        mt-1
                        break-all
                        text-lg
                        font-bold
                        tracking-wide
                        text-gray-900
                        dark:text-white
                      "
                    >
                      0143908583
                    </p>
                  </div>

                  {/* BANK */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Bank
                    </p>

                    <p className="mt-1 font-medium text-gray-900 dark:text-white">
                      Sterling Bank
                    </p>
                  </div>

                  {/* ACCOUNT NAME */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Account Name
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        font-medium
                        leading-relaxed
                        text-gray-900
                        dark:text-white
                      "
                    >
                      The One Family Asthma Support Community
                    </p>
                  </div>
                </div>

                {/* COPY BUTTON */}
                <Button
                  type="button"
                  onClick={copyAccount}
                  className="
                    h-11
                    w-full
                    rounded-lg
                    bg-blue-600
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-blue-500
                    hover:shadow-lg
                    hover:shadow-blue-500/20
                    active:translate-y-0
                  "
                >
                  {copied ? "✓ Account Number Copied!" : "Copy Account Number"}
                </Button>

                {/* CONTACT */}
                <div className="mt-7 border-t border-gray-100 pt-6 dark:border-gray-800">
                  <p
                    className="
                      mb-1
                      text-sm
                      font-semibold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    Partnerships & Collaboration
                  </p>

                  <a
                    href="mailto:theofascommunity@gmail.com"
                    className="
                      break-all
                      text-sm
                      text-blue-600
                      transition-colors
                      duration-200
                      hover:text-blue-500
                      hover:underline
                      dark:text-blue-400
                      dark:hover:text-blue-300
                    "
                  >
                    theofascommunity@gmail.com
                  </a>
                </div>

                {/* FOOTER MESSAGE */}
                <p
                  className="
                    mt-7
                    text-center
                    text-xs
                    leading-relaxed
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  Thank you for supporting OFAS and helping us make a
                  difference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
 
