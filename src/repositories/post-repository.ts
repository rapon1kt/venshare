import dbConnect from "@/lib/db/mongoose";
import { PostModel, type IPost } from "@/models/post";
import { Types } from "mongoose";

export async function createPost(data: {
  title: string;
  content: string;
  status: "DRAFT" | "PUBLIC" | "PRIVATE";
  authorId: string;
  slug: string;
  postedAt: Date;
}) {
  await dbConnect();

  const post = await PostModel.create({
    title: data.title,
    content: data.content,
    status: data.status,
    authorId: new Types.ObjectId(data.authorId),
    slug: data.slug,
    postedAt: data.postedAt,
  });

  return post;
}

export async function findPostBySlug(slug: string) {
  await dbConnect();
  return PostModel.findOne({ slug }).lean();
}

export async function findPostById(id: string) {
  await dbConnect();
  return PostModel.findById(id).lean();
}

export async function findPublicPosts(page = 1, limit = 10) {
  await dbConnect();
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    PostModel.find({ status: "PUBLIC" })
      .sort({ postedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    PostModel.countDocuments({ status: "PUBLIC" }),
  ]);

  return { posts, total };
}

export async function findUserPosts(
  authorId: string,
  page = 1,
  limit = 10,
) {
  await dbConnect();
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    PostModel.find({ authorId: new Types.ObjectId(authorId) })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    PostModel.countDocuments({ authorId: new Types.ObjectId(authorId) }),
  ]);

  return { posts, total };
}

export async function updatePost(
  id: string,
  data: Partial<Pick<IPost, "title" | "content" | "status" | "slug" | "postedAt">>,
) {
  await dbConnect();
  return PostModel.findByIdAndUpdate(id, { $set: data }, { new: true }).lean();
}

export async function deletePost(id: string) {
  await dbConnect();
  return PostModel.findByIdAndDelete(id).lean();
}