import mongoose, { Model, Schema, Types } from "mongoose";

export type PostStatus = "DRAFT" | "PUBLIC" | "PRIVATE";

export interface IPost {
  slug: string;
  title: string;
  content: string;

  likes: number;
  status: PostStatus;

  postedAt: Date;
  authorId: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    postedAt: { type: Date, required: true },
    status: {
      type: String,
      enum: ["DRAFT", "PUBLIC", "PRIVATE"],
      default: "DRAFT",
    },
    authorId: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  },
);

export const PostModel: Model<IPost> =
  mongoose.models.Post ?? mongoose.model<IPost>("Post", PostSchema);
