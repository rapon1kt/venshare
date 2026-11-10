import { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDate, parseMarkdown, calculateReadTime } from "@/lib/utils/markdown";
import { findPostBySlug } from "@/repositories/post-repository";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.content.replace(/[#*`_\[\]()]/g, "").substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.replace(/[#*`_\[\]()]/g, "").substring(0, 160),
      type: "article",
      publishedTime: post.postedAt.toISOString(),
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await findPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = await parseMarkdown(post.content);
  const readTime = calculateReadTime(post.content);

  return (
    <article className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-white/60">
            <time dateTime={post.postedAt.toISOString()}>
              {formatDate(post.postedAt)}
            </time>
            <span>{readTime} min read</span>
          </div>
        </header>

        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </article>
  );
}