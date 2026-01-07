🕊️ Anonymous Confessions

Speak Freely. Stay Anonymous.

🌐 Live App: https://confessions-tau.vercel.app/

✨ Overview

Anonymous Confessions is a real-time, privacy-first web platform where users can share their thoughts, emotions, and experiences completely anonymously.
The platform is designed to be safe, judgment-free, and supportive, allowing people to express themselves without fear.

Built with modern web technologies, the app supports live updates, emoji reactions, category-based filtering, and a clean, elegant UI.

🚀 Key Features

🕶️ 100% Anonymous Posting – No login, no identity tracking

⚡ Real-Time Updates – Confessions, likes & reactions update instantly across devices

❤️ Likes & Emoji Reactions – Express support without comments

🗂️ Category Filters – General, Love, College, Career, Family, Mental Health

🔥 Trending Section – Most popular confessions highlighted

🧠 Mental Health Awareness – Built-in support & resources

🎨 Modern Glassmorphism UI – Clean, dark-themed, responsive design

🌍 Multi-Device Sync – Laptop & mobile stay in real-time sync

🛠️ Tech Stack
Frontend

⚛️ React (Vite)

🎨 Custom CSS (Glassmorphism UI)

🔌 Socket.IO Client

🌐 Axios

🍞 React Hot Toast

Backend

🟢 Node.js

🚂 Express.js

🍃 MongoDB + Mongoose

🔌 Socket.IO

🧹 Bad-Words Filter (Content Moderation)

Deployment

🌐 Frontend: Vercel

🛢️ Backend: Render

☁️ Database: MongoDB Atlas

📡 Real-Time Architecture
User Action (Like / React / Confess)
        ↓
REST API (MongoDB Update)
        ↓
Socket.IO Emit Event
        ↓
All Connected Clients Update Instantly


✅ No refresh required
✅ Works across multiple devices
✅ Single source of truth (Socket Context)

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

🧪 Core Functionalities

Fetch confessions via REST API

Live updates via Socket.IO

Real-time likes & emoji reactions

Category-based filtering & sorting

Trending confessions logic

Profanity filtering on submissions

🔒 Privacy & Safety

🚫 No authentication required

🧾 No personal data stored

🧼 Automatic profanity filtering

🧠 Mental health support prompts included

⚠️ If you are in emotional distress, please seek professional help immediately.

🌱 Future Enhancements

🔐 Per-device like restriction

📊 Analytics dashboard

🚨 Report / moderation system

🌍 Multi-language support

🧵 Optional threaded discussions (anonymous)

🤝 Contributing

Contributions are welcome!
Feel free to fork the repository and submit a pull request.

📄 License

This project is licensed under the MIT License.

👨‍💻 Author

Aryan Dhiman
💡 Full Stack Developer | Real-Time Systems Enthusiast

🌐 Live Project: https://confessions-tau.vercel.app/

⭐ Final Note

If you like this project, give it a ⭐ on GitHub — it really helps!
Built with ❤️ to give people a safe space to speak their truth.
