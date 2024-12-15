import React from 'react'
import axios from 'axios';

const topArtist = async () => {
    try {
      // Fetch access token
      const tokenResponse = await axios.post('/api/getAccessToken');
      console.log(tokenResponse.data);
      if (!tokenResponse.data || !tokenResponse.data.access_token) {
        throw new Error('Access token not found');
      }

      const accessCode = tokenResponse.data.access_token;
      console.log(accessCode);

      // Fetch user profile
      const profileEndpointUri = 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5&offset=0';
      const headers = {
        Authorization: `Bearer ${accessCode}`,
      };

      if (accessCode) {
        const profileResponse = await axios.get(profileEndpointUri, { headers });
        
        console.log(profileResponse.data);

      }
    } catch (err: any) {
      console.error('Error fetching profile:', err.message);
      
    }
  };

const page = () => {
  return (
    <div className='w-screen h-screen bg-black text-white flex flex-col items-center'>
        <div>hello</div>
    </div>
  )
}

export default page