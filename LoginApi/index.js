async function signup(firstname, email, password) {
	const response = await fetch("http://localhost:5000/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ firstname, email, password }),
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message || 'Signup failed');
	}
	return data;
}

async function login(email, password) {
	const response = await fetch("http://localhost:5000/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message || 'Login failed');
	}
	return data;
}

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('form').addEventListener('submit', async (e) => {
		e.preventDefault();
		const email = document.getElementById('email-input').value;
		const password = document.getElementById('password-input').value;
		
		const isSignup = document.getElementById('firstname-input') !== null;
		
		if (isSignup) {
			const firstname = document.getElementById('firstname-input').value;
			const repeatPassword = document.getElementById('repeat-password-input').value;
			
			if (password !== repeatPassword) {
				document.getElementById('error-message').textContent = 'Passwords do not match';
				return;
			}
			
			try {
				await signup(firstname, email, password);
				alert('Signup successful!');
				window.location.href = 'login.html';
			} catch (error) {
				document.getElementById('error-message').textContent = error.message || 'Signup failed';
			}
		} else {
			try {
				const data = await login(email, password);
				localStorage.setItem('isLoggedIn', 'true');
				localStorage.setItem('username', data.firstname || data.email || email);
				localStorage.setItem('role', data.role || 'User');

				if (data.role === 'Admin') {
					window.location.href = '../adminDashboard.html';
				} else {
					window.location.href = '../shop.html';
				}
			} catch (error) {
				document.getElementById('error-message').textContent = error.message || 'Login failed';
			}
		}
	});
});
