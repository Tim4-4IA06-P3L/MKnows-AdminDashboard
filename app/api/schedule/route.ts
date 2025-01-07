import { parse } from "cookie";

export async function GET(request: Request) {
	const cookies = parse(request.headers.get('cookie') || '');
	const token = cookies.AdminJWT;
	
	if (token) {
		const response = await fetch(`${process.env.STRAPI_URL}/api/training-requests`, {
			method: 'GET',
			headers: {
				"Authorization": `Bearer ${process.env.API_TOKEN}`
			}
		});
		const res_json = await response.json();
		
		return new Response(JSON.stringify(res_json), { status:200 });
	} else {
		return new Response(JSON.stringify({ message: "Unauthorized"}), { status: 400});
	}
}