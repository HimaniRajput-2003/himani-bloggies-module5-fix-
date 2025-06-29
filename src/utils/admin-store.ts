// utils/admin-store.ts (Vercel-compatible mock mode)

type Entry = {
  token: string;
  credits: number;
  timestamp: string;
};

// This array lives only in memory (resets every time Vercel restarts the serverless function)
let entries: Entry[] = [];

export function addEntry(token: string, credits: number) {
  const newEntry: Entry = {
    token,
    credits,
    timestamp: new Date().toISOString(),
  };

  entries.unshift(newEntry);
}

export function getEntries(): Entry[] {
  return entries;
}
