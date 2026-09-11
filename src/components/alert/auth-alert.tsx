import { AuthState } from "@/app/actions/auth";
import { AlertCircleIcon, CheckCircle } from "lucide-react";

type FieldName = "name" | "email" | "password" | "confirmPassword";

const fieldLabels: Record<FieldName, string> = {
  name: "Name",
  email: "Email",
  password: "Password",
  confirmPassword: "Confirm Password",
};

const getFieldErrors = (result: AuthState) => {
  if (!result.errors) return [];

  return Object.entries(result.errors).flatMap(([field, value]) =>
    value.errors.map((error) => ({
      field: fieldLabels[field as FieldName] ?? field,
      error,
    })),
  );
};

type AuthAlertProps = { authState: AuthState };

export function AuthAlert({ authState }: AuthAlertProps) {
  const alertDivColor = authState.sucess
    ? "bg-green-500/10 border-green-200/10"
    : "bg-red-500/10 border-red-200/10";

  const alertTextColor = authState.sucess
    ? "text-green-200/80"
    : "text-red-200/80";

  return (
    <div
      hidden={!Boolean(authState.message)}
      className={`flex flex-col justify-start px-4 py-2 border rounded-md ${alertDivColor}`}
    >
      <span className={`flex items-center gap-2 ${alertTextColor} text-base`}>
        {authState.sucess ? (
          <CheckCircle size={16} />
        ) : (
          <AlertCircleIcon size={16} />
        )}
        {authState.message}
      </span>
      {authState.errors && (
        <ul>
          {getFieldErrors(authState).map(({ field, error }) => (
            <li className="text-red-200/60 text-sm" key={`${field}-${error}`}>
              &bull; {error}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
