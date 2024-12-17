import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID as string;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string;
    const tokenEndpointUri = 'https://accounts.spotify.com/api/token';

    // Form the request payload
    const data = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    });

    // Make the POST request using Axios
    const response = await axios.post(tokenEndpointUri, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
      
      // Return the token response
      return NextResponse.json(response.data, { status: 200 });
      

  } catch (error: any) {
    console.error('Error fetching token:', error.response?.data || error.message);

    // Handle errors gracefully
    return NextResponse.json(
      { error: 'Failed to fetch token' },
      { status: error.response?.status || 500 }
    );
  }
}