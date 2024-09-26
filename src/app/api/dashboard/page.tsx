'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Page = () => {
  const [tokenResponse, setTokenResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenAndProfile = async () => {
      try {
        // First, fetch the access token
        const tokenResponse = await axios.post('/api/getAccessToken');

        // Check if the token response is valid
        if (tokenResponse.status === 200) {
          setTokenResponse(tokenResponse.data);

          // Now, fetch the user profile using the access token
          const profileResponse = await axios.get('/api/getUserProfile', {
            headers: {
              Authorization: `Bearer ${tokenResponse.data.access_token}`, // Pass the token in Authorization header
            },
          });

          // Check if the profile response is valid
          if (profileResponse.status === 200) {
            setName(profileResponse.data.display_name);
          } else {
            setError('Failed to fetch the user profile');
          }
        } else {
          setError('Failed to fetch the access token');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data');
      }
    };

    fetchTokenAndProfile();
  }, []);

  return (
    <div>
      <h1>Page</h1>
      {tokenResponse ? (
        <pre>{JSON.stringify(tokenResponse, null, 2)}</pre>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Loading...</p>
      )}
      {name ? (
        <p>Name: {name}</p>
      ) : (
        <p>No name available</p>
      )}
    </div>
  );
};

export default Page;
