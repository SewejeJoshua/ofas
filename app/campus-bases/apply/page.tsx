import { Container } from "@/components/ui/container";
import { CampusRepForm } from "@/components/forms/campus-rep-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CampusRepApplyPage() {
    return (
        <div className="bg-gray-50 py-16 sm:py-24">
            <Container>
                <div className="mb-8">
                    <Link href="/campus-bases">
                        <Button variant="ghost" className="pl-0 hover:pl-2 transition-all">&larr; Back to Campus Bases</Button>
                    </Link>
                </div>
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold tracking-tight text-black dark:text-white sm:text-5xl font-heading">
                        Apply to Start a Chapter
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-black dark:text-gray-400">
                        Help us bring asthma awareness and support to your campus.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <CampusRepForm />
                </div>
            </Container>
        </div>
    );
}
