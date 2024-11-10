import { serialize } from "cookie";
import authenticateAdmin from "../../middleware/authenticateAdmin";

export async function POST(request) {
  const data = await request.json();
	const email = data.email;
	const password = data.password;

	try {
		const strapiResponse = await authenticateAdmin(email, password);
		const token = strapiResponse.data.token;

		if (token) {
			const serialized_token = serialize("AdminJWT", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV !== "development",
				sameSite: "strict",
				maxAge: 60 * 60 * 24 * 1000 * 30,
				path: "/",
			});
			
			return new Response(JSON.stringify({ message: "Login Success"}), {
				status: 200,
				headers: {
					"Content-Type": "application/json",
					"Set-Cookie": serialized_token,
				},
			});
		}
	} catch (err) {
		return new Response(JSON.stringify({ message: "Invalid email or password"}), {
			status: 400,
			headers: {"Content-Type": "application/json"},
		});
	}
}