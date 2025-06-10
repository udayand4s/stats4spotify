# Stats4Spotify

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![Spotify API](https://img.shields.io/badge/Spotify-API-1DB954)](https://developer.spotify.com/)

**Discover the story your music tells about you.**

Stats4Spotify transforms your Spotify listening history into meaningful insights, revealing patterns you never knew existed in your musical journey. By analyzing your streaming data across different time periods, it uncovers your evolving tastes, hidden preferences, and the soundtrack to your life's different chapters.

Unlike basic music analytics that show simple play counts, Stats4Spotify creates a narrative from your data—understanding not just what you listen to, but how your musical identity shifts over time. Whether you're curious about your recent obsessions or want to rediscover forgotten favorites, this tool provides a deeply personal lens into your relationship with music.

## 🎵 Core Features

- **🔍 Multi-Dimensional Analysis** - Explore your music across short-term (4 weeks), medium-term (6 months), and long-term (years) periods to see how your taste evolves
- **🎨 Artist DNA Mapping** - Discover your musical genome through detailed artist preferences and genre distributions
- **📊 Listening Behavior Insights** - Understand when, how, and why you listen to different types of music
- **🔐 Privacy-First Design** - Secure OAuth integration that never stores your personal data—analytics happen in real-time
- **⚡ Instant Visualization** - Dynamic charts and graphs that update as you explore different time periods
- **📱 Responsive Experience** - Seamless interface that works beautifully on any device

## 🎯 What Makes This Different

**For Music Enthusiasts**
- Uncover hidden patterns in your listening habits that streaming services don't show
- Track how major life events influenced your musical preferences
- Discover the perfect time periods to create nostalgic playlists

**For Data Lovers**
- Rich visualizations that make your personal data fascinating and accessible
- Export-friendly insights for creating your own music analytics projects
- Real-time API integration demonstrating modern web development practices

**For Developers**
- Clean implementation of Spotify's complex OAuth flow
- Practical example of handling rate limits and API pagination
- Modern Next.js patterns with TypeScript for building data-driven applications

## 🛠️ Technical Architecture

- **Frontend**: Next.js 14+ with App Router for optimal performance
- **Language**: TypeScript for type-safe API interactions
- **Authentication**: Spotify OAuth 2.0 with secure token management
- **Data Layer**: Real-time Spotify Web API integration with intelligent caching
- **Styling**: Tailwind CSS for responsive, modern UI components
- **HTTP Client**: Axios with interceptors for robust API communication

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Spotify Developer Account (free)
- Basic understanding of OAuth flows

### Setup Your Spotify App

1. Visit [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new application
3. Add `http://localhost:3000/api/callback` to your redirect URIs
4. Note your Client ID and Client Secret

### Installation

1. **Clone and navigate**
   ```bash
   git clone https://github.com/udayand4s/stats4spotify.git
   cd stats4spotify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Spotify credentials to `.env.local`:
   ```env
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/api/callback
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_random_secret_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000) and connect your Spotify account

## 📈 Understanding Your Data

### Time Period Analysis
- **Short-term (4 weeks)** - Your current musical mood and recent discoveries
- **Medium-term (6 months)** - Seasonal preferences and sustained interests  
- **Long-term (several years)** - Your core musical identity and lasting favorites

### Metrics Explained
- **Top Artists** - Ranked by play time, not just play count
- **Top Tracks** - Your most-played songs with detailed listening statistics
- **Genre Distribution** - Breakdown of your musical preferences across categories
- **Listening Patterns** - Temporal analysis of when and how you consume music

## 🔒 Privacy & Security

- **No Data Storage** - Your listening data is never stored on our servers
- **Secure Authentication** - OAuth tokens are handled securely and expire automatically
- **Real-time Analysis** - All insights are generated on-demand from Spotify's API
- **Transparent Permissions** - Clear explanation of what data is accessed and why

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables in Vercel settings
4. Update your Spotify app's redirect URI to your production URL
5. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/udayand4s/stats4spotify)

### Environment Variables for Production

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
NEXT_PUBLIC_REDIRECT_URI=https://yourapp.vercel.app/api/callback
NEXTAUTH_URL=https://yourapp.vercel.app
NEXTAUTH_SECRET=your_production_secret_key
```

## 🎨 Customization

### Adding New Visualizations

The modular architecture makes it easy to add new chart types:

```typescript
// components/charts/NewChartType.tsx
export function NewChartType({ data }: { data: SpotifyData }) {
  // Your custom visualization logic
}
```

### Extending Data Analysis

Add new insights by creating custom hooks:

```typescript
// hooks/useCustomAnalysis.ts
export function useCustomAnalysis(timeRange: TimeRange) {
  // Your custom data processing logic
}
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-insight`)
3. Make your changes with tests
4. Commit your changes (`git commit -m 'Add amazing insight feature'`)
5. Push to the branch (`git push origin feature/amazing-insight`)
6. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Add tests for new features
- Ensure responsive design on all screen sizes
- Document any new environment variables

## 📊 API Rate Limits

Spotify's API has rate limits that this app handles gracefully:

- **Web API**: 100 requests per minute per application
- **Smart Caching**: Reduces API calls by temporarily storing results
- **Graceful Degradation**: Informative messages when limits are reached

## 🐛 Troubleshooting

### Common Issues

**Authentication Errors**
- Verify your redirect URI matches exactly in Spotify Developer Dashboard
- Check that all environment variables are properly set
- Ensure your Spotify app has the correct scopes enabled

**API Errors**
- Check if you've exceeded Spotify's rate limits
- Verify your Client ID and Secret are correct
- Ensure your Spotify account has sufficient listening history

**Build Errors**
- Update Node.js to version 18+
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for providing comprehensive music data
- [Next.js](https://nextjs.org/) for the excellent React framework
- [Tailwind CSS](https://tailwindcss.com/) for rapid UI development
- The open-source community for inspiration and best practices

## 🔗 Links

- [Live Demo](https://stats4spotify.vercel.app) (if deployed)
- [Spotify Developer Guide](https://developer.spotify.com/documentation/)
- [Report Issues](https://github.com/udayand4s/stats4spotify/issues)

---

**Built with 🎵 by [Udayand4s](https://github.com/udayand4s)**

*Your music tells a story. Let's discover it together.*
