import { parse } from "cookie";

export async function POST(request: Request) {
	const reqFormData = await request.formData();
	const files = reqFormData.getAll("file");
	const [title, trainingType] = [reqFormData.get('title'), 
		                           reqFormData.get('trainingType')];
	const isNewTraining = reqFormData.get("isNewTraining");
	const cookies = parse(request.headers.get('cookie') || '');
	const auth_token = cookies.AdminJWT;
	const token = process.env.API_TOKEN;
	
	if (auth_token) {
		if (files.length == 2) {
			
			// POST the Training entry
			const responseTraining = await fetch(`${process.env.STRAPI_URL}/api/trainings`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				},
				body: JSON.stringify({
					"data": {
						"Title": title,
            "TrainingType": trainingType,
            "NewTraining": isNewTraining == "1",
						"Document": files[0],
						"Thumbnail": files[1]
					}
				})
			});
			
			return responseTraining;
			
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
};

export async function PUT(request: Request) {
	const reqFormData = await request.formData();
	const updateId = reqFormData.get('updateId');
	const files = reqFormData.getAll("file");
	const [title, trainingType] = [reqFormData.get('title'), 
		                           reqFormData.get('trainingType')];
	const isNewTraining = reqFormData.get("isNewTraining");
	const cookies = parse(request.headers.get('cookie') || '');
	const auth_token = cookies.AdminJWT;
	const token = process.env.API_TOKEN;
	
	if (auth_token) {
		if (files.length == 2) {
			
			// PUT the Training entry
			const responseTraining = await fetch(`${process.env.STRAPI_URL}/api/trainings/${updateId}`, {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				},
				body: JSON.stringify({
					"data": {
						"Title": title,
            "TrainingType": trainingType,
            "NewTraining": isNewTraining == "1",
						"Document": files[0],
						"Thumbnail": files[1]
					}
				})
			});
			
			return responseTraining;
			
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
	
	const deleteTraining = async () => {
		const deleteTrainingRes = await fetch(`${process.env.STRAPI_URL}/api/trainings/${deleteId}`, {
			method: 'DELETE',
			headers: {
				"Authorization": `Bearer ${process.env.API_TOKEN}`
			}
		});
		return deleteTrainingRes;
	};
	
	if (auth_token) {
		try {
			const deleteTrainingRes = await deleteTraining();
			if (!deleteTrainingRes.ok) {
				return new Response(JSON.stringify({ "message": "Delete training failed. File and image are both remained." }), {
					status: 400
				});
			}
			
			if (deleteFileId){
				const deleteFileRes = await deleteFile();
				if (!deleteFileRes.ok) {
					return new Response(JSON.stringify({ "message": "Delete file failed but training has been deleted." }), {
						status: 400
					});
				}
			}
			
			if (deleteImageId) {
				const deleteImageRes = await deleteImage();
				if (!deleteImageRes.ok) {
					return new Response(JSON.stringify({ "message": "Delete image failed but both training and the file has been deleted." }), {
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