import { parse } from "cookie";
import { constants } from "node:fs/promises";

export async function POST(request: Request) {
	const reqFormData = await request.formData();
	const files = reqFormData.getAll("files");
	const [title, level, desc] = [reqFormData.get('title'),
								  reqFormData.get('level'),
								  reqFormData.get('desc')];
	let category = reqFormData.get('category');
	const isNewCategory = reqFormData.get("newCategory");
	const isNewFile = reqFormData.get("newFile");
	const isNewImage = reqFormData.get("newImage");
	const cookies = parse(request.headers.get('cookie') || '');
	const auth_token = cookies.AdminJWT;
	
	let filesIdArr: (null | FormDataEntryValue)[] = [null, null];
	
	if (auth_token) {
		if (files.length == 2) {
			const token = process.env.API_TOKEN;
			// POST the media
			if (isNewFile == "1" && isNewImage == "1") {
				filesIdArr = await Promise.all(
					files.map(async (file) => {
						const fileFormData = new FormData();
						fileFormData.append("files", file);
						const response = await fetch(`${process.env.STRAPI_URL}/api/upload`, {
							method: 'POST',
							headers: {
								"Authorization": `Bearer ${token}`,
							},
							body: fileFormData
						});
						const res_json = await response.json();
						return res_json[0].id;
					})
				);
			} else if (isNewFile == "0" && isNewImage == "1") {
				filesIdArr = [files[0]];
				const fileFormData = new FormData();
				fileFormData.append("files", files[1]);
				const response = await fetch(`${process.env.STRAPI_URL}/api/upload`, {
					method: 'POST',
					headers: {
						"Authorization": `Bearer ${token}`,
					},
					body: fileFormData
				});
				const res_json = await response.json();
				filesIdArr.push(res_json[0].id);
			} else if (isNewFile == "1" && isNewImage == "0") {
				filesIdArr = ["0", files[1]];
				const fileFormData = new FormData();
				fileFormData.append("files", files[0]);
				const response = await fetch(`${process.env.STRAPI_URL}/api/upload`, {
					method: 'POST',
					headers: {
						"Authorization": `Bearer ${token}`,
					},
					body: fileFormData
				});
				const res_json = await response.json();
				filesIdArr[0] = res_json[0].id;
			} else {
				filesIdArr = files;
			}
			
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
						"Document": filesIdArr[0],
						"Thumbnail": filesIdArr[1]
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
	const files = reqFormData.getAll("files");
	const [title, level, desc] = [reqFormData.get('title'),
								  reqFormData.get('level'),
								  reqFormData.get('desc')];
	let category = reqFormData.get('category');
	const isNewCategory = reqFormData.get("newCategory");
	const isNewFile = reqFormData.get("newFile");
	const isNewImage = reqFormData.get("newImage");
	const cookies = parse(request.headers.get('cookie') || '');
	const auth_token = cookies.AdminJWT;
	
	let filesIdArr: (null | FormDataEntryValue)[] = [null, null];
	
	if (auth_token) {
		if (files.length == 2) {
			const token = process.env.API_TOKEN;
			// POST the media
			if (isNewFile == "1" && isNewImage == "1") {
				filesIdArr = await Promise.all(
					files.map(async (file) => {
						const fileFormData = new FormData();
						fileFormData.append("files", file);
						const response = await fetch(`${process.env.STRAPI_URL}/api/upload`, {
							method: 'POST',
							headers: {
								"Authorization": `Bearer ${token}`,
							},
							body: fileFormData
						});
						const res_json = await response.json();
						return res_json[0].id;
					})
				);
			} else if (isNewFile == "0" && isNewImage == "1") {
				filesIdArr = [files[0]];
				const fileFormData = new FormData();
				fileFormData.append("files", files[1]);
				const response = await fetch(`${process.env.STRAPI_URL}/api/upload`, {
					method: 'POST',
					headers: {
						"Authorization": `Bearer ${token}`,
					},
					body: fileFormData
				});
				const res_json = await response.json();
				filesIdArr.push(res_json[0].id);
			} else if (isNewFile == "1" && isNewImage == "0") {
				filesIdArr = ["0", files[1]];
				const fileFormData = new FormData();
				fileFormData.append("files", files[0]);
				const response = await fetch(`${process.env.STRAPI_URL}/api/upload`, {
					method: 'POST',
					headers: {
						"Authorization": `Bearer ${token}`,
					},
					body: fileFormData
				});
				const res_json = await response.json();
				filesIdArr[0] = res_json[0].id;
			} else {
				filesIdArr = files;
			}
			
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
						"Document": filesIdArr[0],
						"Thumbnail": filesIdArr[1]
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

