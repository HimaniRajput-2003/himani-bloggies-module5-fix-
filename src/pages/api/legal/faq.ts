import { NextApiRequest, NextApiResponse } from 'next';
import { readJsonFile } from '@/utils/file-loader';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const faqData = await readJsonFile<{ faqs: any[] }>('faq.json');

        if (!faqData) {
            return res.status(404).json({ error: 'FAQ data not found' });
        }

        res.status(200).json(faqData);
    } catch (error) {
        console.error('Error fetching FAQ content:', error);
        res.status(500).json({ error: 'Failed to load FAQ data', faqs: [] });
    }
}
