import { serialize } from "cookie";

export async function POST(request) {
  const data = await request.json();
	const email = data.email;
	const password = data.password;
	
	const authenticateAdmin = async (email, password) => {
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
			
			return new Response(JSON.stringify({ message: "Login Success"}), {
				status: 200,
				headers: {
					"Content-Type": "application/json",
					"Set-Cookie": [serialized_token, serialized_id]
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