async function signup(email, password) {
	const response = await fetch("http://localhost:5223/api/Auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});
	const data = await response.json();
	console.log(data);
}
