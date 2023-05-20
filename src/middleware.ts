import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const endpoint = process.env.API_ENDPOINT;

export async function middleware(request: NextRequest) {
  try {
    const identifier = request.nextUrl.pathname.replace("/", "");
    return NextResponse.redirect(new URL(`/urls/${identifier}`, `https://${endpoint}`));
  } catch (err) {
    console.log(err);
  }
  return NextResponse.redirect(new URL("/404", request.url));
}

export const config = {
  // match any [a-z]{7} that is not api, favicon.ico ...
  matcher: ["/z([a-z]{7})"],
};
