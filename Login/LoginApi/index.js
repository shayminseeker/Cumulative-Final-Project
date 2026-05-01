async function signup(firstname, email, password) {
	const response = await fetch("http://localhost:5223/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ firstname, email, password }),
	});
	const data = await response.json();
	console.log(data);
}

async function login(email, password) {
	const response = await fetch("http://localhost:5223/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});
	const data = await response.json();
	console.log(data);
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
				document.getElementById('error-message').textContent = 'Signup failed';
			}
		} else {
			try {
				await login(email, password);
				localStorage.setItem('isLoggedIn', 'true');
				alert('Login successful!');
				window.location.href = '../../dashboard.html';
			} catch (error) {
				document.getElementById('error-message').textContent = 'Login failed';
				}
			}
		});
});
