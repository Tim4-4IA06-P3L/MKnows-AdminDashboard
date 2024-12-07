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