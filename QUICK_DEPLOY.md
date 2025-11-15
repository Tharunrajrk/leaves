# Quick Deploy to Vercel (60 Seconds)

## Step 1: Install Git
Download from https://git-scm.com/download/win

## Step 2: Initialize Git Repository
Open PowerShell in your project folder and run:
```powershell
git init
git add .
git commit -m "Initial commit - Leaves e-commerce ready for deployment"
```

## Step 3: Create GitHub Repository
1. Go to https://github.com/new
2. Create new repository named "leaves"
3. Copy the repository URL

## Step 4: Push to GitHub
```powershell
git remote add origin https://github.com/YOUR_USERNAME/leaves.git
git branch -M main
git push -u origin main
```

## Step 5: Deploy to Vercel
1. Go to https://vercel.com/new
2. Click "Import GitHub Project"
3. Select your "leaves" repository
4. Click "Deploy"
5. ✅ Done! Your site is live!

---

## Your Live URL
After deployment, you'll get a URL like:
`https://leaves-xxxxx.vercel.app`

---

## Enable Auto-Deployment
Every time you push to GitHub:
```powershell
git add .
git commit -m "Updated content"
git push
```
Vercel automatically deploys the changes within seconds!

---

## Need Help?
- Check vercel.json is in root directory ✓
- All HTML, CSS, JS files are included ✓
- Images are referenced correctly ✓
- No errors in console ✓

You're all set! 🚀
