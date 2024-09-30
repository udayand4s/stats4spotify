import axios from "axios";

export async function POST(request: Request) {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID as string;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string;
    const tokenEndpointUri = 'https://accounts.spotify.com/api/token';

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const body = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    }).toString();

    const response = await axios.post(tokenEndpointUri, body, {
      headers,
    });
    console.log(response)
    return response;
    

  } catch (error) {
    console.error('Error sending request:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}