// Cart and Orders Management
// Make cart global so search.js and featured.js can access it
window.cart = JSON.parse(localStorage.getItem('cart')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Alias for backward compatibility
let cart = window.cart;

// Save cart to localStorage
function saveCart() {
    window.cart = cart;
    localStorage.setItem('cart', JSON.stringify(window.cart));
    updateCartCount();
}

// Save orders to localStorage
function saveOrders() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Update cart count in header
function updateCartCount() {
    const count = window.cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = count;
    }
}

// Modal controls - wait for DOM to load
let cartModal, ordersModal, cartLink, cartTab, cartClose, ordersClose, placeOrderBtn, continueShoppingBtn;

document.addEventListener('DOMContentLoaded', () => {
    // Get element references
    cartModal = document.getElementById('cartModal');
    ordersModal = document.getElementById('ordersModal');
    cartLink = document.getElementById('cartLink');
    cartTab = document.getElementById('cartTab');
    cartClose = document.getElementById('cartClose');
    ordersClose = document.getElementById('ordersClose');
    placeOrderBtn = document.getElementById('placeOrderBtn');
    continueShoppingBtn = document.getElementById('continueShoppingBtn');

    // Open cart modal
    if (cartLink) {
        cartLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            displayCart();
            if (cartModal) cartModal.style.display = 'flex';
            if (window.innerWidth <= 768) {
                document.body.style.overflow = 'hidden';
            }
        });
    }

    if (cartTab) {
        cartTab.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            displayCart();
            if (cartModal) cartModal.style.display = 'flex';
            if (window.innerWidth <= 768) {
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Close cart modal
    if (cartClose) {
        cartClose.addEventListener('click', () => {
            if (cartModal) cartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', () => {
            if (cartModal) cartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Open orders modal (guard and delegate to orders.js)
    const ordersLinkAnchor = document.querySelector('a[href="#orders"]');
    if (ordersLinkAnchor) {
        ordersLinkAnchor.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (typeof displayOrders === 'function') displayOrders();
            if (ordersModal) ordersModal.style.display = 'flex';
            if (window.innerWidth <= 768) {
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Close orders modal
    if (ordersClose) {
        ordersClose.addEventListener('click', () => {
            if (ordersModal) ordersModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === ordersModal) {
            ordersModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Place order handler
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', () => {
            if (window.cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }

            const itemCount = window.cart.reduce((sum, item) => sum + item.quantity, 0);
            let subtotal = 0;
            window.cart.forEach(item => {
                const price = parseFloat(String(item.price).replace(/[₹$,]/g, '')) || 0;
                subtotal += price * item.quantity;
            });
            const total = (subtotal * 1.1).toFixed(2);

            const order = {
                id: 'ORD-' + Date.now(),
                date: new Date().toLocaleDateString(),
                itemCount: itemCount,
                total: total,
                items: window.cart.map(item => `${item.name} (x${item.quantity})`)
            };

            orders.push(order);
            saveOrders();
            
            // Save to order history if function exists
            if (typeof saveOrderToHistory !== 'undefined') {
                saveOrderToHistory(order);
            }
            
            window.cart = [];
            cart = window.cart;
            saveCart();

            alert('Order placed successfully!\nOrder ID: ' + order.id);
            if (cartModal) cartModal.style.display = 'none';
            displayCart();
            updateCartCount();
        });
    }

    // Sidebar management
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const sidebarClose = document.getElementById('sidebarClose');

    // Close sidebar when overlay is clicked
    if (overlay) {
        overlay.addEventListener('click', () => {
            if (sidebar) sidebar.classList.remove('active');
            overlay.style.display = 'none';
            document.body.classList.remove('sidebar-visible');
        });
    }

    // Close sidebar when close button is clicked
    if (sidebarClose) {
        sidebarClose.addEventListener('click', () => {
            if (sidebar) sidebar.classList.remove('active');
            overlay.style.display = 'none';
            document.body.classList.remove('sidebar-visible');
        });
    }

    updateCartCount();
});

// Display cart items
function displayCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    
    if (!cartItemsDiv) return;
    
    if (window.cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        updateCartTotals();
        if (placeOrderBtn) placeOrderBtn.disabled = true;
        return;
    }

    let html = '';
    window.cart.forEach((item, index) => {
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">${item.price}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="decreaseQty(${index})">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="increaseQty(${index})">+</button>
                </div>
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });
    
    cartItemsDiv.innerHTML = html;
    updateCartTotals();
    if (placeOrderBtn) placeOrderBtn.disabled = false;
}

// Quantity controls
function increaseQty(index) {
    if (window.cart[index]) {
        window.cart[index].quantity += 1;
        saveCart();
        displayCart();
    }
}

function decreaseQty(index) {
    if (window.cart[index]) {
        if (window.cart[index].quantity > 1) {
            window.cart[index].quantity -= 1;
        } else {
            removeItem(index);
            return;
        }
        saveCart();
        displayCart();
    }
}

// Remove item from cart
function removeItem(index) {
    if (window.cart[index]) {
        window.cart.splice(index, 1);
        saveCart();
        displayCart();
    }
}

// Update cart totals
function updateCartTotals() {
    let subtotal = 0;
    window.cart.forEach(item => {
        const price = parseFloat(item.price.replace(/[₹$,]/g, ''));
        subtotal += price * item.quantity;
    });

    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = '₹' + subtotal.toFixed(2);
    if (taxEl) taxEl.textContent = '₹' + tax.toFixed(2);
    if (totalEl) totalEl.textContent = '₹' + total.toFixed(2);
}

