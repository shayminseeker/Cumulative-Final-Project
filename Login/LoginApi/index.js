document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const path = window.location.pathname.toLowerCase();
    const isSignup = path.includes('signup');

    const email = document.getElementById('email-input')?.value ?? '';
    const password = document.getElementById('password-input')?.value ?? '';

    const payload = { email, password };
    if (isSignup) {
      const firstname = document.getElementById('firstname-input')?.value ?? '';
      payload.firstname = firstname; // optional, backend ignores it currently
    }

    const endpoint = isSignup ? '/signup' : '/login';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.status === 201 || res.ok) {
        // on signup, go to login; on login, go to product page
        if (isSignup) window.location.href = '/login.html';
        else window.location.href = '/productPage.html';
        return;
      }

      const body = await res.json().catch(() => ({}));
      const msg = body?.message ?? 'Request failed';
      const errorEl = document.getElementById('error-message');
      if (errorEl) errorEl.innerText = msg;
    } catch (err) {
      const errorEl = document.getElementById('error-message');
      if (errorEl) errorEl.innerText = 'Network error';
    }
  });
});
