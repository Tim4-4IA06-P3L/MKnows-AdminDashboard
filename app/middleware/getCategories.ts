async function getCategories() {
	try {
		const response = await fetch("http://localhost:1337/api/categories");
		const res_json = await response.json();
		return res_json.data;
	} catch (err) {
		return new Error(err.message);
	}
}

export default getCategories;