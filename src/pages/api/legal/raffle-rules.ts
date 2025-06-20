import { NextApiRequest, NextApiResponse } from 'next';
import { readMarkdownFile } from '@/utils/file-loader';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const content = await readMarkdownFile('raffle_rules_placeholder.md');
        res.status(200).send(content);
    } catch (error) {
        console.error('Error fetching raffle rules content:', error);
        res.status(500).send('# Error Loading Raffle Rules\n\nUnable to load raffle rules content.');
    }
}
