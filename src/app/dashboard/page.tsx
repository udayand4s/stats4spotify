'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AppleCardsCarouselDemo } from '../Components/MainCarousel';

const Page = () => {
  const [name, setName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchTokenAndProfile = async () => {
    try {
      // Fetch access token
      const tokenResponse = await axios.post('/api/getAccessToken');
      console.log(tokenResponse.data.access_token)
      if (!tokenResponse.data || !tokenResponse.data.access_token) {
        throw new Error('Access token not found');
      }

      const { access_token } = tokenResponse.data.access_token;

      // Fetch user profile
      const profileEndpointUri = 'https://api.spotify.com/v1/me';
      const headers = {
        Authorization: `Bearer  {access_token}`,
      };

      
        const profileResponse = await axios.get(profileEndpointUri, { headers });
        console.log(profileResponse.data.display_name)
        const { display_name } = profileResponse.data.display_name;

        if (!display_name) {
          throw new Error('Display name is missing in the Spotify profile response');
        }
      

      // Set the profile name in state
      setName(display_name);
    } catch (err: any) {
      console.error('Error fetching profile:', err.message);
      setError(err.message || 'An unknown error occurred');
    }
  };

  // Fetch token and profile on component mount
  useEffect(() => {
    fetchTokenAndProfile();
  }, []);

  return (
    <div className="w-screen h-full bg-black text-white flex flex-col items-center justify-center">
      <div className="mx-4 my-4">
        {error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : name ? (
          <h1 className="text-xl">Welcome, {name}!</h1>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
      <AppleCardsCarouselDemo />
    </div>
  );
};

export default Page;
