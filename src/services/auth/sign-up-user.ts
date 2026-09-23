import { createUser, findUserByEmail } from "@/repositories/user-repository";
import { hashPassword } from "@/lib/password/password";
import { AuthError } from "next-auth";

class EmailAlreadyExistsError extends AuthError {
  constructor(message: string) {
    super(message);
    this.type = "EmailSignInError";
  }
}

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
    throw new EmailAlreadyExistsError("EMAIL_ALREADY_EXISTS");
  }

  const hashedPassword = await hashPassword(password);

  return await createUser({
    name,
    email,
    password: hashedPassword,
  });
}
