export default async function loginAdmin(email, password) {
	const res = await fetch("http://localhost:1337/admin/login", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email, password
		}),
	});
	
	if(!res.ok) throw new Error("Failed to log in");
	return res.json();
}