import { Container } from "@/components/ui/container";
import { EventRegistrationForm } from "@/components/forms/event-registration-form";

export default function EventsPage() {
    return (
        <div className="bg-gray-50 py-16 sm:py-24">
            <Container>
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold tracking-tight text-black dark:text-white sm:text-5xl font-heading">
                        Events & Workshops
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-black dark:text-gray-400">
                        Join us to learn, connect, and support the cause.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-1 space-y-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Upcoming Schedule</h2>

                        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 dark:border-gray-700 text-center">
                            <p className="text-gray-500 dark:text-gray-400 italic text-sm">
                                Event schedules will be published here soon.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(8,8,178,0.1)] border border-gray-100 dark:border-gray-800 p-2">
                            <div className="p-10 sm:p-12">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 font-heading tracking-tight">Register for an Event</h2>
                                <EventRegistrationForm />
                            </div>
                        </div>
                    </div>
                </div>

            </Container>
        </div>
    );
}
