import { serialize, parse } from "cookie";

export async function GET(request) {
  const cookies = parse(request.headers.get('cookie') || '');
  const token = cookies.AdminJWT;

  if (!token) {
    return new Response(JSON.stringify({ message: "Already logged out"}), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      }
    });
  } else {
    const loggedOutToken = serialize("AdminJWT", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });
		
		const loggedOutID = serialize("AdminID", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });

    return new Response(JSON.stringify({ message: "Log out successful"}), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": [loggedOutToken, loggedOutID],
      }
    });
  }
}