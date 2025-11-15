// Reviews and Comments Management
let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

// Save reviews to localStorage
function saveReviews() {
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

// Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Display reviews
function displayReviews() {
    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList) return;

    if (reviews.length === 0) {
        reviewsList.innerHTML = '<p class="no-reviews">No reviews yet. Be the first to review!</p>';
        return;
    }

    let html = '';
    // Display reviews in reverse order (newest first)
    reviews.slice().reverse().forEach(review => {
        const stars = '⭐'.repeat(review.rating);
        html += `
            <div class="review-item">
                <div class="review-header">
                    <span class="reviewer-name">${escapeHtml(review.name)}</span>
                    <span class="review-rating">${stars}</span>
                </div>
                <p class="review-text">${escapeHtml(review.comment)}</p>
                <p class="review-time">${formatDate(review.date)}</p>
            </div>
        `;
    });
    
    reviewsList.innerHTML = html;
}

// Escape HTML special characters
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Handle form submission
document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');
    
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('reviewer-name').value.trim();
            const email = document.getElementById('reviewer-email').value.trim();
            const ratingEl = document.querySelector('input[name="rating"]:checked');
            const rating = ratingEl ? ratingEl.value : null;
            const comment = document.getElementById('review-comment').value.trim();

            if (!name || !email || !rating || !comment) {
                alert('Please fill in all fields and select a rating!');
                return;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address!');
                return;
            }

            // Create review object
            const review = {
                name: name,
                email: email,
                rating: parseInt(rating),
                comment: comment,
                date: new Date().toISOString()
            };

            // Add review to array
            reviews.unshift(review);
            saveReviews();

            // Clear form
            reviewForm.reset();
            
            // Reset star rating
            document.querySelectorAll('input[name="rating"]').forEach(radio => {
                radio.checked = false;
            });

            // Display updated reviews
            displayReviews();

            // Show success message
            alert('Thank you for your review! 🎉');
        });
    }

    // Display reviews on page load
    displayReviews();
});
