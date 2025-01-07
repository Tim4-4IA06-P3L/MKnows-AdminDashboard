import { parse } from "cookie";

export async function DELETE(request: Request) {
	const cookies = parse(request.headers.get('cookie') || '');
	const token = cookies.AdminJWT;
	const resJson = await request.json();
	
	if (token) {
		const responses = await Promise.all(
			resJson.files.map(async (fileId: number) => {
				let response = await fetch(`${process.env.STRAPI_URL}/api/upload/files/${fileId}`, {
					method: 'DELETE',
					headers: {
						"Authorization": `Bearer ${process.env.API_TOKEN}`
					}
				});
				if (!response.ok) {
					return new Response(JSON.stringify({ message: "Something's wrong with the delete process."}), { status: 400 });
				}
			}
		));
		
		return new Response(JSON.stringify({ message: "Delete successful"}), { status: 200 });
		
	} else {
		return new Response(JSON.stringify({ message: "Unauthorized"}), { status: 400 });
	}
}

export async function POST(request: Request) {
	const cookies = parse(request.headers.get('cookie') || '');
	const token = cookies.AdminJWT;
	const reqFormData = await request.formData();
	
	if (token) {
		const response = await fetch(`${process.env.STRAPI_URL}/api/upload`, {
			method: 'POST',
			headers: {
				"Authorization": `Bearer ${process.env.API_TOKEN}`
			},
			body: reqFormData
		});
		
		return response;
	} else {
		return new Response(JSON.stringify({ message: "Unauthorized"}), { status: 400 }); 
	}
}