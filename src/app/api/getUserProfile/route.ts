import axios from "axios";

export async function GET(request: Request) {
  try {
    const tokenResponse = await axios.get('/api/getAccessToken'); 
    const responseData = tokenResponse.data.access_token;

    const url = 'https://api.spotify.com/v1/me';
    const headers = {
      'Authorization': `Bearer ${responseData}`,
      'Content-Type': 'application/json'
    };

    const response = await axios.get(url,
      {headers
      },
    );

    const userData = await response;
    return userData;

  } catch (error) {
    console.error('Error sending request:', error);
  }
}