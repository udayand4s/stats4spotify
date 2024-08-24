'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Page = () => {
  const [tokenResponse, setTokenResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchTokenAndProfile = async () => {
      try {
        // First, fetch the access token
        const tokenResponse = await axios.post('/api/getAccessToken');

        // Check if the token response is valid
        if (tokenResponse.status === 200 && isMounted) {
          setTokenResponse(tokenResponse.data);

          // Now, fetch the user profile using the access token
          try {
            const profileResponse = await axios.get('/api/getUserProfile', {
              headers: {
                Authorization: `Bearer ${tokenResponse.data.access_token}`,
              },
            });

            // Check if the profile response is valid
            if (profileResponse.status === 200 && isMounted) {
              setName(profileResponse.data.display_name);
            } else if (isMounted) {
              setError('Failed to fetch the user profile');
            }
          } catch (profileError) {
            console.error('Error fetching user profile:', profileError);
            if (isMounted) {
              setError('Failed to fetch the user profile');
            }
          }
        } else if (isMounted) {
          setError('Failed to fetch the access token');
        }
      } catch (tokenError) {
        console.error('Error fetching access token:', tokenError);
        if (isMounted) {
          setError('Failed to fetch the access token');
        }
      }
    };

    fetchTokenAndProfile();

    return () => {
      isMounted = false;
    };
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
