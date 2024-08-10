import axios from 'axios';


export async function GET(request: Request) {
  try {
    // Get the access token
    const tokenResponse = await getAccessToken(request);
    const { access_token } = await tokenResponse.json();

    // Define the Spotify API endpoint to get the user's profile
    const profileEndpointUri = 'https://api.spotify.com/v1/me';

    // Set up the headers with the access token
    const headers = {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    };

    // Send a GET request to Spotify API to fetch the user's profile
    const response = await axios.get(profileEndpointUri, { headers });

    // Extract the user's profile name from the response
    const { display_name } = response.data;

    // Return the profile name in the response
    return new Response(JSON.stringify({ display_name }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching user profile:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch user profile' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
