import { getSession } from 'next-auth/react';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session || !session.accessToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ error: 'Failed to fetch user data' });
  }
}