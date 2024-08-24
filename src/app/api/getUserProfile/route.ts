import axios from 'axios';

export async function GET(request: Request) {
  try {
    // Fetch the access token by making a POST request to /api/getAccessToken
    const tokenResponse = await axios.post('/api/getAccessToken');

    if (tokenResponse.status !== 200) {
      // Handle non-2xx responses for token fetch
      console.error('Error fetching access token:', tokenResponse.status, tokenResponse.statusText);
      return new Response(JSON.stringify({ error: 'Failed to fetch access token' }), {
        status: tokenResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Parse the access token from the response
    const { access_token } = tokenResponse.data;

    if (!access_token) {
      console.error('Access token is missing in the response');
      return new Response(JSON.stringify({ error: 'Access token not provided' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Define the Spotify API endpoint to get the user's profile
    const profileEndpointUri = 'https://api.spotify.com/v1/me';

    // Set up the headers with the access token
    const headers = {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    };

    // Send a GET request to Spotify API to fetch the user's profile
    const response = await axios.get(profileEndpointUri, { headers });

    if (response.status !== 200) {
      // Handle non-2xx responses from Spotify API
      console.error('Spotify API error:', response.status, response.statusText);
      return new Response(JSON.stringify({ error: 'Failed to fetch user profile' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Extract the user's profile name from the response
    const { display_name } = response.data;

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
    // Enhanced error handling for unexpected issues
    if (axios.isAxiosError(error)) {
      // Axios-specific error
      console.error('Axios error fetching user profile:', error.message, error.response?.data);
      return new Response(JSON.stringify({ error: 'Failed to fetch user profile' }), {
        status: error.response?.status || 500,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      // General error
      console.error('Unexpected error fetching user profile:', error.message || error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
}
