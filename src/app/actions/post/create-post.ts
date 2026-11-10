"use server";

import { createPostSchema } from "@/schemas/create-post-schema";
import { z } from "zod/v4";
import { auth } from "@/lib/auth";
import { createPost } from "@/repositories/post-repository";
import { generateUniqueSlug } from "@/lib/utils/slug";
import { findPostBySlug } from "@/repositories/post-repository";

interface Properties {
  title?: { errors: string[] };
  status?: { errors: string[] };
  content?: { errors: string[] };
  description?: { errors: string[] };
}

export interface CreatePostState {
  message: string;
  success: boolean;
  errors?: Properties;
}

type CreatePostResponse = Promise<CreatePostState>;

export default async function createPostAction(
  _prevState: CreatePostState | null,
  formData: FormData,
): CreatePostResponse {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const rawData = {
    title: formData.get("title"),
    status: formData.get("status"),
    content: formData.get("content"),
    description: formData.get("description"),
  };

  const validatedFields = createPostSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid fields value.",
      errors: z.treeifyError(validatedFields.error).properties,
    };
  }

  try {
    const { title, content, status } = validatedFields.data;

    const slug = await generateUniqueSlug(title, async (s) => {
      const post = await findPostBySlug(s);
      return !!post;
    });

    const postedAt = status === "PUBLIC" ? new Date() : new Date();

    await createPost({
      title,
      content,
      status: status as "DRAFT" | "PUBLIC" | "PRIVATE",
      authorId: session.user.id,
      slug,
      postedAt,
    });

    return {
      success: true,
      message: "Post created successfully!",
    };
  } catch (e) {
    console.error("Error creating post:", e);
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}