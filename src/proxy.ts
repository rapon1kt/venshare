import { auth } from "@/lib/auth";
import { NextAuthRequest } from "next-auth";
import { NextResponse } from "next/server";

const publicRoutes = [
  { pathName: "/", whenAuthenticated: "redirect" },
  { pathName: "/sign-up", whenAuthenticated: "redirect" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_PATH = "/";

export default auth(async function proxy(req: NextAuthRequest) {
  const pathName = req.nextUrl.pathname;
  const isLoggedIn = !!req.auth;

  const publicRoute = publicRoutes.find((route) => route.pathName == pathName);

  if (!isLoggedIn && publicRoute) {
    return NextResponse.next();
  }

  if (!isLoggedIn && !publicRoute) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_PATH;
    return NextResponse.redirect(redirectUrl);
  }

  if (
    isLoggedIn &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/home";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
