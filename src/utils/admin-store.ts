// utils/admin-store.ts
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'entries.json');

type Entry = {
  token: string;
  credits: number;
  timestamp: string;
};

export function addEntry(token: string, credits: number) {
  let entries: Entry[] = [];

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    entries = JSON.parse(data);
  } catch (error) {
    console.error('Failed to read entries file:', error);
  }

  const newEntry: Entry = {
    token,
    credits,
    timestamp: new Date().toISOString(),
  };

  entries.unshift(newEntry);
  fs.writeFileSync(filePath, JSON.stringify(entries, null, 2), 'utf-8');
}
