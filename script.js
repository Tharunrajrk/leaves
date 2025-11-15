// Add to cart functionality with localStorage integration
document.addEventListener('DOMContentLoaded', () => {
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get product info from the card
            const card = btn.closest('.product-card');
            const name = card.querySelector('h3').textContent;
            const priceText = card.querySelector('.price').textContent;
            
            // Parse price
            const price = parseFloat(priceText.replace(/[₹$,]/g, ''));
            
            // Initialize window.cart if needed
            if (!window.cart) {
                window.cart = [];
            }
            
            // Check if item already in cart
            const existingItem = window.cart.find(item => item.name === name);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                window.cart.push({
                    name: name,
                    price: priceText,
                    quantity: 1
                });
            }
            
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(window.cart));
            if (typeof updateCartCount === 'function') {
                updateCartCount();
            }
            
            // Visual feedback
            btn.textContent = 'Added to Cart ✓';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.textContent = 'Add to Cart';
                btn.disabled = false;
            }, 2000);
        });
    });

    // Hamburger Menu Toggle
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', (e) => {
            e.preventDefault();
            hamburgerMenu.classList.toggle('active');
            
            if (sidebar) {
                if (hamburgerMenu.classList.contains('active')) {
                    sidebar.classList.add('active');
                    document.body.classList.add('sidebar-visible');
                    if (overlay) overlay.style.display = 'block';
                } else {
                    sidebar.classList.remove('active');
                    document.body.classList.remove('sidebar-visible');
                    if (overlay) overlay.style.display = 'none';
                }
            }
        });
    }

    // Sidebar toggle (only for mobile)
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarElement = document.getElementById('sidebar');
    const overlayElement = document.getElementById('overlay');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebarElement.classList.add('active');
            document.body.classList.add('sidebar-visible');
            if (overlayElement) overlayElement.style.display = 'block';
        });
    }

    if (overlayElement) {
        overlayElement.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebarElement.classList.remove('active');
                document.body.classList.remove('sidebar-visible');
                overlayElement.style.display = 'none';
                if (hamburgerMenu) hamburgerMenu.classList.remove('active');
            }
        });
    }

    // Close sidebar on mobile when clicking links
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebarElement.classList.remove('active');
                document.body.classList.remove('sidebar-visible');
                if (overlayElement) overlayElement.style.display = 'none';
                if (hamburgerMenu) hamburgerMenu.classList.remove('active');
            }
        });
    });

    // Home link refresh
    const homeLinks = document.querySelectorAll('a[href="#home"]');
    homeLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.innerWidth <= 768) {
                sidebar.style.left = '-300px';
                if (overlay) overlay.style.display = 'none';
            }
            window.scrollTo(0, 0);
        });
    });
});