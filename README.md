
🛍️ Next.js E-Commerce Project

This is a simple E-Commerce web application built using the Next.js App Router, React, and Tailwind CSS.
It demonstrates SSR, CSR, API routes, dynamic routing, and environment configuration in Next.js.

✅ Features

🏷️ Product listing page

📄 Product detail dynamic routing (/products/[slug])

🔌 API routes for fetching product data

🧠 Server & Client components usage

🌐 Environment-based URL configuration

📦 Deployed on Vercel

🚀 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/krishnafauj/Internshala_assign1
cd Internshala_assign1

2️⃣ Install Dependencies
npm install
npm run dev

3️⃣ Open in Browser
http://localhost:3000

🌍 Live Demo

🔗 https://internshala-assign1-git-master-krishnafaujs-projects.vercel.app/

⚙️ Environment Variables

Create a .env.local file in the project root:

NEXT_PUBLIC_BASE_URL=http://localhost:3000


On Vercel, this will be automatically replaced with your production URL.

📁 Folder Structure
app/
 ├─ page.tsx                → Home page
 ├─ products/
 │   └─ [slug]/page.tsx     → Single product page (dynamic routing)
 └─ api/
     └─ products/route.ts   → API route to fetch products

🛠️ Build for Production
npm run build
npm start

🖼️ Screenshots

<img width="2878" height="1566" alt="image" src="https://github.com/user-attachments/assets/9d07ae61-a6b7-4786-b0d1-0d543cab8f76" />

<img width="2878" height="1568" alt="image" src="https://github.com/user-attachments/assets/0c87dc0d-de56-4b8b-b7ca-920dfc5c72dd" />

	
📝 Notes

This project is created as part of Next.js learning & practice

Uses server components for product fetching

Demonstrates API + UI integration in Next.js App Router

Products are served from static JSON / API mock