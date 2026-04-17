"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CampusRepForm } from "@/components/forms/campus-rep-form";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CampusRepApplyPage() {
  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <Container>

        <Link href="/campus-bases">
          <Button variant="ghost" className="mb-8">
            ← Back to Campus Bases
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold">
            Apply to Start a Chapter
          </h1>
          <p className="mt-4 text-gray-600">
            Help us bring asthma awareness to your campus.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <CampusRepForm />
        </div>

      </Container>
    </div>
  );
}