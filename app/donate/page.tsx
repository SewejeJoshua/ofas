import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CreditCard, Heart } from "lucide-react";

export default function DonatePage() {
    return (
        <div className="bg-gray-50 py-16 sm:py-24">
            <Container>
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl font-heading">
                        Support Our Mission
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Your generous donation helps us provide life-saving education, advocacy, and support to families affected by asthma.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_60px_rgba(8,8,178,0.15)] border border-gray-100/50 dark:border-gray-800 overflow-hidden relative">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-12 sm:p-16 flex flex-col justify-center bg-brand text-white relative overflow-hidden">
                            {/* Decorative background element */}
                            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-5 mix-blend-overlay blur-3xl" />

                            <Heart className="h-14 w-14 mb-8 text-blue-300 drop-shadow-lg" />
                            <h2 className="text-4xl font-extrabold font-heading mb-6 tracking-tight">Why Donate?</h2>
                            <ul className="space-y-6 text-blue-50 text-lg leading-relaxed">
                                <li className="flex items-start">
                                    <span className="mr-3 text-2xl leading-none">&bull;</span>
                                    <span>Fund asthma education workshops for low-income families.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 text-2xl leading-none">&bull;</span>
                                    <span>Provide emergency inhalers and spacers to schools.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 text-2xl leading-none">&bull;</span>
                                    <span>Support advocacy efforts for cleaner air legislation.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 text-2xl leading-none">&bull;</span>
                                    <span>Train community health workers.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-12 sm:p-16 flex flex-col justify-center bg-white dark:bg-gray-900">
                            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 font-heading tracking-tight">Choose an Amount</h2>
                            <div className="grid grid-cols-3 gap-5 mb-10">
                                <Button variant="outline" className="h-16 text-xl font-bold border-gray-200 dark:border-gray-800 dark:text-white dark:hover:bg-white dark:hover:text-black shadow-sm group-hover:shadow-md transition-all">$25</Button>
                                <Button variant="outline" className="h-16 text-xl font-bold border-brand text-brand dark:text-white bg-brand/5 dark:bg-transparent ring-2 ring-brand/20 dark:ring-0 dark:border-gray-800 dark:hover:bg-white dark:hover:text-black shadow-sm group-hover:shadow-md transition-all">$50</Button>
                                <Button variant="outline" className="h-16 text-xl font-bold border-gray-200 dark:border-gray-800 dark:text-white dark:hover:bg-white dark:hover:text-black shadow-sm group-hover:shadow-md transition-all">$100</Button>
                                <Button variant="outline" className="h-16 text-xl font-bold border-gray-200 dark:border-gray-800 dark:text-white dark:hover:bg-white dark:hover:text-black shadow-sm group-hover:shadow-md transition-all">$250</Button>
                                <Button variant="outline" className="h-16 text-xl font-bold border-gray-200 dark:border-gray-800 dark:text-white dark:hover:bg-white dark:hover:text-black shadow-sm group-hover:shadow-md transition-all">$500</Button>
                                <Button variant="outline" className="h-16 text-xl font-bold border-gray-200 dark:border-gray-800 dark:text-white dark:hover:bg-white dark:hover:text-black shadow-sm group-hover:shadow-md transition-all">Other</Button>
                            </div>

                            <div className="space-y-5">
                                <Button className="w-full h-16 text-xl font-bold flex items-center justify-center gap-3">
                                    <CreditCard className="h-6 w-6" />
                                    Donate with Card
                                </Button>
                                <Button variant="outline" className="w-full h-16 text-xl font-bold flex items-center justify-center gap-3 border-gray-200 dark:border-gray-800 dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black shadow-sm transition-all duration-300">
                                    Donate with PayPal
                                </Button>
                            </div>

                            <p className="mt-8 text-sm text-center text-gray-500">
                                Secure payment processing by Stripe. <br /> OFAS is a 501(c)(3) non-profit organization.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
