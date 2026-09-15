import { Container } from "@/components/ui/container";

const stats = [
    { label: "Families Helped", value: "500+" },
    { label: "Workshops Held", value: "50+" },
    { label: "Local Chapters", value: "10+" },
];

export function ImpactSection() {
    return (
        <div className="py-16 sm:py-24">
            <Container>
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl font-heading">
                        Our Impact
                    </h2>
                    <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                        Making a real difference in communities nationwide.
                    </p>
                </div>
                <dl className="mt-12 text-center sm:max-w-3xl sm:mx-auto grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 dark:border-gray-800 transition-all duration-500 hover:-translate-y-1.5 group">
                            <dt className="order-2 mt-3 text-lg font-medium text-gray-500 dark:text-gray-400 transition-colors group-hover:text-gray-700 dark:group-hover:text-gray-300">
                                {stat.label}
                            </dt>
                            <dd className="order-1 text-6xl font-extrabold text-brand tracking-tight drop-shadow-sm transition-transform duration-500 group-hover:scale-105 group-hover:drop-shadow-md">
                                {stat.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </Container>
        </div>
    );
}
