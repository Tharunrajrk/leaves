# 🌿 Leaves - Your One-Stop Shop

A modern, fully responsive e-commerce website built with vanilla HTML, CSS, and JavaScript. Perfect for selling products across multiple categories with an intuitive user interface.

## ✨ Features

### 🛒 Core Functionality
- **Shopping Cart** - Add/remove products, adjust quantities, and place orders
- **Product Search** - Real-time search by product name or category
- **Featured Products** - Organized by category (Electronics, Furniture, Fashion, Home & Garden)
- **Order Management** - Track orders with status filtering (All, Pending, Delivered, Cancelled)
- **Customer Reviews** - 5-star rating system with comments
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

### 🎨 User Interface
- **Bright Green Theme** - Professional color scheme (#4CAF50 primary, #2e7d32 accent)
- **Hamburger Navigation** - Mobile-friendly sidebar menu with smooth animations
- **Modal Windows** - Cart, Orders, Search, and Featured Products in elegant modals
- **Animated Elements** - Smooth transitions and hover effects
- **Touch-Friendly** - 44px minimum tap targets for mobile devices

### 📱 Mobile Optimization
- Full mobile responsiveness (320px and up)
- Touch-optimized buttons and inputs
- Body scroll prevention in modals
- Optimized image sizes for mobile
- Reduced animations for accessibility

### 💾 Data Persistence
- **localStorage Integration** - Saves cart, orders, and reviews locally
- **No Backend Required** - Works completely client-side
- **Automatic State Management** - Data persists across page refreshes

## 🗂️ Project Structure

```
leaves/
├── index.html              # Main page
├── login.html              # Account page
├── style.css               # Main stylesheet (2317 lines)
├── login.css               # Login page styles
├── modal-styles.css        # Modal styling
├── cart.js                 # Cart functionality
├── orders.js               # Order management
├── reviews.js              # Reviews system
├── search.js               # Search functionality
├── featured.js             # Featured products modal
├── script.js               # Core interactivity
├── 1000113751.jpg          # Logo image
├── README.md               # This file
├── .gitignore              # Git ignore rules
└── MOBILE_OPTIMIZATION.md  # Mobile details
```

## 🚀 Getting Started

### Local Development
1. Clone the repository
2. Open `index.html` in a web browser
3. No server required - works locally!

### Deploy to GitHub Pages
1. Push repository to GitHub
2. Go to Settings → Pages
3. Select `main` branch as source
4. Website will be live at `https://yourusername.github.io/leaves`

### Deploy to Vercel
1. Connect GitHub repository to Vercel
2. Deploy with one click
3. Automatic updates on every push

## 📦 Products Included

### Electronics (5 items)
- Modern Laptop - ₹74,925
- Bluetooth Speaker - ₹6,749
- Retro TV - ₹9,675
- Headphones - ₹6,675
- Gaming Console - ₹26,175

### Furniture (4 items)
- Cozy Sofa - ₹33,750
- Office Chair - ₹12,375
- Modern Bookshelf - ₹8,925
- Desk Lamp - ₹2,249

### Fashion (4 items)
- Stylish Dress - ₹3,749
- Classic Shoes - ₹4,499
- Casual T-Shirt - ₹1,125
- Premium Jeans - ₹2,625

### Home & Garden (4 items)
- House Plant - ₹1,499
- Garden Seeds Pack - ₹749
- Premium Kitchen Set - ₹5,999
- Outdoor Pillows Set - ₹3,375

**Plus 10+ additional featured products!**

## 💡 How to Use

### Shopping
1. Click **"Featured Products"** in sidebar to browse by category
2. Use the **search icon** (🔍) to search for specific products
3. Click **"Shop Now"** to view all products
4. Click **"Add to Cart"** on any product

### Cart Management
1. Click the **cart icon** (🛒) in header to view items
2. Adjust quantities or remove items
3. Click **"Place Order"** to complete purchase
4. Order ID and tracking number generated automatically

### Checking Orders
1. Click **"Orders"** in sidebar
2. Filter by status: All, Pending, Delivered, Cancelled
3. Track order or download invoice

### Leaving Reviews
1. Scroll to **"Customer Reviews"** section
2. Fill in name, email, rating, and comment
3. Click **"Submit Review"**
4. Reviews display newest first

## 🎨 Customization

### Change Colors
Edit `:root` variables in `style.css`:
```css
:root {
    --primary-color: #4CAF50;    /* Main green */
    --light-green: #f1f8e9;      /* Light variant */
    --dark-grey: #333;            /* Text color */
    --light-grey: #f9f9f9;        /* Background */
}
```

### Add Products
1. Duplicate a product card in `index.html`
2. Update image URL and product details
3. Add to appropriate category

### Modify Prices
Update currency symbol in `style.css`:
- Currently using ₹ (Indian Rupees)
- Change to $ or € as needed

## 🔧 Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Responsive design with media queries
- **JavaScript ES6+** - Modern vanilla JavaScript
- **Font Awesome 6.0** - Icon library (CDN)
- **Google Fonts** - Poppins font family
- **PicSum Photos** - Free product images (API)
- **localStorage** - Browser data persistence

## 📊 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Responsive Breakpoints

- **Mobile**: 320px - 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px+

## 🔒 Security Features

- HTML escaping for user-submitted content
- Email validation in reviews form
- Input sanitization
- HTTPS ready for production

## 📈 Performance

- Lightweight (no frameworks)
- Fast page load (<2 seconds)
- Smooth animations with CSS transitions
- Optimized images from CDN
- localStorage caching for instant loads

## 🚨 Troubleshooting

### Images Not Loading
- Check PicSum Photos API availability
- Images will show broken links if API is down
- Replace with local images if needed

### localStorage Not Working
- Ensure localStorage is enabled in browser
- Works in all modern browsers
- Private/Incognito mode may disable it

### Modals Not Appearing
- Check browser console for errors (F12)
- Ensure all JS files are loaded
- Clear browser cache and reload

## 📝 License

Free to use and modify for personal or commercial projects.

## 🤝 Contributing

To improve this project:
1. Fork the repository
2. Make your changes
3. Submit a pull request

## 📞 Support

For issues or questions:
- Check the MOBILE_OPTIMIZATION.md for detailed info
- Review JavaScript console for error messages
- Test in different browsers

## 🎉 Features Showcase

✅ Modern UI with smooth animations  
✅ 20+ products across 4 categories  
✅ Full cart management system  
✅ Order tracking with status filters  
✅ Customer review system  
✅ Real-time product search  
✅ 100% mobile responsive  
✅ No backend required  
✅ localStorage persistence  
✅ Bright green theme  
✅ Touch-friendly interface  
✅ Production-ready code  

---

**Created with ❤️ for better shopping experiences**  
Built with vanilla HTML, CSS, and JavaScript  
Last Updated: November 15, 2025

## ✅ Local verification & Deploying to Vercel

### Local verification (Windows PowerShell)
Run a simple static server and open the site in a browser:

```powershell
# using Python (if installed)
python -m http.server 3000; # then open http://localhost:3000

# or using Node (if you have npm):
npx serve -s . -l 3000; # then open http://localhost:3000
```

Open the browser DevTools (F12) and check the Console for errors. If you see JS errors, they will include the filename and line number.

### Deploy to Vercel (recommended)
1. Commit your project to a GitHub repository.
2. Go to https://vercel.com and import your GitHub repository.
3. Vercel detects static sites automatically. Use the default settings and deploy.
4. Your site will be available at `https://your-project.vercel.app` (or your custom domain).

Notes:
- A `vercel.json` file is included to ensure static serving of `index.html`.
- If you update the repo, Vercel will auto-deploy on each push.
