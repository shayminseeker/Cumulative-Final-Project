document.addEventListener('DOMContentLoaded', () => {
    const role = localStorage.getItem('role');
    const orderMessage = document.getElementById('order-message');
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    const heading = document.querySelector('main h2');

    if (role !== 'Admin') {
        window.location.href = '../../LoginApi/login.html';
        return;
    }

    if (!userId) {
        orderMessage.textContent = 'No user selected. Please open this page from the User Management table.';
        return;
    }

    if (heading) {
        heading.textContent = `Orders for user ${userId}`;
    }

    orderMessage.textContent = 'Order details are not yet available because there is no orders endpoint in the current backend.';
});
