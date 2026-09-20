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

export async function findUserById(id: string) {
  await dbConnect();

  return UserModel.findById(id).lean();
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  await dbConnect();

  const user = await UserModel.create({
    name: data.name,
    email: data.email,
    password: data.password,
  });

  return user;
}

export async function updateUserPassword(data: {
  id: string;
  newPassword: string;
}) {
  await dbConnect();

  await UserModel.updateOne(
    { id: data.id },
    {
      $set: { password: data.newPassword },
    },
  );
}
