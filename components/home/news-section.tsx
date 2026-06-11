import Link from "next/link";
import { Container } from "@/components/ui/container";

const posts = [
    {
        title: "Annual Fundraising Gala",
        excerpt:
            "Join us for an evening of support and celebration as we raise funds for asthma research and community programs.",
        href: "#",
        date: "Feb 12, 2026",
    },
    {
        title: "New Campus Chapter at NYU",
        excerpt:
            "We are excited to announce the launch of our newest volunteer chapter at New York University.",
        href: "#",
        date: "Jan 28, 2026",
    },
    {
        title: "Winter Asthma Tips",
        excerpt:
            "Cold air can be a major trigger. Here are 5 tips to keep safe and healthy this winter season.",
        href: "#",
        date: "Dec 15, 2025",
    },
];

export function NewsSection() {
    return (
        <div className="py-16">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white font-heading sm:text-4xl">
                        Latest News & Events
                    </h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
                        Stay up to date with what is happening at OFAS.
                    </p>
                </div>
                <div className="text-center py-16 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 dark:border-gray-800">
                    <p className="text-xl text-gray-500 dark:text-gray-400 italic max-w-lg mx-auto leading-relaxed">
                        News and events will be published here very soon. Check back for our latest updates.
                    </p>
                </div>

                {/* 
                // Placeholder UI logic for when events exist:
                <div className="grid gap-8 md:grid-cols-3">
                    {posts.map((post) => (
                        <div
                            key={post.title}
                            className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white"
                        >
                            <div className="flex-shrink-0">
                                <div className="h-48 w-full bg-gray-300 flex items-center justify-center text-gray-500 font-medium">
                                    News Image
                                </div>
                            </div>
                            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-brand">
                                        {post.date}
                                    </p>
                                    <Link href={post.href} className="block mt-2">
                                        <h3 className="text-xl font-semibold text-gray-900 hover:text-brand transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="mt-3 text-base text-gray-500">
                                            {post.excerpt}
                                        </p>
                                    </Link>
                                </div>
                                <div className="mt-6">
                                    <Link href={post.href} className="text-brand font-semibold hover:text-brand-dark hover:underline">
                                        Read more &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                */}
            </Container>
        </div>
    );
}
