"use client";

import { Container } from "@/components/ui/container";
import { X } from "lucide-react";

export default function BooksPage({ onClose }: { onClose?: () => void }) {
  return (
    <div className="py-10 relative bg-white dark:bg-gray-900 rounded-2xl">

      {/* ✅ CLOSE BUTTON (FIXED) */}
      {onClose && (
        <button
          onClick={onClose}
          className="fixed top-5 right-5 z-[10000] w-11 h-11 flex items-center justify-center rounded-full 
          bg-white/90 dark:bg-gray-800/90 backdrop-blur-md 
          border border-gray-200 dark:border-gray-700
          shadow-lg hover:scale-110 active:scale-95 transition"
        >
          <X className="w-5 h-5 text-gray-800 dark:text-white" />
        </button>
      )}

      <Container>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Our Books
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Educational resources and materials to support asthma awareness.
          </p>
        </div>

        {/* BOOK GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <div className="p-5 rounded-xl border bg-gray-50 dark:bg-gray-800">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              Asthma Care Guide
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              A complete guide for managing asthma in children and adults.
            </p>
          </div>

          <div className="p-5 rounded-xl border bg-gray-50 dark:bg-gray-800">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              Clean Air Handbook
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Learn how to reduce environmental triggers and improve air quality.
            </p>
          </div>

        </div>
      </Container>
    </div>
  );
}