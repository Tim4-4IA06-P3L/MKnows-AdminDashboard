async function getCategories() {
	try {
		const response = await fetch(`${process.env.STRAPI_URL}/api/categories`);
		const res_json = await response.json();
		return res_json.data;
	} catch (err) {
		return new Error(err.message);
	}
}

export default getCategories;