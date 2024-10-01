'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const Page = () => {
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Request the user profile from your API endpoint
        const profileResponse = await axios.get('/api/getUserProfile');
        const userProfile = profileResponse.data;

        // Set the user's display name in the state
        setName(userProfile.display_name);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched or on error
      }
    };

    fetchUserProfile();
  }, []); // Runs once on component mount

  return (
    <div>
      {loading ? (
        <p>Loading...</p> // Show loading text while fetching data
      ) : (
        <p>{name ? name : 'Failed to load user data'}</p> // Display name or fallback message
      )}
    </div>
  );
};

export default Page;
