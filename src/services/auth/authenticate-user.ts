import { findUserByEmail } from "@/repositories/user-repository";
import { verifyPassword } from "@/lib/password/password";

interface IUser {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
}

export async function authenticateUser(
  email: string,
  password: string,
): Promise<IUser | null> {
  const user = await findUserByEmail(email);

  if (!user || !user.password) return null;

  const isPasswordValid = verifyPassword(password, user.password);

  if (!isPasswordValid) return null;

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    image: user.image,
  };
}
