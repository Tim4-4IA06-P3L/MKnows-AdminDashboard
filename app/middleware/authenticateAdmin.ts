export default async function authenticateAdmin(email, password) {
	const res = await fetch("http://localhost:1337/admin/login", {
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