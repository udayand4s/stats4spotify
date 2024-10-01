import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID as string;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string;

    if (!clientId || !clientSecret) {
      console.error('Spotify Client ID or Secret is missing');
      return new Response(JSON.stringify({ error: 'Spotify credentials missing' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const tokenEndpointUri = 'https://accounts.spotify.com/api/token';
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${credentials}`,
    };

    const body = new URLSearchParams({
      grant_type: 'client_credentials',
    }).toString();

    const response = await axios.post(tokenEndpointUri, body, { headers });
    const accessToken = response.data.access_token;

    console.log('Access Token:', accessToken);
    return NextResponse.json({ access_token: accessToken });

  } catch (error) {
    console.error('Error fetching access token:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch access token' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
