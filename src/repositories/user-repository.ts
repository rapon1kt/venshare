import dbConnect from "@/lib/db/mongoose";
import { UserModel } from "@/models/user";

export async function findUserByEmail(email: string) {
  await dbConnect();
  return UserModel.findOne({ email }).lean();
}

export async function findUserByEmailWithPassword(email: string) {
  await dbConnect();
  return UserModel.findOne({ email }).select("+password").lean();
}
