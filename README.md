<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
</head>

<body>

<h1>🕊️ Anonymous Confessions</h1>
<p><em>Speak Freely. Stay Anonymous.</em></p>

<p>
  🌐 <strong>Live Application:</strong>
  <a href="https://confessions-tau.vercel.app/" target="_blank">
    https://confessions-tau.vercel.app/
  </a>
</p>

<hr />

<h2>📌 Overview</h2>
<p>
  <strong>Anonymous Confessions</strong> is a real-time, privacy-first web platform
  that allows users to share thoughts, emotions, and experiences <strong>anonymously</strong>
  in a safe and judgment-free environment.
</p>

<p>
  The application focuses on <strong>real-time synchronization</strong>,
  <strong>user anonymity</strong>, and <strong>clean system architecture</strong>,
  making it suitable for both production use and portfolio demonstration.
</p>

<hr />

<h2>✨ Key Features</h2>
<ul>
  <li>🕶️ <strong>Complete Anonymity</strong> – No login, no identity tracking</li>
  <li>⚡ <strong>Real-Time Updates</strong> – Confessions, likes & reactions sync instantly</li>
  <li>❤️ <strong>Likes & Emoji Reactions</strong> – Express support without comments</li>
  <li>🗂️ <strong>Category-Based Filtering</strong> – General, Love, College, Career, Family, Mental Health</li>
  <li>🔥 <strong>Trending Confessions</strong> – Most popular posts highlighted dynamically</li>
  <li>🧠 <strong>Mental Health Awareness</strong> – Built-in support messaging</li>
  <li>🎨 <strong>Modern Glassmorphism UI</strong> – Clean, responsive dark theme</li>
  <li>🌍 <strong>Multi-Device Sync</strong> – Works seamlessly across devices</li>
</ul>

<hr />

<h2>🛠️ Technology Stack</h2>

<h3>🎨 Frontend</h3>
<ul>
  <li>⚛️ React (Vite)</li>
  <li>🎨 Custom CSS (Glassmorphism UI)</li>
  <li>🔌 Socket.IO Client</li>
  <li>🌐 Axios</li>
  <li>🍞 React Hot Toast</li>
</ul>

<h3>🧩 Backend</h3>
<ul>
  <li>🟢 Node.js</li>
  <li>🚂 Express.js</li>
  <li>🍃 MongoDB with Mongoose</li>
  <li>🔌 Socket.IO</li>
  <li>🧹 Profanity Filtering Middleware</li>
</ul>

<h3>☁️ Infrastructure</h3>
<ul>
  <li>🌐 Frontend: Vercel</li>
  <li>🛢️ Backend: Render</li>
  <li>☁️ Database: MongoDB Atlas</li>
</ul>

<hr />

<h2>🧠 System Architecture</h2>

<pre>
User Action (Post / Like / React)
        ↓
REST API (MongoDB Persistence)
        ↓
Socket.IO Event Emission
        ↓
Real-Time Update Across All Clients
</pre>

<ul>
  <li>✅ No manual refresh required</li>
  <li>✅ Single source of truth</li>
  <li>✅ Consistent state across devices</li>
</ul>

<hr />

<h2>📂 Project Structure</h2>

<pre>
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
</pre>

<hr />

<h2>🔄 Core Functionalities</h2>
<ul>
  <li>📥 Fetch confessions via REST API</li>
  <li>🔁 Real-time synchronization using WebSockets</li>
  <li>❤️ Live likes & emoji reactions</li>
  <li>🗂️ Category filtering & popularity sorting</li>
  <li>🔥 Trending confessions logic</li>
  <li>🚫 Profanity filtering for content safety</li>
</ul>

<hr />

<h2>🔒 Privacy & Safety</h2>
<ul>
  <li>🚫 No authentication required</li>
  <li>🧾 No personal data stored</li>
  <li>🧼 Automatic profanity filtering</li>
  <li>🧠 Mental health support prompts included</li>
</ul>

<p><strong>⚠️ Note:</strong> This platform is not a substitute for professional mental health services.</p>

<hr />

<h2>📈 Scalability & Design Decisions</h2>
<ul>
  <li>🔌 WebSocket-based real-time architecture</li>
  <li>🧠 Context-based global state management</li>
  <li>🔁 Derived state handled safely to avoid stale UI</li>
  <li>🧩 Clear separation between REST APIs & sockets</li>
  <li>♻️ Stateless backend design</li>
</ul>

<hr />

<h2>🚀 Future Enhancements</h2>
<ul>
  <li>🔐 Per-device interaction limits</li>
  <li>🚨 Reporting & moderation dashboard</li>
  <li>📊 Analytics panel for trends</li>
  <li>🌍 Multi-language support</li>
  <li>🧵 Optional anonymous discussions</li>
</ul>

<hr />

<h2>🧪 Local Development</h2>

<h3>✅ Prerequisites</h3>
<ul>
  <li>Node.js (v18+)</li>
  <li>MongoDB Atlas account</li>
</ul>

<h3>⚙️ Setup Instructions</h3>

<pre>
# Clone repository
git clone &lt;repository-url&gt;

# Backend setup
cd backend
npm install
npm run dev

# Frontend setup
cd frontend
npm install
npm run dev
</pre>

<p>Create a <code>.env</code> file inside <code>backend</code>:</p>

<pre>
MONGO_URI=your_mongodb_connection_string
PORT=5000
</pre>

<hr />

<h2>📄 License</h2>
<p>📜 This project is licensed under the <strong>MIT License</strong>.</p>

<hr />

<h2>👨‍💻 Author</h2>
<p>
  <strong>Aryan Dhiman</strong><br />
  Aspiring Full Stack Developer<br />
  🌐 Live Project:
  <a href="https://confessions-tau.vercel.app/" target="_blank">
    https://confessions-tau.vercel.app/
  </a>
</p>

<hr />

<h2>⭐ Closing Note</h2>
<p>
  Anonymous Confessions showcases a <strong>production-ready real-time system</strong>
  with strong emphasis on <strong>privacy, performance, and user experience</strong>.
</p>
<p>
  Ideal for <strong>portfolios, hackathons, and real-world anonymous platforms</strong>.
</p>
<p>
  ⭐ If you like this project, don’t forget to star the repository — it really helps!
</p>

</body>
</html>
