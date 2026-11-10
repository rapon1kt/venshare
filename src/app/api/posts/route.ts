import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { findPublicPosts } from "@/repositories/post-repository";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const { posts, total } = await findPublicPosts(page, limit);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, status = "DRAFT", description } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 },
      );
    }

    const { generateUniqueSlug } = await import("@/lib/utils/slug");
    const { findPostBySlug } = await import("@/repositories/post-repository");

    const slug = await generateUniqueSlug(title, async (s) => {
      const post = await findPostBySlug(s);
      return !!post;
    });

    const { createPost } = await import("@/repositories/post-repository");

    const post = await createPost({
      title,
      content,
      status: status as "DRAFT" | "PUBLIC" | "PRIVATE",
      authorId: session.user.id,
      slug,
      postedAt: status === "PUBLIC" ? new Date() : new Date(),
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 },
    );
  }
}