import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // First, request the access token from the `getAccessToken` endpoint
    const tokenResponse = await axios.post('/api/getAccessToken');
    const accessToken = tokenResponse.data.access_token;

    if (!accessToken) {
      console.error('Access token is missing');
      return new Response(JSON.stringify({ error: 'Access token missing' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Access Token:', accessToken);

    const url = 'https://api.spotify.com/v1/me';
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    const profileResponse = await axios.get(url, { headers });
    const userData = profileResponse.data;

    console.log('User Profile:', userData);

    return NextResponse.json(userData);

  } catch (error) {
    console.error('Error fetching user profile:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch user profile' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
