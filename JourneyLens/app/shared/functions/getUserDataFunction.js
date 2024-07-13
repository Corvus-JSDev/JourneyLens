async function getListOfUsers() {
	try {
		const res = await fetch("http://localhost:5000/api/users", {
			// Update the fetch cache every 1 hour (3600 secs)
			next: { revalidate: 1 },
		});
		if (!res.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await res.json();

		return data;
	} catch (error) {
		console.error(`getListOfUsers ERROR: ${error}`);
	}
}

export default getListOfUsers;
