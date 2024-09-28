'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Page = () => {
  const [name, setName] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const tokenResponse = await axios.post('/api/getAccessToken');
        const accessToken = tokenResponse.data.access_token;
        console.log('Access Token:', accessToken);

        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        console.log('Request Headers:', headers);

        const profileResponse = await axios.get('https://api.spotify.com/v1/me', {
          headers,
        });
        console.log('Profile Response:', profileResponse);

        setName(profileResponse.data.display_name);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data');
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      <h1>Page</h1>
      {name ? (
        <p>Name: {name}</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;