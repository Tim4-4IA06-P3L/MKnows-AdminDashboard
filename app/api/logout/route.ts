import { serialize } from "cookie";

export async function GET(request: Request) {
  const cookies = request.headers.get('cookie') || '';

  const headers = new Headers({"Content-Type": "application/json"});

  if (cookies) {
    const cookieNames = cookies.split(';').map((cookie) => cookie.split('=')[0].trim());
    cookieNames.forEach((cookieName) => {
      const clearCookie = serialize(cookieName, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: -1,
        path: "/",
      });
      headers.append("Set-Cookie", clearCookie);
    });
    return new Response(JSON.stringify({ message: "Log out successful"}), {
      status: 200,
      headers: headers
    });
  } else {
    return new Response(JSON.stringify({ message: "Already log out"}), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      }
    });
  }
}