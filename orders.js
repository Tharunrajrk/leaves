// Order History Management
let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];

// Save order to history
function saveOrderToHistory(order) {
    const orderData = {
        id: order.id,
        date: new Date().toISOString().split('T')[0],
        items: order.items,
        total: order.total,
        status: 'pending',
        trackingNumber: 'TRK' + Math.random().toString(36).substr(2, 9).toUpperCase()
    };
    
    orderHistory.unshift(orderData);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
}

// Format date
function formatOrderDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Display orders based on filter
function displayOrders(filter = 'all-orders') {
    const allOrdersList = document.getElementById('allOrdersList');
    const pendingOrdersList = document.getElementById('pendingOrdersList');
    const deliveredOrdersList = document.getElementById('deliveredOrdersList');
    const cancelledOrdersList = document.getElementById('cancelledOrdersList');

    let allHTML = '';
    let pendingHTML = '';
    let deliveredHTML = '';
    let cancelledHTML = '';

    if (orderHistory.length === 0) {
        const noDataMsg = '<p class="no-data">No orders yet. <a href="#products">Start shopping now!</a></p>';
        allOrdersList.innerHTML = noDataMsg;
        pendingOrdersList.innerHTML = '<p class="no-data">No pending orders</p>';
        deliveredOrdersList.innerHTML = '<p class="no-data">No delivered orders</p>';
        cancelledOrdersList.innerHTML = '<p class="no-data">No cancelled orders</p>';
        return;
    }

    orderHistory.forEach(order => {
        const itemsHTML = order.items.map((item, idx) => 
            `<div class="order-item-row">
                <span>${item} ${idx < order.items.length - 1 ? ',' : ''}</span>
            </div>`
        ).join('');

        const orderCard = `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <div class="order-id">${order.id}</div>
                        <div style="color: #999; font-size: 0.9rem;">Tracking: ${order.trackingNumber}</div>
                    </div>
                    <span class="order-status ${order.status}">${order.status.toUpperCase()}</span>
                </div>
                <div class="order-meta">
                    <div class="order-meta-item">
                        <span class="order-meta-label">Order Date</span>
                        <span class="order-meta-value">${formatOrderDate(order.date)}</span>
                    </div>
                    <div class="order-meta-item">
                        <span class="order-meta-label">Total Amount</span>
                        <span class="order-meta-value order-amount">₹${parseFloat(order.total).toFixed(2)}</span>
                    </div>
                    <div class="order-meta-item">
                        <span class="order-meta-label">Items</span>
                        <span class="order-meta-value">${order.items.length} Item(s)</span>
                    </div>
                </div>
                <div class="order-items">
                    <div class="order-items-label">Order Details</div>
                    ${itemsHTML}
                </div>
                <div class="order-footer">
                    <button class="order-btn order-btn-primary" onclick="trackOrder('${order.trackingNumber}')">Track Order</button>
                    <button class="order-btn order-btn-secondary" onclick="downloadInvoice('${order.id}')">Download Invoice</button>
                </div>
            </div>
        `;

        allHTML += orderCard;

        if (order.status === 'pending') {
            pendingHTML += orderCard;
        } else if (order.status === 'delivered') {
            deliveredHTML += orderCard;
        } else if (order.status === 'cancelled') {
            cancelledHTML += orderCard;
        }
    });

    allOrdersList.innerHTML = allHTML || '<p class="no-data">No orders</p>';
    pendingOrdersList.innerHTML = pendingHTML || '<p class="no-data">No pending orders</p>';
    deliveredOrdersList.innerHTML = deliveredHTML || '<p class="no-data">No delivered orders</p>';
    cancelledOrdersList.innerHTML = cancelledHTML || '<p class="no-data">No cancelled orders</p>';
}

// Track order
function trackOrder(trackingNumber) {
    alert(`📦 Tracking Order: ${trackingNumber}\n\nYour order is on the way! Expected delivery in 3-5 business days.`);
}

// Download invoice
function downloadInvoice(orderId) {
    const order = orderHistory.find(o => o.id === orderId);
    if (order) {
        alert(`📄 Invoice for ${orderId}\n\nTotal: ₹${parseFloat(order.total).toFixed(2)}\n\nInvoice will be downloaded shortly.`);
    }
}

// Handle order tab switching
document.addEventListener('DOMContentLoaded', () => {
    const orderTabBtns = document.querySelectorAll('.orders-tab-btn');
    const orderTabContents = document.querySelectorAll('.orders-tab-content');

    // Display initial orders
    displayOrders();

    orderTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            orderTabBtns.forEach(b => b.classList.remove('active'));
            orderTabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });

    // Make orders link functional - open orders modal
    const ordersLink = document.querySelector('a[href="#orders"]');
    const ordersModal = document.getElementById('ordersModal');
    
    if (ordersLink) {
        ordersLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (ordersModal) {
                ordersModal.style.display = 'flex';
                // Reset to all orders tab
                const allOrdersBtn = document.querySelector('.orders-tabs-modal [data-tab="all-orders"]');
                if (allOrdersBtn) {
                    allOrdersBtn.click();
                }
            }
        });
    }

    // Close modal when close button clicked
    const ordersClose = document.getElementById('ordersClose');
    if (ordersClose) {
        ordersClose.addEventListener('click', () => {
            if (ordersModal) {
                ordersModal.style.display = 'none';
            }
        });
    }

    // Close modal when clicking outside
    if (ordersModal) {
        window.addEventListener('click', (e) => {
            if (e.target === ordersModal) {
                ordersModal.style.display = 'none';
            }
        });
    }
});

// Listen for new orders from cart
window.addEventListener('storage', () => {
    displayOrders();
});
