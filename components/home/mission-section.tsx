import { Container } from "@/components/ui/container";
import { BookOpen, Megaphone, Users } from "lucide-react";

const features = [
    {
        name: "Education",
        description:
            "Providing workshops and resources to help families manage asthma effectively in their daily lives.",
        icon: BookOpen,
    },
    {
        name: "Advocacy",
        description:
            "Fighting for cleaner air and better healthcare policies for asthma patients across the country.",
        icon: Megaphone,
    },
    {
        name: "Community Support",
        description:
            "Building a network of support through local chapters and online groups for families.",
        icon: Users,
    },
];

export function MissionSection() {
    return (
        <div className="py-24 relative overflow-hidden">
            <Container className="relative z-10">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    {features.map((feature) => (
                        <div key={feature.name} className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-100/50 dark:border-gray-800 p-10 sm:p-12 flex flex-col items-start rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(8,8,178,0.12)] dark:hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] transition-all duration-500 hover:-translate-y-1.5 group">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/40 text-brand dark:text-blue-400 mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm border border-transparent dark:border-blue-800/50">
                                <feature.icon className="h-8 w-8" aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white font-heading tracking-tight">
                                    {feature.name}
                                </h3>
                                <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}
