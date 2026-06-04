const testimonialsGrid = document.querySelector('.testimonials-grid');
const emptyMessage = document.querySelector('#testimonials .empty-message');

async function loadTestimonials() {
    try {
        const response = await fetch('http://localhost:5009/testimonials');
        if (!response.ok) throw new Error(`Failed to load testimonials: ${response.status}`);

        const testimonials = await response.json();
        testimonialsGrid.innerHTML = '';

        if (testimonials.length === 0) {
            emptyMessage.textContent = 'No testimonials are available yet.';
            return;
        }

        emptyMessage.style.display = 'none';

        for (const item of testimonials) {
            const card = document.createElement('article');
            card.className = 'card-item';
            card.innerHTML = `
                <p>“${item.feedback}”</p>
                <p><strong>Rating:</strong> ${item.rating} / 5</p>
            `;
            testimonialsGrid.appendChild(card);
        }
    } catch (error) {
        console.error(error);
        testimonialsGrid.innerHTML = '';
        emptyMessage.textContent = 'Unable to load testimonials at this time.';
    }
}

loadTestimonials();