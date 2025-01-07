import { parse } from "cookie";
import { neon } from "@neondatabase/serverless";

export async function GET(request: Request) {
	const cookies = parse(request.headers.get("cookie") || "");
	const sql = neon(`${process.env.NEON_URL}`);
	const token = cookies.AdminJWT;
	const adminID = cookies.AdminID;
	if (token) {
		const usernameRes = await sql`SELECT username FROM admin_users WHERE document_id = ${adminID};`;
		return new Response(JSON.stringify({ username: usernameRes[0].username, AdminID: adminID }), {
			status: 200,
			headers: {
				"Content-Type": "application/json"
			}
		});
	} else {
		return new Response(JSON.stringify({ message: "Unauthorized"}), {
			status: 400
		});
	}
}

export async function PUT(request: Request) {
	const cookies = parse(request.headers.get("cookie") || "");
	const reqFormData = await request.formData();
	const sql = neon(`${process.env.NEON_URL}`);
	const token = cookies.AdminJWT;
	const adminID = cookies.AdminID;
	const newUsername = reqFormData.get('newUsername') || "";
	const oldPassword = reqFormData.get('oldPassword') || "";
	const newPassword = reqFormData.get('newPassword') || "";
	
	if (token) {
		if (newUsername) {
			await sql`UPDATE admin_users SET username = ${newUsername} WHERE document_id = ${adminID}`;
		} else {
			return new Response(JSON.stringify({ message: "You have to provide username"}), {
				status: 400
			});
		}
		
		if (newPassword && oldPassword) {
			const changePassRes = await fetch(`${process.env.STRAPI_URL}/admin/users/me`, {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify({
					"currentPassword": oldPassword,
					"password": newPassword
				})
			});
			if (!changePassRes.ok) {
				return new Response(JSON.stringify({ 
						message: "Change password failed. Maybe you provide wrong password? Make sure current, new, and confirmation password are filled"
					}), {
					status: 400
				});
			}
		}
		
		return new Response(JSON.stringify({ message: "Update profile success"}), {
			status: 200
		});
		
	} else {
		return new Response(JSON.stringify({ message: "Unauthorized"}), {
			status: 400
		});
	}
}