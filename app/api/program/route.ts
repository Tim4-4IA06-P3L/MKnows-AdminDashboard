import { parse } from "cookie";

export async function POST(request: Request) {
	const reqFormData = await request.formData();
	const files = reqFormData.getAll("file");
	const [title, level, desc] = [reqFormData.get('title'),
								  reqFormData.get('level'),
								  reqFormData.get('desc')];
	let category = reqFormData.get('category');
	const isNewCategory = reqFormData.get("newCategory");
	const cookies = parse(request.headers.get('cookie') || '');
	const auth_token = cookies.AdminJWT;
	const token = process.env.API_TOKEN;

	if (auth_token) {
		if (files.length == 2) {
			if (isNewCategory == "1") {
				const categoryRes = await fetch(`${process.env.STRAPI_URL}/api/categories`, {
					method: 'POST',
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`,
					},
					body: JSON.stringify({
						"data": {
							"Category": category
						}
					})
				});
				
				const category_json = await categoryRes.json();
				category = category_json.data.id;
			}
			
			// POST the Program entry
			const responseProgram = await fetch(`${process.env.STRAPI_URL}/api/our-programs`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				},
				body: JSON.stringify({
					"data": {
						"Title": title,
						"Level": level,
						"Category": category,
						"Description": desc,
						"Document": files[0],
						"Thumbnail": files[1]
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
		return new Response(JSON.stringify({ message: "Unauthorized"}), {
			status: 400,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}

export async function PUT(request: Request) {
	const reqFormData = await request.formData();
	const updateId = reqFormData.get('updateId');
	const files = reqFormData.getAll("file");
	const [title, level, desc] = [reqFormData.get('title'),
								  reqFormData.get('level'),
								  reqFormData.get('desc')];
	let category = reqFormData.get('category');
	const isNewCategory = reqFormData.get("newCategory");
	const cookies = parse(request.headers.get('cookie') || '');
	const auth_token = cookies.AdminJWT;
	const token = process.env.API_TOKEN;
	
	if (auth_token) {
		if (files.length == 2) {
			if (isNewCategory == "1") {
				const categoryRes = await fetch(`${process.env.STRAPI_URL}/api/categories`, {
					method: 'POST',
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`,
					},
					body: JSON.stringify({
						"data": {
							"Category": category
						}
					})
				});
				
				const category_json = await categoryRes.json();
				category = category_json.data.id;
			}
			
			// PUT the Program entry
			const responseProgram = await fetch(`${process.env.STRAPI_URL}/api/our-programs/${updateId}`, {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				},
				body: JSON.stringify({
					"data": {
						"Title": title,
						"Level": level,
						"Category": category,
						"Description": desc,
						"Document": files[0],
						"Thumbnail": files[1]
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
		return new Response(JSON.stringify({ message: "Unauthorized"}), {
			status: 400,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}

export async function DELETE(request: Request) {
	const reqFormData = await request.formData();
	const deleteId = reqFormData.get('deleteId');
	const deleteFileId = reqFormData.get('deleteFileId') || '';
	const deleteImageId = reqFormData.get('deleteImageId') || '';
	const cookies = parse(request.headers.get('cookie') || '');
	const auth_token = cookies.AdminJWT;
	
	const deleteFile = async () => {
		const deleteFileRes = await fetch(`${process.env.STRAPI_URL}/api/upload/files/${deleteFileId}`, {
			method: 'DELETE',
			headers: {
				"Authorization": `Bearer ${process.env.API_TOKEN}`
			}
		});
		return deleteFileRes;
	};
	
	const deleteImage = async () => {
		const deleteImageRes = await fetch(`${process.env.STRAPI_URL}/api/upload/files/${deleteImageId}`, {
			method: 'DELETE',
			headers: {
				"Authorization": `Bearer ${process.env.API_TOKEN}`
			}
		});
		return deleteImageRes;
	};
	
	const deleteProgram = async () => {
		const deleteProgramRes = await fetch(`${process.env.STRAPI_URL}/api/our-programs/${deleteId}`, {
			method: 'DELETE',
			headers: {
				"Authorization": `Bearer ${process.env.API_TOKEN}`
			}
		});
		return deleteProgramRes;
	};
	
	if (auth_token) {
		try {
			const deleteProgramRes = await deleteProgram();
			if (!deleteProgramRes.ok) {
				return new Response(JSON.stringify({ "message": "Delete program failed. File and image are both remained." }), {
					status: 400
				});
			}
			
			if (deleteFileId){
				const deleteFileRes = await deleteFile();
				if (!deleteFileRes.ok) {
					return new Response(JSON.stringify({ "message": "Delete file failed but program has been deleted." }), {
						status: 400
					});
				}
			}
			
			if (deleteImageId) {
				const deleteImageRes = await deleteImage();
				if (!deleteImageRes.ok) {
					return new Response(JSON.stringify({ "message": "Delete image failed but both program and the file has been deleted." }), {
						status: 400
					});
				}
			}
			return new Response(JSON.stringify({ "message": "Delete success" }), {
				status: 200
			});
			
		} catch (err) {
			console.log(err);
			return new Response(JSON.stringify({ "message": "Request failed. Something's error happened" }), {
				status: 400
			});
		}
	} else {
		return new Response(JSON.stringify({ "message": "Unauthorized" }), {
			status: 400
		});
	}
}

