import { neon } from "@neondatabase/serverless";
import { parse } from "cookie";

export async function GET(request: Request) {
	const cookies = parse(request.headers.get('cookie') || '');
	const adminID = cookies.AdminID || '';
	const sql = neon(`${process.env.NEON_URL}`);
	
	const response = await sql`SELECT * FROM avatar WHERE user_id = ${adminID};`;
	
	try {
		return new Response(JSON.stringify({ avatarURL: response[0].avatar_url }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			}
		});
	} catch (err) {
		console.log(err);
		return new Response(JSON.stringify({ avatarURL: "" }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			}
		});
	}
}

export async function POST(request: Request) {
	const cookies = parse(request.headers.get('cookie') || '');
  const token = cookies.AdminJWT;
	const adminID = cookies.AdminID;
	const reqFormData = await request.formData();
	const newAvatar = reqFormData.get('files');
	const sql = neon(`${process.env.NEON_URL}`);
	
	if (token) {
		
		const selectRes = await sql`SELECT * FROM avatar WHERE user_id = ${adminID};`;
		
		// POST the new avatar
		if (newAvatar != null) {
			const avatarFormData = new FormData();
			avatarFormData.append('files', newAvatar);
			const postNewAvatar = await fetch(`${process.env.STRAPI_URL}/api/upload`, {
				method: 'POST',
				headers: {
					"Authorization": `Bearer ${process.env.API_TOKEN}`,
				},
				body: avatarFormData
			});
			
			const newAvatarJson = await postNewAvatar.json();
			const newAvatarId = newAvatarJson[0].id;
			const newAvatarName = newAvatarJson[0].name;
			const newAvatarURL = newAvatarJson[0].url;
			
			if (selectRes.length > 0) {
				const oldAvatarId = selectRes[0].avatar_id;
				
				// DELETE corresponding avatar to replace it with a new one
				const deleteAvatarRes = await fetch(`${process.env.STRAPI_URL}/api/upload/files/${oldAvatarId}`, {
					method: 'DELETE',
					headers: {
						"Authorization": `Bearer ${process.env.API_TOKEN}`,
					}
				});

				if (!deleteAvatarRes.ok) {
					return new Response(JSON.stringify({ message: "Error deleting old avatar" }), {
						status: 400
					});
				}
				
				// Update the table
				await sql`UPDATE avatar SET avatar_id = ${newAvatarId}, avatar_name = ${newAvatarName}, avatar_url = ${newAvatarURL} 
				WHERE user_id = ${adminID};`;
				
			} else {
				// Insert into the table
				await sql`INSERT INTO avatar (user_id, avatar_id, avatar_name, avatar_url) 
				VALUES (${adminID}, ${newAvatarId}, ${newAvatarName}, ${newAvatarURL});`;
			}
			
			return new Response(JSON.stringify({ message: "Update Avatar Success", "avatarURL": newAvatarURL }), {
				status: 200,
				headers: {
					"Content-Type": "application/json",
				}
			});
		} else {
			return new Response(JSON.stringify({ message: "No avatar uploaded" }), {
				status: 400
			});
		}
	} else {
		return new Response(JSON.stringify({ message: "Unauthorized" }), {
			status: 400
		});
	}
}

export async function DELETE(request: Request) {
	const cookies = parse(request.headers.get('cookie') || '');
  const token = cookies.AdminJWT;
	const adminID = cookies.AdminID;
	const sql = neon(`${process.env.NEON_URL}`);
	
	const selectRes = await sql`SELECT * FROM avatar WHERE user_id = ${adminID};`;
	
	if (token) {
		if (selectRes.length > 0) {
			const oldAvatarId = selectRes[0].avatar_id;
			
			// DELETE corresponding avatar
			const deleteAvatarRes = await fetch(`${process.env.STRAPI_URL}/api/upload/files/${oldAvatarId}`, {
				method: 'DELETE',
				headers: {
					"Authorization": `Bearer ${process.env.API_TOKEN}`,
				}
			});

			if(!deleteAvatarRes.ok) {
				return new Response(JSON.stringify({ message: "Delete old photo failed"}),
				{
					status: 400,
					headers: {
						"Content-Type": "application/json"
					}
				}
			);
			}
			// Delete the record from the table
			await sql`DELETE FROM avatar WHERE user_id = ${adminID};`;
			
			return new Response(JSON.stringify({ message: "Delete successful" }), {
				status: 200
			});
		} else {
			return new Response(JSON.stringify({ message: "Your avatar has already been empty" }), {
				status: 200
			});
		}
	} else {
		return new Response(JSON.stringify({ message: "Unauthorized" }), {
			status: 400
		});
	}
}