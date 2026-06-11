"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function EventsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl"
          >
            {/* CLOSE */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X size={18} />
            </button>

            {/* CONTENT */}
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Recent Updates & Events
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              Stay tuned! Upcoming workshops, outreach programs, and community
              events will appear here.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}