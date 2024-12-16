export async function POST(request) {
	const reqFormData = await request.formData();
	const files = reqFormData.getAll("files");
	let [title, level, category, desc] = [reqFormData.get('title'),
																				reqFormData.get('level'),
																				reqFormData.get('category'),
																				reqFormData.get('desc')];
	const isNewCategory = reqFormData.get("newCategory");
	const isNewFile = reqFormData.get("newFile");
	const isNewImage = reqFormData.get("newImage");
	const cookie = request.headers.get('cookie') || "";
	const auth_token = cookie.split("=")[1];
	
	let filesIdArr = [null, null];
	
	if (auth_token) {
		if (files.length == 2) {
			const token = process.env.API_TOKEN;
			// POST the media
			if (isNewFile == 1 && isNewImage == 1) {
				filesIdArr = await Promise.all(
					files.map(async (file) => {
						let fileFormData = new FormData();
						fileFormData.append("files", file);
						let response = await fetch(`${process.env.STRAPI_URL}/api/upload`, {
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
			} else if (isNewFile == 0 && isNewImage == 1) {
				filesIdArr = [files[0]];
				let fileFormData = new FormData();
				fileFormData.append("files", files[1]);
				let response = await fetch(`${process.env.STRAPI_URL}/api/upload`, {
					method: 'POST',
					headers: {
						"Authorization": `Bearer ${token}`,
					},
					body: fileFormData
				});
				let res_json = await response.json();
				filesIdArr.push(res_json[0].id);
			} else if (isNewFile == 1 && isNewImage == 0) {
				filesIdArr = [0, files[1]];
				let fileFormData = new FormData();
				fileFormData.append("files", files[0]);
				let response = await fetch(`${process.env.STRAPI_URL}/api/upload`, {
					method: 'POST',
					headers: {
						"Authorization": `Bearer ${token}`,
					},
					body: fileFormData
				});
				let res_json = await response.json();
				filesIdArr[0] = res_json[0].id;
			} else {
				filesIdArr = files;
			}
			
			if (isNewCategory == 1) {
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
		return new Response(JSON.stringify({ message: "Request failed"}), {
			status: 400,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}

export async function PUT(request) {
	const reqFormData = await request.formData();
	const files = reqFormData.getAll("files");
	const [documentId, title, 
				 level, category, desc,
				 deleteFilesName] = [reqFormData.get('documentId'),
														 reqFormData.get('title'),
											       reqFormData.get('level'),
											       reqFormData.get('category'),
											       reqFormData.get('desc'),
											       reqFormData.getAll('deleteFilesName')];
	
	const cookie = request.headers.get('cookie') || "";
	const auth_token = cookie.split("=")[1];
	
	if (auth_token) {
		if (files.length == 2) {
			const token = process.env.API_TOKEN;
			
			// GET and DELETE previous media
			await Promise.all(
				deleteFilesName.map(async (fileName) => {
					const findDeleteFileRes = await fetch(`${process.env.STRAPI_URL}/api/upload/files?filters[name][$contains]=${fileName}`);
					const deleteFileDataJson = await findDeleteFileRes.json();
					const deleteFileData = await deleteFileDataJson.data;
					const deleteFileId = deleteFileData[0].id;
					
					await fetch(`${process.env.STRAPI_URL}/api/upload/files/${deleteFileId}`, {
						method: 'DELETE',
						headers: {
							"Authorization": `Bearer ${process.env.API_TOKEN}`
						}
					});
				})
			);
			
			// POST the new media
			const filesIdArr = await Promise.all(
				files.map(async (file) => {
					let fileFormData = new FormData();
					fileFormData.append("files", file);
					let response = await fetch(`${process.env.STRAPI_URL}/api/upload`, {
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
			
			// PUT the Program entry
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
		return new Response(JSON.stringify({ message: "Request failed"}), {
			status: 400,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}

export async function DELETE(request) {
	const reqJson = await request.json();
	const deleteId = reqJson.id;
	const fileDeleteId = reqJson.fileId;
	const imageDeleteId = reqJson.imageId;
	try {
		const deleteProgram = async () => {
			await fetch(`${process.env.STRAPI_URL}/api/our-programs/${deleteId}`, {
				method: 'DELETE',
				headers: {
					"Authorization": `Bearer ${process.env.API_TOKEN}`
				}
			});
		};
		
		const deleteFile = async () => {
			await fetch(`${process.env.STRAPI_URL}/api/upload/files/${fileDeleteId}`, {
				method: 'DELETE',
				headers: {
					"Authorization": `Bearer ${process.env.API_TOKEN}`
				}
			});
		};
		
		const deleteImage = async () => {
			await fetch(`${process.env.STRAPI_URL}/api/upload/files/${imageDeleteId}`, {
				method: 'DELETE',
				headers: {
					"Authorization": `Bearer ${process.env.API_TOKEN}`
				}
			});
		};
		
		const deleteProgramRes = await deleteProgram();
		const deleteFileRes = await deleteFile();
		const deleteImageRes = await deleteImage();
		
		const response = await Promise.all([deleteProgramRes, deleteFileRes, deleteImageRes]);
		console.log(response);
		if (response) {
			return new Response(JSON.stringify({ "message": "Delete is successful" }), {
				status: 200
			});
		} else {
			return new Response(JSON.stringify({ "message": "Delete is failed" }), {
				status: 400
			});
		}
	} catch (err) {
		return new Response(JSON.stringify({ "message": "Request is failed" }), {
			status: 400
		});
	}
}

