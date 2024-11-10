export async function GET(request) {
  const cookieHeader = request.headers.get('cookie') || "";
  const token = cookieHeader.split("=")[1];

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