# NOIRVAULT — Mini E-commerce

A dark, futuristic mini e-commerce application built with React, React Router DOM, Redux Toolkit, and localStorage.

## Features
- Home, Products, Cart, About, Checkout, and custom 404 pages
- Redux Toolkit cart state (`addToCart`, `removeFromCart`, `increaseQuantity`, `decreaseQuantity`, `clearCart`)
- Cart quantity badge, subtotal/total, empty-cart state, and add-to-cart confirmation toast
- Active navigation highlighting
- Search and category filters
- Persistent cart using localStorage
- Checkout order summary and confirmation using `useNavigate`
- Responsive 3D-inspired dark UI

## Run locally
You need Node.js and npm installed.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Build for production
```bash
npm run build
```

## GitHub upload
Create an empty repository on GitHub, then run these commands inside this project folder:

```bash
git init
git add .
git commit -m "Build NOIRVAULT e-commerce app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the remote URL with your own repository URL. Do not upload `node_modules`; it is ignored by `.gitignore`.
