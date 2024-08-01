// pages/api/user/profile.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = req.headers.authorization?.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const profile = await getUserProfile(accessToken);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
}
