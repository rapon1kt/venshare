import { Metadata } from "next";
import Link from "next/link";
import { formatDate, calculateReadTime } from "@/lib/utils/markdown";
import { findPublicPosts } from "@/repositories/post-repository";
import { Types } from "mongoose";

export const metadata: Metadata = {
  title: "Venshare - Blog",
  description: "A platform dedicated to connecting its users seamlessly.",
};

interface Post {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  content: string;
  status: string;
  postedAt: Date;
  createdAt: Date;
  authorId: Types.ObjectId;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page = "1" } = await searchParams;
  const pageNum = parseInt(page, 10);
  const { posts, total } = await findPublicPosts(pageNum, 10);
  const pagination: Pagination = {
    page: pageNum,
    limit: 10,
    total,
    totalPages: Math.ceil(total / 10),
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">venshare</h1>
          <p className="text-white/60 text-lg">
            A platform dedicated to connecting its users seamlessly.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-12 text-white/60">
            <p className="text-xl">No posts yet.</p>
            <p className="mt-2">Be the first to write something!</p>
          </div>
        ) : (
          <>
            <div className="space-y-8">
              {posts.map((post: Post) => (
                <article key={post._id.toString()} className="border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="block group"
                  >
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-4">
                      <time dateTime={post.postedAt.toISOString()}>
                        {formatDate(post.postedAt)}
                      </time>
                      <span>{calculateReadTime(post.content)} min read</span>
                    </div>
                    <p className="text-white/70 line-clamp-3">
                      {post.content.replace(/[#*`_\[\]()]/g, "").substring(0, 200)}...
                    </p>
                  </Link>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <nav className="mt-12 flex justify-center gap-2" aria-label="Pagination">
                {pageNum > 1 && (
                  <Link
                    href={`/?page=${pageNum - 1}`}
                    className="px-4 py-2 border border-white/20 rounded hover:bg-white/10 transition-colors"
                  >
                    Previous
                  </Link>
                )}
                <span className="px-4 py-2 flex items-center text-white/60">
                  Page {pageNum} of {pagination.totalPages}
                </span>
                {pageNum < pagination.totalPages && (
                  <Link
                    href={`/?page=${pageNum + 1}`}
                    className="px-4 py-2 border border-white/20 rounded hover:bg-white/10 transition-colors"
                  >
                    Next
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </main>
    </div>
  );
}