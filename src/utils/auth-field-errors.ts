import { SignInState } from "@/app/actions/auth/sign-in";
import { SignUpState } from "@/app/actions/auth/sign-up";
import { CreatePostState } from "@/app/actions/post/create-post";
import { ResetPasswordState } from "@/app/actions/auth/reset-password";

type AuthState = SignInState | SignUpState | CreatePostState | ResetPasswordState;

type FieldName =
  | "name"
  | "email"
  | "password"
  | "confirmPassword"
  | "title"
  | "content"
  | "status"
  | "description"
  | "token"
  | "newPassword"
  | "confirmNewPassword";

const fieldLabels: Record<FieldName, string> = {
  name: "Name",
  email: "Email",
  password: "Password",
  confirmPassword: "Confirm Password",
  title: "Title",
  content: "Content",
  status: "Status",
  description: "Description",
  token: "Token",
  newPassword: "New Password",
  confirmNewPassword: "Confirm New Password",
};

type FieldErrors = {
  errors: string[];
};

type ErrorObject = Record<string, FieldErrors | undefined>;

export const getFieldErrors = (result: AuthState) => {
  if (!result.errors) return [];

  const errors = result.errors as ErrorObject;

  return Object.entries(errors).flatMap(([field, value]) =>
    value?.errors?.map((error) => ({
      field: fieldLabels[field as FieldName] ?? field,
      error,
    })) ?? [],
  );
};