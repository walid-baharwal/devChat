import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/chat/:path*", "/sign-in", "/sign-up"],
};

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({ req: request });
    const url = request.nextUrl;
    if (token && (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up"))) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (!token && (url.pathname === "/" || url.pathname.startsWith("/chat"))) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Failed to fetch token:", error);
    //  return NextResponse.redirect('/error');
  }
}
