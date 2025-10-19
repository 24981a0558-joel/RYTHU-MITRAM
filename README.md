# Welcome to our ai powered personal farming assistant

## Project info

**URL**: https://rythu-mitram-kon8.vercel.app/

# 🌾 RYTHU MITRAM — AI-Powered Farming Assistant

**RYTHU MITRAM** is an AI-driven web platform that helps farmers with real-time agricultural support, crop suggestions, and weather insights.  
It acts as a **digital companion for farmers**, using AI to provide personalized farming advice in a simple and interactive way.

---

## 🧭 Overview

Modern farmers face challenges like unpredictable weather, lack of expert guidance, and limited access to real-time crop data.  
RYTHU MITRAM bridges this gap using **Artificial Intelligence** and a **modern full-stack web app**, offering:

- 🤖 **AI Chatbot** – Answers crop-related questions intelligently using OpenAI.
- 🌦️ **Weather Insights** – Real-time weather updates to help plan farming activities.
- 🌾 **Crop Recommendations** – Suggests best crops based on soil and weather data.
- 📊 **Farmer Dashboard** – Displays essential farming data in visual format.
- 🔐 **User Authentication** – Secure sign-in system via Supabase.
- 📱 **Responsive Design** – Fully optimized for desktop and mobile devices.

---

## 🧰 Tech Stack

| Layer | Technology Used | Purpose |
|-------|-----------------|----------|
| **Frontend** | React + Vite | Fast, component-based UI and lightning-fast builds |
| **Styling** | Tailwind CSS + shadcn/ui | Clean, modern, and responsive design |
| **Backend / Database** | Supabase | Handles authentication, data storage, and APIs |
| **AI Integration** | OpenAI GPT API | Powers chatbot and recommendation system |
| **Deployment** | Vercel | Simple, automatic CI/CD and global hosting |

---

## 💡 Why This Stack?

> We selected this stack for its **speed, simplicity, and scalability** — perfect for a hackathon-ready AI web app.

- **React + Vite** → Fast, modular, and developer-friendly frontend setup.  
- **Tailwind CSS + shadcn/ui** → Rapid UI development with beautiful, consistent design.  
- **Supabase** → Open-source alternative to Firebase providing authentication + PostgreSQL DB.  
- **OpenAI API** → Easiest and most reliable way to integrate conversational AI.  
- **Vercel** → Quick deployment with continuous integration from GitHub.

This combination allowed us to build and deploy a full AI-integrated system quickly and efficiently.

---

## 🧠 AI Tools Used

| Tool | Role | Why It Was Used |
|------|------|----------------|
| **OpenAI GPT API** | Chatbot, Q&A, recommendations | Provides natural language understanding and smart responses |
| **Weather API** | Fetch live weather info | Helps generate weather-based crop suggestions |
| **Supabase Edge Functions (optional)** | Backend triggers | Used for async operations and data handling |

---

## ⚙️ Installation & Setup

Follow these steps to run RYTHU MITRAM locally 👇

### 1️⃣ Clone the Repository

git clone https://github.com/24981a0558-joel/RYTHU-MITRAM.git
cd RYTHU-MITRAM

2️⃣ Install Dependencies

npm install

3️⃣ Configure Environment Variables

Create a .env file in the root folder and add your keys:
VITE_SUPABASE_PROJECT_ID="yjjmrdsfakfjtmrsmofj"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlqam1yZHNmYWtmanRtcnNtb2ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3NDk5MjIsImV4cCI6MjA3NjMyNTkyMn0.zbJy8lySjI6tqvLARXjOI0ojvsXGnxhBo_aSUa_3MOA"
VITE_SUPABASE_URL="https://yjjmrdsfakfjtmrsmofj.supabase.co"

4️⃣ Run the Development Server

npm run dev

🧩 Project Structure

RYTHU-MITRAM/
│
├── public/              # Static assets (images, icons, etc.)
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Main pages (Home, Dashboard, Chatbot, etc.)
│   ├── lib/             # Supabase and API setup
│   ├── assets/          # Images, logos
│   ├── App.tsx          # Root component
│   └── main.tsx         # App entry point
│
├── .env.example         # Example environment file
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md

📈 Future Improvements

.🌐 Add multilingual chatbot (Telugu, Hindi, English)

.🌾 AI-based voice and crop detection for crop diseases in multipule languges

.📱 Mobile PWA support for offline mode

.🔔 Notifications for weather alerts and government schemes

.🤝 Integration with government agriculture data APIs




