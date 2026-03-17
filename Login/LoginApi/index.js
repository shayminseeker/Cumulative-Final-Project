const getResponse = await fetch("http://localhost:5009/users")
const usersJson = await getResponse.json();
