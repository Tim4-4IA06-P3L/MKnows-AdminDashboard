export async function POST(request) {
	const reqFormData = await request.formData();
	const files = reqFormData.getAll("files");
	const [title, level, categoryId, desc] = [reqFormData.get('title'),
																					  reqFormData.get('level'),
																					  reqFormData.get('category'),
																					  reqFormData.get('desc'),];
	
	const cookie = request.headers.get('cookie') || "";
	const auth_token = cookie.split("=")[1];
	
	if (auth_token) {
		if (files.length == 2) {
			const token = process.env.API_TOKEN;
			// POST the media
			const filesIdArr = await Promise.all(
				files.map(async (file) => {
					let fileFormData = new FormData();
					fileFormData.append("files", file);
					let response = await fetch("http://localhost:1337/api/upload", {
						method: 'POST',
						headers: {
							"Authorization": `Bearer ${token}`,
						},
						body: fileFormData
					});
					let res_json = await response.json();
					return res_json[0].id;
				})
			);
			console.log(filesIdArr);
			
			// POST the Program entry
			const responseProgram = await fetch("http://localhost:1337/api/our-programs", {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				},
				body: JSON.stringify({
					"data": {
						"Title": title,
						"Level": level,
						"Category": categoryId,
						"Description": desc,
						"Thumbnail": filesIdArr[0],
						"Document": filesIdArr[1]
					}
				})
			});
			
			return responseProgram;
			
		} else {
			return new Response(JSON.stringify({ message: "Incomplete files upload!"}), {
				status: 400,
				headers: {
					"Content-Type": "application/json",
				},
			});
		}
		
	} else {
		return new Response(JSON.stringify({ message: "Request failed"}), {
			status: 400,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}