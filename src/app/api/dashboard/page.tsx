'use client'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const { data: session } = useSession();
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    if (session?.accessToken) {
      fetch('/api/user/profile', {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
        .then(response => response.json())
        .then(data => setName(data.display_name))
        .catch(console.error);
    }
  }, [session]);

  return (
    <div>
      <h1>Welcome to Spotify Stats</h1>
      {name ? <p>Your name: {name}</p> : <p>Loading...</p>}
    </div>
  );
}
