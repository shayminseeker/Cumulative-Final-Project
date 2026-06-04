document.addEventListener('DOMContentLoaded', async () => {
    const role = localStorage.getItem('role');
    const userList = document.getElementById('user-list');
    const userMessage = document.getElementById('user-message');


    if (role !== 'Admin') {
        window.location.href = '../../LoginApi/login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/auth/users');
        if (!response.ok) {
            throw new Error('Unable to load users');
        }

        const users = await response.json();
        if (!users.length) {
            userMessage.textContent = 'No users found.';
            return;
        }

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.firstname}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${user.id}</td>
                <td><a href="orderPage.html?userId=${encodeURIComponent(user.id)}">View orders</a></td>
            `;
            userList.appendChild(row);
        });
    } catch (error) {
        userMessage.textContent = error.message || 'Failed to load users.';
    }
});
