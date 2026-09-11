import { createUser, findUserByEmail } from "@/repositories/user-repository";
import { hashPassword } from "@/lib/password/password";

export async function signUpUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  const hashedPassword = await hashPassword(password);

  return await createUser({
    name,
    email,
    password: hashedPassword,
  });
}
