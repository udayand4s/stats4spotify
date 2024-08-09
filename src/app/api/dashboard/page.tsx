'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Page = () => {
  const [tokenResponse, setTokenResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.post('/api/getAccessToken');
        if (isMounted) {
          setTokenResponse(response.data);
          console.log('Token response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        if (isMounted) {
          setError('Failed to fetch the access token');
        }
      }
    };

    fetchData();

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
    </div>
  );
};

export default Page;
