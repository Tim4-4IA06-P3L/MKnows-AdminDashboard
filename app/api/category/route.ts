import { parse } from "cookie";

export async function POST(request) {
	const cookies = parse(request.headers.get('cookie') || '');
	const token = cookies.AdminJWT;
	
	if (token) {
		const reqJson = await request.json();
		const response = await fetch(`${process.env.STRAPI_URL}/api/categories`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${process.env.API_TOKEN}`
			},
			body: JSON.stringify(reqJson)
		});
		return response;
	} else {
		return new Response(JSON.stringify({ message: "Unauthorized"}), { status: 400 });
	}
}

export async function PUT(request) {
	const cookies = parse(request.headers.get('cookie') || '');
	const token = cookies.AdminJWT;
	
	if (token) {
		const reqJson = await request.json();
		const documentId = reqJson.documentId;
		const Category = reqJson.Category;
		const response = await fetch(`${process.env.STRAPI_URL}/api/categories/${documentId}`, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${process.env.API_TOKEN}`
			},
			body: JSON.stringify({
				data: {
					Category: Category
				}
			})
		});
		return response;
	} else {
		return new Response(JSON.stringify({ message: "Unauthorized"}), { status: 400 });
	}
}

export async function DELETE(request) {
	const cookies = parse(request.headers.get('cookie') || '');
	const token = cookies.AdminJWT;
	
	if (token) {
		const reqJson = await request.json();
		const response = await fetch(`${process.env.STRAPI_URL}/api/categories/${reqJson.documentId}`, {
			method: 'DELETE',
			headers: {
				"Authorization": `Bearer ${process.env.API_TOKEN}`
			}
		});
		return response;
	} else {
		return new Response(JSON.stringify({ message: "Unauthorized"}), { status: 400 });
	}
}