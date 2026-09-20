import { SignInState } from "@/app/actions/auth/sign-in";
import { SignUpState } from "@/app/actions/auth/sign-up";
import { AuthMessage, getFieldErrors } from "@/utils";
import { AlertCircleIcon, CheckCircle } from "lucide-react";

type AuthAlertProps = {
  authState?: SignInState | SignUpState;
  authMessage?: AuthMessage | null;
};

export function AuthAlert({ authState, authMessage }: AuthAlertProps) {
  const alertDivColor = authState?.sucess
    ? "bg-green-500/10 border-green-200/10"
    : "bg-red-500/10 border-red-200/10";

  const alertTextColor = authState?.sucess
    ? "text-green-200/80"
    : "text-red-200/80";

  return (
    <div
      hidden={!Boolean(authState?.message || authMessage)}
      className={`flex flex-col max-w-lg justify-start px-4 py-2 border rounded-md ${alertDivColor}`}
    >
      <span className={`flex items-center gap-2 ${alertTextColor} text-base`}>
        {authState?.sucess ? (
          <CheckCircle size={16} />
        ) : (
          <AlertCircleIcon size={16} />
        )}
        {authState?.message || authMessage?.title}
      </span>
      {authMessage?.description && (
        <p className="text-red-200/60 text-sm">{authMessage.description}</p>
      )}
      {authState?.errors && (
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
