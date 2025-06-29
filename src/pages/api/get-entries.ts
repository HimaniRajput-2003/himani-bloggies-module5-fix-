// pages/api/get-entries.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), 'data', 'entries.json');

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const entries = JSON.parse(data);
    res.status(200).json(entries);
  } catch (error) {
    console.error('Error reading entries:', error);
    res.status(500).json({ error: 'Failed to load entries' });
  }
}
