import { z } from "zod";

export const postStatusSchema = z.enum(["DRAFT", "PUBLIC", "PRIVATE"]);

export const createPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long."),
  content: z
    .string()
    .min(50, "Post content must be at least 50 characters long."),
  status: postStatusSchema.default("DRAFT"),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;