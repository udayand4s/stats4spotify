'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';


const Page = () => {
  const [name, setName] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const tokenResponse = await axios.get('/api/getAccessToken');
        const accessToken = tokenResponse.data.access_token;
        console.log('Access Token:', accessToken);

        const profileResponse = await axios.get('/api/getUserProfile');
        console.log('Profile Response:', profileResponse);

        setName(profileResponse.data.display_name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserProfile();
  }, []); // Add an empty dependency array

  return (
    <div>
      <p>{name}</p> // Display the name state
    </div>
  );
};

export default Page;