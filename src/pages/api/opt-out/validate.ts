import { NextApiRequest, NextApiResponse } from 'next';
import { validateToken } from '@/utils/token-utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { token } = req.query;

    if (!token || typeof token !== 'string') {
        return res.status(400).json({
            valid: false,
            error: 'Token is required'
        });
    }

    // Validate the token
    const tokenData = validateToken(token);

    res.status(200).json(tokenData);
}
