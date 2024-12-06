export default async function authenticateAdmin(email, password) {
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