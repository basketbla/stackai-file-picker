import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Create redirect response
  const response = NextResponse.redirect(new URL("/login", request.url));

  // Clear the cookie using multiple methods to ensure it's deleted
  response.cookies.delete("stack_ai_token");
  response.cookies.set("stack_ai_token", "", {
    path: "/",
    expires: new Date(0),
    httpOnly: false,
    sameSite: "lax",
    maxAge: 0,
  });

  return response;
}
