import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import { type NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private',
      clientId: process.env.SPOTIFY_CLIENT_ID ?? '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect to /api/dashboard after successful login
      return `${baseUrl}/dashboard`;
    }, 
    async jwt({token, account}) {
      if (account) {
        token.accessToken = account.refresh_token;
      }
      return token;
    },
    async session({session, user}) {
      session.user = user ;
      return session;
    },
  },
  
};

