🛍️ Next.js E-Commerce Project

This is a simple E-Commerce web app built using Next.js (App Router), React, and Tailwind CSS.
It demonstrates SSR, CSR, API routes, dynamic routing, and environment-based configuration.

✅ Features

🏷️ Product listing page

📄 Dynamic product detail page (/products/[slug])

🔌 API routes for product data

🧠 Server & Client components

🌐 Dynamic base URL handling

🚀 Fully deployed on Vercel

🎯 Project Objective

Display products dynamically

Admin workflow to manage data (mock)

Practice SSR, CSR, API routes, file-based DB handling in Next.js

⚙️ Rendering Choices Explained
Page	Rendering Strategy	Reason
Home Page	SSR / SSG	SEO + fresh product data
Product Details	SSR	Show product info server-side
Admin Page	SSR + API	Security + controlled data access
Cart Page	CSR	Fast UI updates & state management
🔁 Data Flow

Client requests /api/products

Server reads from products.json

Response sent back to UI

UI renders products

Flow Diagram

User → Next.js Page → API Route → JSON File → Response → UI

🚀 Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/krishnafauj/Internshala_assign1
cd Internshala_assign1

2️⃣ Install & Run
npm install
npm run dev

3️⃣ Open in Browser
http://localhost:3000

🌍 Live Demo

🔗 https://internshala-assign1-git-master-krishnafaujs-projects.vercel.app/

⚙️ Environment Variable

Create a .env.local file:

NEXT_PUBLIC_BASE_URL=http://localhost:3000

🧠 Challenges & Solutions
Challenge	Solution
Multiple Vercel domains	Used dynamic URL logic
Local JSON DB path	Node FS inside API routes
Build error due to fetch	Handled fetch server-side + controlled env URL
📁 Folder Structure
app/
 ├─ page.tsx               → Home page (Server Component)
 ├─ products/
 │   └─ [slug]/page.tsx    → Dynamic product page
 └─ api/
     └─ products/route.ts  → API endpoint
data/
 └─ products.json          → Mock database

🛠️ Build For Production
npm run build
npm start

🖼️ Screenshots
🏠 Home Page
<img width="2878" height="1566" alt="image" src="https://github.com/user-attachments/assets/311116b1-d144-44b8-88e5-b1664248a571" />
Admin Page
<img width="2878" height="1568" alt="image" src="https://github.com/user-attachments/assets/7f8be89c-9f9a-47df-a42e-a6999dcde828" />
Dashboard
<img width="2844" height="1558" alt="image" src="https://github.com/user-attachments/assets/b2b0c21e-1139-413a-89f1-1893e99ea320" />

📝 Notes

Created as part of internship assignment & Next.js practice

Uses filesystem JSON as mock DB

Demonstrates API + UI integration in App Router

Server Components used for product fetching

👤 Author

Krishna Faujdar
