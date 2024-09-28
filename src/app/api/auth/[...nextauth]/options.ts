// pages/api/auth/[...nextauth].ts
import type { NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect to /api/dashboard after successful login
      return `${baseUrl}/api/dashboard`;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token as string;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
    }
    

  }
