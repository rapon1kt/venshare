import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { findPostBySlug } from "@/repositories/post-repository";
import { parseMarkdown, calculateReadTime, formatDate } from "@/lib/utils/markdown";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const post = await findPostBySlug(slug);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const session = await auth();
    const isAuthor = session?.user?.id === post.authorId.toString();

    // Check visibility
    if (post.status === "DRAFT" && !isAuthor) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (post.status === "PRIVATE" && !isAuthor) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const htmlContent = await parseMarkdown(post.content);
    const readTime = calculateReadTime(post.content);

    return NextResponse.json({
      ...post,
      htmlContent,
      readTime,
      formattedDate: formatDate(post.postedAt),
      isAuthor,
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const post = await findPostBySlug(slug);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (post.authorId.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { title, content, status } = body;

    const updateData: Record<string, unknown> = {};

    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (status) {
      updateData.status = status;
      if (status === "PUBLIC" && post.status !== "PUBLIC") {
        updateData.postedAt = new Date();
      }
    }

    // Regenerate slug if title changed
    if (title && title !== post.title) {
      const { generateUniqueSlug } = await import("@/lib/utils/slug");
      const { findPostBySlug: findBySlug } = await import(
        "@/repositories/post-repository"
      );

      const newSlug = await generateUniqueSlug(title, async (s) => {
        const existingPost = await findBySlug(s);
        return !!existingPost && existingPost._id.toString() !== post._id.toString();
      });

      updateData.slug = newSlug;
    }

    const { updatePost } = await import("@/repositories/post-repository");
    const updatedPost = await updatePost(post._id.toString(), updateData);

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const post = await findPostBySlug(slug);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (post.authorId.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { deletePost } = await import("@/repositories/post-repository");
    await deletePost(post._id.toString());

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 },
    );
  }
}