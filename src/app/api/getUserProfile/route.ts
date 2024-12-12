import axios from 'axios';

export async function GET(request: Request) {
  try {
    const tokenResponse = await axios.get('http://localhost:3000/api/getAccessToken');

    if (tokenResponse.status !== 200) {
      console.error('Error fetching access token:', tokenResponse.status, tokenResponse.statusText);
      return new Response(JSON.stringify({ error: 'Failed to fetch access token' }), {
        status: tokenResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Parse the access token from the response
    const { access_token } = tokenResponse.data;
    console.log(access_token)

    if (!access_token) {
      console.error('Access token is missing in the response');
      return new Response(JSON.stringify({ error: 'Access token not provided' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Step 2: Use the access token to fetch the user's profile from Spotify API
    const profileEndpointUri = 'https://api.spotify.com/v1/me';
    const headers = {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    };

    const profileResponse = await axios.get(profileEndpointUri, { headers });

    if (profileResponse.status !== 200) {
      console.error('Spotify API error:', profileResponse.status, profileResponse.statusText);
      return new Response(JSON.stringify({ error: 'Failed to fetch user profile' }), {
        status: profileResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Extract the user's profile name
    const { display_name } = profileResponse.data;

    if (!display_name) {
      console.error('Display name is missing in the Spotify profile response');
      return new Response(JSON.stringify({ error: 'Display name not found' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Return the profile name in the response
    return new Response(JSON.stringify({ display_name }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    // Enhanced error handling
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message, error.response?.data);
      return new Response(JSON.stringify({ error: 'Failed to fetch user profile' }), {
        status: error.response?.status || 500,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      console.error('Unexpected error:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
}
