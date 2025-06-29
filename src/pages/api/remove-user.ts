import type { NextApiRequest, NextApiResponse } from 'next';
import { addEntry } from '@/utils/admin-store';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { token } = req.body;

    if (!token) {
      console.error('❌ No token in body');
      return res.status(400).json({ error: 'Token required' });
    }

    addEntry(token, -5);
    console.log(`✅ User removed: ${token}`);

    return res.status(200).json({
      success: true,
      message: 'You have been removed from the ecosystem.',
    });
  } catch (err) {
    console.error('❌ Error in /api/remove-user:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
