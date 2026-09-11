import { AuthState } from "@/app/actions/auth";

type FieldName = "name" | "email" | "password" | "confirmPassword";

const fieldLabels: Record<FieldName, string> = {
  name: "Name",
  email: "Email",
  password: "Password",
  confirmPassword: "Confirm Password",
};

export const getFieldErrors = (result: AuthState) => {
  if (!result.errors) return [];

  return Object.entries(result.errors).flatMap(([field, value]) =>
    value.errors.map((error) => ({
      field: fieldLabels[field as FieldName] ?? field,
      error,
    })),
  );
};
