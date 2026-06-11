import { Container } from "@/components/ui/container";
import { getPostData, getSortedPostsData } from "@/lib/cms";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Generate static params for all posts
export async function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const postData = await getPostData(slug);

    return (
        <div className="bg-white py-16 sm:py-24">
            <Container>
                <div className="mb-8">
                    <Link href="/blog">
                        <Button variant="ghost" className="pl-0 hover:pl-2 transition-all">&larr; Back to News</Button>
                    </Link>
                </div>
                <article className="prose lg:prose-xl mx-auto">
                    <h1 className="font-heading">{postData.title}</h1>
                    <div className="text-gray-500 mb-8">{postData.date}</div>
                    <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                </article>
            </Container>
        </div>
    );
}
