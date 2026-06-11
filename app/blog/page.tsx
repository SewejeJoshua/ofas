import { Container } from "@/components/ui/container";
import { getSortedPostsData } from "@/lib/cms";
import Link from "next/link";
import { format } from "date-fns";

export default function BlogIndex() {
    const allPostsData = getSortedPostsData();

    return (
        <div className="bg-white py-16 sm:py-24">
            <Container>
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl font-heading">
                        Latest News & Updates
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Read about our latest activities, success stories, and health tips.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {allPostsData.map(({ slug, date, title, thumbnail }) => (
                        <div key={slug} className="flex flex-col rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100/50 hover:shadow-[0_8px_30px_rgb(8,8,178,0.12)] transition-all duration-500 hover:-translate-y-1.5 group bg-white dark:bg-gray-900">
                            {/* Placeholder for thumbnail if not present, otherwise generic */}
                            <div className="flex-shrink-0 h-48 w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-700">
                                {thumbnail ? <span className="text-sm">{thumbnail}</span> : "No Image"}
                            </div>
                            <div className="flex-1 bg-white dark:bg-gray-900 p-8 flex flex-col justify-between relative z-10 transition-colors">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-brand">
                                        {date}
                                    </p>
                                    <Link href={`/blog/${slug}`} className="block mt-3">
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-brand transition-colors font-heading leading-snug">{title}</p>
                                    </Link>
                                </div>
                                <div className="mt-8 flex items-center">
                                    <Link href={`/blog/${slug}`} className="text-brand font-semibold hover:underline inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Read full story <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}
