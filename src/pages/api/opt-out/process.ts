import { NextApiRequest, NextApiResponse } from 'next';
import { processOptOut } from '@/utils/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { token } = req.body;

    if (!token || typeof token !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'Token is required'
        });
    }

    try {
        // Process the opt-out request
        const result = await processOptOut(token);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error processing opt-out:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while processing your request'
        });
    }
}
