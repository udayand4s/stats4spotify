'use client'
import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
  popularity: number;
}

const TopArtistsPage = () => {
  const { data: session, status } = useSession();
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState<string>('');

  // Fetch top artists when session is available
  useEffect(() => {
    if (session?.accessToken) {
      fetchTopArtists();
    }
  }, [session]);

  const fetchTopArtists = async () => {
    if (session?.accessToken) {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10", 
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        setTopArtists(response.data.items);
      } catch (error) {
        console.error("Error fetching top artists:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className='w-screen h-screen bg-black text-white flex flex-col items-center'>
      
      <div className="w-full max-w-7xl px-4 py-4">
        <h3 className="text-xl font-bold mb-8">Your Top Artists</h3>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-pulse flex space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        ) : topArtists.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {topArtists.map((artist) => (
              <div key={artist.id} className="flex flex-col items-center">
                {artist.images?.[0]?.url && (
                  <img 
                    src={artist.images[0].url} 
                    alt={artist.name} 
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full hover:opacity-75 duration-300" 
                  />
                )}
                <p className="mt-3 text-center font-medium">{artist.name}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {artist.popularity? artist.popularity : 'Unknown Popularity'}%
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No top artists found. Try listening to more music!</p>
        )}
      </div>
    </div>
  )
}

export default TopArtistsPage