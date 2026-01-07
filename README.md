🕊️ Anonymous Confessions

Speak Freely. Stay Anonymous.

🌐 Live Application: https://confessions-tau.vercel.app/

📌 Overview

Anonymous Confessions is a real-time, privacy-first web platform that allows users to share thoughts, emotions, and experiences anonymously in a safe and judgment-free environment.

The application focuses on real-time synchronization, user anonymity, and clean system architecture, making it suitable for both production use and portfolio demonstration.

✨ Key Features

🕶️ Complete Anonymity – No login, no identity tracking

⚡ Real-Time Updates – Confessions, likes & reactions sync instantly

❤️ Likes & Emoji Reactions – Express support without comments

🗂️ Category-Based Filtering – General, Love, College, Career, Family, Mental Health

🔥 Trending Confessions – Most popular posts highlighted dynamically

🧠 Mental Health Awareness – Built-in support messaging

🎨 Modern Glassmorphism UI – Clean, responsive dark theme

🌍 Multi-Device Sync – Works seamlessly across devices

🛠️ Technology Stack
🎨 Frontend

⚛️ React (Vite)

🎨 Custom CSS (Glassmorphism UI)

🔌 Socket.IO Client

🌐 Axios

🍞 React Hot Toast

🧩 Backend

🟢 Node.js

🚂 Express.js

🍃 MongoDB with Mongoose

🔌 Socket.IO

🧹 Profanity Filtering Middleware

☁️ Infrastructure

🌐 Frontend: Vercel

🛢️ Backend: Render

☁️ Database: MongoDB Atlas

🧠 System Architecture
User Action (Post / Like / React)
        ↓
REST API (MongoDB Persistence)
        ↓
Socket.IO Event Emission
        ↓
Real-Time Update Across All Clients


✅ No manual refresh required
✅ Single source of truth
✅ Consistent state across devices

📂 Project Structure
anonymous-confessions/
├── frontend/
│   ├── components/
│   ├── context/
│   ├── services/
│   ├── styles/
│   └── App.jsx
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md
🔄 Core Functionalities

📥 Fetch confessions via REST API

🔁 Real-time synchronization using WebSockets

❤️ Live likes & emoji reactions

🗂️ Category filtering & popularity sorting

🔥 Trending confessions logic

🚫 Profanity filtering for content safety

🔒 Privacy & Safety

🚫 No authentication required

🧾 No personal data stored

🧼 Automatic profanity filtering

🧠 Mental health support prompts included

⚠️ This platform is not a substitute for professional mental health services.

📈 Scalability & Design Decisions

🔌 WebSocket-based real-time architecture

🧠 Context-based global state management

🔁 Derived state handled safely to avoid stale UI

🧩 Clear separation between REST APIs & sockets

♻️ Stateless backend design

🚀 Future Enhancements

🔐 Per-device interaction limits

🚨 Reporting & moderation dashboard

📊 Analytics panel for trends

🌍 Multi-language support

🧵 Optional anonymous discussions

🧪 Local Development
✅ Prerequisites

Node.js (v18+)

MongoDB Atlas account

⚙️ Setup Instructions
# Clone repository
git clone <repository-url>

# Backend setup
cd backend
npm install
npm run dev

# Frontend setup
cd frontend
npm install
npm run dev


Create a .env file inside backend:

MONGO_URI=your_mongodb_connection_string
PORT=5000

📄 License

📜 This project is licensed under the MIT License.

👨‍💻 Author

Aryan Dhiman
Full Stack Developer

🌐 Live Project: https://confessions-tau.vercel.app/

⭐ Closing Note

Anonymous Confessions showcases a production-ready real-time system with strong emphasis on privacy, performance, and user experience.
Ideal for portfolios, hackathons, and real-world anonymous platforms.

If you like this project, don’t forget to ⭐ the repository — it really helps!
