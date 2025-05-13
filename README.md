
# 🎧 Stats4Spotify

**Stats4Spotify** is a web app that connects with your Spotify account and gives you personalized insights into your music listening habits. Built with **Next.js**, **TypeScript**, and the **Spotify Web API**, it allows you to view your top tracks, artists, and more.

## 🚀 Features

* 🔐 Spotify login via OAuth
* 📈 View your top tracks, top artists, and listening stats
* ⏳ Filter stats by short-term, medium-term, or long-term periods
* 🎨 Clean and responsive UI
* 📊 Dashboard view post-login

## 🛠️ Tech Stack

* **Next.js** (App Router)
* **TypeScript**
* **Spotify Web API**
* **Axios** for API requests
* **Tailwind CSS** (optional if you're using it)
* **NextAuth** (or custom auth logic)

## 🔧 Getting Started

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/stats4spotify.git
   cd stats4spotify
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file and add your Spotify API credentials:

   ```env
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret
   NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/api/callback
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```


## 📄 License

MIT License

---
