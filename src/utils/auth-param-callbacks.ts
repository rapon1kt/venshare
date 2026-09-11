export type AuthMessage = {
  title: string;
  description: string;
};

const authMessages: Record<string, AuthMessage> = {
  OAuthAccountNotLinked: {
    title: "This email already has an account.",
    description:
      "For your protection, sign in with the provider you used first. Once the email is verified, we can safely connect trusted providers.",
  },
  AccountNotLinked: {
    title: "This login method is linked elsewhere.",
    description:
      "Use the original sign-in method for this account, then try connecting the new provider again.",
  },
  EmailNotVerified: {
    title: "We could not verify this email.",
    description:
      "Use an account with a verified email address so we can protect account linking correctly.",
  },
  AccessDenied: {
    title: "Sign-in was not completed.",
    description:
      "The provider did not grant access to the information needed. Please try again.",
  },
  Callback: {
    title: "The provider could not finish sign-in.",
    description:
      "Please try again. If the issue persists, contact our support team on the GitHub website.",
  },
  Configuration: {
    title: "Authentication is not fully configured.",
    description:
      "Check the OAuth credentials and callback URLs configured for this environment.",
  },
  InvalidProvider: {
    title: "This sign-in provider is unavailable.",
    description:
      "Choose one of the configured providers below, or add the missing OAuth credentials.",
  },
  OAuthCallbackError: {
    title: "The provider returned an authentication error.",
    description:
      "Please try again, or use another configured sign-in method if one is available.",
  },
  OAuthSignin: {
    title: "We could not start the provider sign-in.",
    description:
      "Please try again. If the issue persists, contact our support team on the GitHub website.",
  },
  SessionRequired: {
    title: "Please sign in to continue.",
    description: "Your session is required.",
  },
};

export function getAuthMessage(error: string | null): AuthMessage | null {
  if (!error) return null;

  return (
    authMessages[error] ?? {
      title: "We could not sign you in.",
      description:
        "Please try again. No sensitive account details were exposed in this message.",
    }
  );
}
