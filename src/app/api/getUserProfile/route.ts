export async function GET(request: Request) {
  try {
    const tokenUrl = '/api/getAccessToken'; // assuming this is the route that handles the POST function
    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
    });

    if (!tokenResponse.ok) {
      // Handle non-2xx responses
      console.error('Error fetching token:', tokenResponse.statusText);
      return new Response(JSON.stringify({ error: 'Failed to fetch token' }), {
        status: tokenResponse.status,
      });
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const url = 'https://api.spotify.com/v1/me';
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      // Handle non-2xx responses
      console.error('Spotify API error:', response.statusText);
      return new Response(JSON.stringify({ error: 'Failed to fetch user data' }), {
        status: response.status,
      });
    }

    const userData = await response.json();
    return new Response(JSON.stringify({ userName: userData.display_name }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error sending request:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}