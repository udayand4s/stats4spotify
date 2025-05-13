'use client'
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import ClickableCard from "@/app/Components/MainCarousel";

interface SpotifyUser {
  display_name: string;
  images: { url: string }[];
  followers: { total: number };
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  tracks: { total: number };
}

export default function HomePage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<SpotifyUser | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [time, setTime] = useState<string>('');

  // Time-based greeting
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

  // Profile data fetch
  useEffect(() => {
    if (session?.accessToken) {
      fetchUserProfile();
      fetchUserPlaylists();
    } else {
      setLoading(false);
    }
  }, [session]);

  // Animation trigger
  useEffect(() => {
    // Set loaded to true after a short delay for animation purposes
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      
      setProfile(response.data);
      setLoading(false);
    } catch (err: any) {
      console.error("Error fetching profile:", err);
      setLoading(false);
    }
  };

  const fetchUserPlaylists = async () => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      
      setPlaylists(response.data.items);
    } catch (err: any) {
      console.error("Error fetching playlists:", err);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-black text-white flex flex-col">
      
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center">
        {/* Greeting */}
        <h2
          className={`max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-200 font-sans my-16 transition-opacity duration-700 ease-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
        >
          {time}, {profile ? profile.display_name : 'Guest'}
        </h2>

        {/* Loading State */}
        {loading && (
          <div className="w-full h-64 flex items-center justify-center">
            <div className="animate-pulse flex space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animation-delay-200"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animation-delay-400"></div>
            </div>
          </div>
        )}

        

        {/* User Content When Logged In */}
        {!loading && status === "authenticated" && (
          <div className="w-full max-w-7xl mx-auto px-4">
            
            

            {/* Clickable Card Component */}
            <ClickableCard />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 py-6 text-center text-xs text-gray-600">
        <p>© {new Date().getFullYear()} ,Rights Reserved</p>
      </footer>
    </div>
  );
}