ext.js E-Commerce Project

This is a simple e-commerce website built using Next.js App Router, React, and Tailwind CSS.

✅ Features

Product listing page

Product details page

API routes for data

Server + client components

Environment variable setup

🚀 Installation & Setup
1️⃣ Clone the Repository
git clone <your-repo-link>
cd <your-project-folder>

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables

Create a .env.local file:

BASE_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000


(An .env.example file is included for reference)

4️⃣ Run the Project
npm run dev


Now open in browser:

http://localhost:3000

📁 Folder Structure
app/
 ├─ page.tsx           → Home page
 ├─ products/
 │   └─ [slug]/        → Product details pages
 └─ api/               → Backend API routes

📦 Build for Production
npm run build
npm start

📞 Contact / Author

Krishna Faujdar
Project for Next.js learning & practice ✅