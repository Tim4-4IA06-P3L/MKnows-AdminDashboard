import { serialize, parse } from "cookie";

export async function GET(request: Request) {
  const cookies = parse(request.headers.get('cookie') || '');
  const token = cookies.AdminJWT;

  if (token) {
    return new Response(JSON.stringify({ message : "Authorized Admin"}), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      }
    });
  } else {
    return new Response(JSON.stringify({ message: "Unathorized user"}), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      }
    });
  }
}