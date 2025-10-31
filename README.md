🛍️ Next.js E-Commerce Project

This is a simple E-Commerce web application built using Next.js (App Router), React, and Tailwind CSS.
It demonstrates SSR, CSR, API routes, dynamic routing, and environment-based configuration.

✅ Features

🏷️ Product listing page

📄 Dynamic product detail page (/products/[slug])

🔌 API routes for product data

🧠 Server & Client components

🌐 Handles dynamic base URL

🚀 Fully deployed on Vercel

🚀 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/krishnafauj/Internshala_assign1

2️⃣ Install & Run
npm install
npm run dev

3️⃣ Open in browser
http://localhost:3000

🌍 Live Demo

🔗 https://internshala-assign1-git-master-krishnafaujs-projects.vercel.app/




📁 Folder Structure
app/
 ├─ page.tsx               → Home page (Server Component)
 ├─ products/
 │   └─ [slug]/page.tsx    → Dynamic product page (Server Component)
 └─ api/
     └─ products/route.ts  → API route returning products JSON
data/
 └─ products.json          → Product mock database

🛠️ Build for Production
npm run build
npm start

🖼️ Screenshots
<img width="2878" height="1566" alt="image" src="https://github.com/user-attachments/assets/311116b1-d144-44b8-88e5-b1664248a571" />

<img width="2878" height="1568" alt="image" src="https://github.com/user-attachments/assets/7f8be89c-9f9a-47df-a42e-a6999dcde828" />
![Uploading image.png…]()


	
📝 Notes

This project is made for Next.js learning & internship assignment

Uses Server components for product fetching

Demonstrates API + UI integration

Products served from static JSON mock database

👤 Author

Krishna Faujdar
