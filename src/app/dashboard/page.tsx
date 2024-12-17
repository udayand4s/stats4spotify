'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ClickableCard from '../Components/MainCarousel';
import { useSession } from 'next-auth/react';

const Page = () => {
  const [name, setName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [time, setTime] = useState<string>('');
  const [loaded, setLoaded] = useState(false); // State to control fade-in of the "Good Evening" text
  const { data: session } = useSession();
  console.log(session)

  const fetchTokenAndProfile = async () => {
    try {
      // Fetch access token
      const tokenResponse = await axios.post('/api/getAccessToken');
      console.log(tokenResponse.data);
      if (!tokenResponse.data || !tokenResponse.data.access_token) {
        throw new Error('Access token not found');
      }

      const {access_token} = await tokenResponse.data;
      console.log(access_token);

      // Fetch user profile
      const profileEndpointUri = 'https://api.spotify.com/v1/me/';
      const headers = {
        Authorization: `Bearer ${access_token}`,
      };

      if (access_token) {
        const profileResponse = await axios.get('https://api.spotify.com/v1/me', { headers });
        
        console.log(profileResponse.data);
        const { display_name } = profileResponse.data;
  
        if (!display_name) {
          throw new Error('Display name is missing in the Spotify profile response');
        }
  
        // Set the profile name in state
        setName(display_name);
      }
    } catch (err: any) {
      console.error('Error fetching profile:', err.message);
      setError(err.message || 'An unknown error occurred');
    }
  };

  // Fetch token and profile on component mount
  useEffect(() => {
    fetchTokenAndProfile();
  }, []);

  useEffect(() => {
    const getGreeting = () => {
      const currentHour = new Date().getHours();
  
      if (currentHour >= 6 && currentHour < 12) {
        setTime('Good Morning');
      } else if (currentHour >= 12 && currentHour < 16) {
        setTime('Good Afternoon');
      } else {
        setTime('Good Evening');
      }
    };
    getGreeting();
  }, []);

  // Simulate loading for fade-in effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true); // 
    }, 500); 
    return () => clearTimeout(timer); 
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

  
      <h2
        className={`max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-600 dark:text-neutral-200 font-sans my-16 transition-opacity duration-700 ease-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
      >
        {time}, Anushka
      </h2>

      <ClickableCard />
    </div>
  );
};

export default Page;
