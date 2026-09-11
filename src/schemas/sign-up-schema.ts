import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(4, "Name must contain at least 4 characters.")
      .max(50, "Name cannot exceed 50 characters."),
    email: z
      .email("Invalid email address")
      .transform((email) => email.toLowerCase().trim()),
    password: z.string().min(8, "Password must contain at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The password confirmation do not match with your password.",
    path: ["confirmPassword"],
  });

export type SignUpInput = z.infer<typeof signUpSchema>;
