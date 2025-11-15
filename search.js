// Search Functionality

// Product database - extracted from the page
const allProducts = [
    { name: 'Modern Laptop', price: '₹74,925', category: 'Electronics', img: 'https://picsum.photos/id/23/300/300' },
    { name: 'Cozy Sofa', price: '₹33,750', category: 'Furniture', img: 'https://picsum.photos/id/250/300/300' },
    { name: 'Stylish Dress', price: '₹3,749', category: 'Fashion', img: 'https://picsum.photos/id/1080/300/300' },
    { name: 'House Plant', price: '₹1,499', category: 'Home & Garden', img: 'https://picsum.photos/id/25/300/300' },
    { name: 'Bluetooth Speaker', price: '₹6,749', category: 'Electronics', img: 'https://picsum.photos/id/1011/300/300' },
    { name: 'Retro TV', price: '₹9,675', category: 'Electronics', img: 'https://picsum.photos/id/29/300/300' },
    { name: 'Vintage Radio', price: '₹5,999', category: 'Electronics', img: 'https://picsum.photos/id/1027/300/300' },
    { name: 'Gaming Console', price: '₹26,175', category: 'Electronics', img: 'https://picsum.photos/id/1050/300/300' },
    { name: 'Studio Monitor', price: '₹16,425', category: 'Electronics', img: 'https://picsum.photos/id/1062/300/300' },
    { name: 'Headphones', price: '₹6,675', category: 'Electronics', img: 'https://picsum.photos/id/1015/300/300' },
    { name: 'Compact Camera', price: '₹26,175', category: 'Electronics', img: 'https://picsum.photos/id/1039/300/300' },
    { name: 'Office Chair', price: '₹12,375', category: 'Furniture', img: 'https://picsum.photos/id/1050/300/300' },
    { name: 'Modern Bookshelf', price: '₹8,925', category: 'Furniture', img: 'https://picsum.photos/id/119/300/300' },
    { name: 'Desk Lamp', price: '₹2,249', category: 'Furniture', img: 'https://picsum.photos/id/1043/300/300' },
    { name: 'Classic Shoes', price: '₹4,499', category: 'Fashion', img: 'https://picsum.photos/id/1074/300/300' },
    { name: 'Casual T-Shirt', price: '₹1,125', category: 'Fashion', img: 'https://picsum.photos/id/1078/300/300' },
    { name: 'Premium Jeans', price: '₹2,625', category: 'Fashion', img: 'https://picsum.photos/id/1076/300/300' },
    { name: 'Garden Seeds Pack', price: '₹749', category: 'Home & Garden', img: 'https://picsum.photos/id/106/300/300' },
    { name: 'Premium Kitchen Set', price: '₹5,999', category: 'Home & Garden', img: 'https://picsum.photos/id/21/300/300' },
    { name: 'Outdoor Pillows Set', price: '₹3,375', category: 'Home & Garden', img: 'https://picsum.photos/id/24/300/300' }
];

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    const searchSubmit = document.getElementById('searchSubmit');
    const searchResults = document.getElementById('searchResults');

    // Open search modal
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            searchModal.classList.add('active');
            searchInput.focus();
            // Prevent body scroll on mobile
            if (window.innerWidth <= 768) {
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Close search modal
    if (searchClose) {
        searchClose.addEventListener('click', () => {
            searchModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    if (searchModal) {
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                searchModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            searchModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Search functionality
    const performSearch = () => {
        const query = searchInput.value.toLowerCase().trim();
        
        if (!query) {
            searchResults.innerHTML = '<p class="no-search-results">Type something to search...</p>';
            return;
        }

        const results = allProducts.filter(product => 
            product.name.toLowerCase().includes(query) || 
            product.category.toLowerCase().includes(query)
        );

        if (results.length === 0) {
            searchResults.innerHTML = '<p class="no-search-results">No products found matching your search.</p>';
        } else {
            searchResults.innerHTML = results.map(product => `
                <div class="search-result-item" data-product="${product.name}">
                    <img src="${product.img}" alt="${product.name}" class="search-result-img">
                    <div class="search-result-info">
                        <div class="search-result-name">${product.name}</div>
                        <div class="search-result-category">${product.category}</div>
                        <div class="search-result-price">${product.price}</div>
                    </div>
                </div>
            `).join('');

            // Add click handlers to results
            document.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const productName = item.getAttribute('data-product');
                    addSearchedProductToCart(productName);
                });
            });
        }
    };

    // Search on button click
    if (searchSubmit) {
        searchSubmit.addEventListener('click', performSearch);
    }

    // Search on Enter key
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Real-time search as user types
        searchInput.addEventListener('input', performSearch);
    }
});

function addSearchedProductToCart(productName) {
    const product = allProducts.find(p => p.name === productName);
    
    if (!product) return;

    // Get price as number
    let price = product.price.replace('₹', '').replace('$', '').trim();
    price = parseFloat(price);

    // Initialize cart if needed
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
            price: price,
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
    alert(`✅ ${productName} added to cart!`);
    
    // Close search modal
    const searchModal = document.getElementById('searchModal');
    if (searchModal) {
        searchModal.classList.remove('active');
    }
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
}
