// Featured Products Modal Management

document.addEventListener('DOMContentLoaded', () => {
    const featuredLink = document.getElementById('featuredLink');
    const featuredModal = document.getElementById('featuredModal');
    const featuredClose = document.getElementById('featuredClose');
    const featuredTabBtns = document.querySelectorAll('.featured-tab-btn');
    const featuredTabContents = document.querySelectorAll('.featured-tab-content');

    // Open Featured Modal
    if (featuredLink) {
        featuredLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (featuredModal) {
                featuredModal.style.display = 'flex';
                // Prevent body scroll on mobile
                if (window.innerWidth <= 768) {
                    document.body.style.overflow = 'hidden';
                }
                // Reset to first tab
                const firstTab = document.querySelector('.featured-tab-btn[data-tab="electronics"]');
                if (firstTab) {
                    firstTab.click();
                }
            }
            // Close sidebar on mobile when link clicked
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('sidebar-visible');
            }
        });
    }

    // Close Featured Modal
    if (featuredClose) {
        featuredClose.addEventListener('click', () => {
            if (featuredModal) {
                featuredModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close modal when clicking outside
    if (featuredModal) {
        window.addEventListener('click', (e) => {
            if (e.target === featuredModal) {
                featuredModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Tab switching functionality
    featuredTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            featuredTabBtns.forEach(b => b.classList.remove('active'));
            featuredTabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });

    // Add to cart functionality for featured products
    const addToCartBtns = document.querySelectorAll('.featured-products-grid .add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productCard = btn.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            let productPrice = productCard.querySelector('.price').textContent;

            // Convert price to number, remove currency symbols
            productPrice = productPrice.replace('₹', '').replace('$', '').trim();
            productPrice = parseFloat(productPrice);

            // Check if cart exists, if not initialize it
            if (!window.cart) {
                window.cart = [];
            }

            // Check if product already in cart
            const existingItem = window.cart.find(item => item.name === productName);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                window.cart.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(window.cart));

            // Update cart count
            if (typeof updateCartCount === 'function') {
                updateCartCount();
            }

            // Show feedback
            btn.textContent = 'Added!';
            setTimeout(() => {
                btn.textContent = 'Add to Cart';
            }, 1500);
        });
    });
});
