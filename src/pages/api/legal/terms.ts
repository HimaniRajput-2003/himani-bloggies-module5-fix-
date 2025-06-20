import { NextApiRequest, NextApiResponse } from 'next';
import { readMarkdownFile } from '@/utils/file-loader';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const content = await readMarkdownFile('terms_placeholder.md');
        res.status(200).send(content);
    } catch (error) {
        console.error('Error fetching terms content:', error);
        res.status(500).send('# Error Loading Terms\n\nUnable to load terms content.');
    }
}
