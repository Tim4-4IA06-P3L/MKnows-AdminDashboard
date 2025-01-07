import { serialize } from "cookie";

export async function POST(request: Request) {
  const data = await request.json();
	const email = data.email;
	const password = data.password;
	
	const authenticateAdmin = async (email: string, password: string) => {
		const res = await fetch(`${process.env.STRAPI_URL}/admin/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email, password
			}),
		});
		if (res.ok) {
			return res.json();
		} else {
			throw new Error("Invalid email or password");
		}
	}

	try {
		const strapiResponse = await authenticateAdmin(email, password);
		const token = strapiResponse.data.token;
		const adminId = strapiResponse.data.user.documentId;

		if (token) {
			const serialized_token = serialize("AdminJWT", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV !== "development",
				sameSite: "strict",
				path: "/",
			});
			
			const serialized_id = serialize("AdminID", adminId, {
				httpOnly: true,
				secure: process.env.NODE_ENV !== "development",
				sameSite: "strict",
				path: "/",
			});

			const headers = new Headers({
				"Content-Type": "application/json",
			});

			headers.append("Set-Cookie", serialized_token);
			headers.append("Set-Cookie", serialized_id);
			
			return new Response(JSON.stringify({ message: "Login Success"}), {
				status: 200,
				headers: headers
			});
		} else {
				return new Response(JSON.stringify({ message: "Invalid email or"}), {
				status: 400,
				headers: {"Content-Type": "application/json"},
			});
		}
	} catch (err) {
		return new Response(JSON.stringify({ message: "Failed to authenticate"}), {
			status: 400,
			headers: {"Content-Type": "application/json"},
		});
	}
}