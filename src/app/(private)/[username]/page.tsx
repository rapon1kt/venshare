import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, calculateReadTime } from "@/lib/utils/markdown";
import { findUserByEmail } from "@/repositories/user-repository";
import { findUserPosts } from "@/repositories/post-repository";
import { auth } from "@/lib/auth";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const session = await auth();
  const user = await findUserByEmail(
    username.toLocaleLowerCase().replaceAll("-", " "),
  );

  if (!user) {
    return { title: "Profile Not Found" };
  }

  return {
    title: `${user.name}'s Profile`,
  };
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params;
  const session = await auth();
  const normalizedName = username.toLocaleLowerCase().replaceAll("-", " ");

  const user = await findUserByEmail(normalizedName);

  if (!user) {
    notFound();
  }

  const isOwnProfile = session?.user?.id === user._id.toString();
  const { posts } = await findUserPosts(user._id.toString(), 1, 10);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12 items-start md:items-center">
          <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center text-3xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-4xl font-bold">{user.name}</h1>
            <p className="text-white/60 mt-1">{user.email}</p>
            {isOwnProfile && (
              <Link
                href="/write"
                className="mt-4 inline-flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Write Post
              </Link>
            )}
          </div>
        </div>

        {/* User Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-12 text-white/60">
            <p className="text-xl">
              {isOwnProfile ? "You haven't written any posts yet." : "No posts yet."}
            </p>
            {isOwnProfile && (
              <Link
                href="/write"
                className="mt-4 inline-flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Write your first post
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              {isOwnProfile ? "Your Posts" : "Posts"}
            </h2>
            {posts.map((post: any) => (
              <article
                key={post._id}
                className="border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors"
              >
                <Link
                  href={`/posts/${post.slug}`}
                  className="block group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        post.status === "PUBLIC"
                          ? "bg-green-900/30 text-green-300"
                          : post.status === "PRIVATE"
                          ? "bg-yellow-900/30 text-yellow-300"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-3">
                    <time dateTime={post.postedAt.toISOString()}>
                      {formatDate(post.postedAt)}
                    </time>
                    <span>{calculateReadTime(post.content)} min read</span>
                  </div>
                  <p className="text-white/70 line-clamp-2">
                    {post.content.replace(/[#*`_\[\]()]/g, "").substring(0, 200)}...
                  </p>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}