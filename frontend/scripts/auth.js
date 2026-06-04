document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.querySelector('a[href="../../LoginApi/login.html"]');
    const greeting = document.getElementById('user-greeting');
    const logoutButton = document.getElementById('logout-button');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');

    if (loginLink) {
        loginLink.style.display = isLoggedIn ? 'none' : 'inline-block';
    }

    if (greeting) {
        if (isLoggedIn && username) {
            greeting.textContent = `Welcome, ${username}`;
            greeting.style.display = 'inline-block';
        } else {
            greeting.style.display = 'none';
        }
    }

    if (logoutButton) {
        if (isLoggedIn) {
            logoutButton.style.display = 'inline-block';
        } else {
            logoutButton.style.display = 'none';
        }

        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            window.location.href = '../../LoginApi/login.html';
        });
    }
});
