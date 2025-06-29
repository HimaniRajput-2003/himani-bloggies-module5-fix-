// pages/admin/entries.tsx
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';

type Entry = {
  token: string;
  credits: number;
  timestamp: string;
};

export default function AdminEntriesPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEntries() {
      try {
        const res = await fetch('/api/get-entries');
        const data = await res.json();
        setEntries(data);
      } catch (err) {
        console.error('Failed to fetch entries', err);
      } finally {
        setLoading(false);
      }
    }

    fetchEntries();
  }, []);

  return (
    <Layout title="Admin Entries" includeRaffleWidget={false}>
      <div className="max-w-4xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-6 text-indigo-800">Opt-Out Log</h1>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : entries.length === 0 ? (
          <p className="text-gray-600">No entries found.</p>
        ) : (
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Token</th>
                <th className="py-3 px-4 text-left">Credits</th>
                <th className="py-3 px-4 text-left">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, idx) => (
                <tr key={idx} className="border-t">
                  <td className="py-2 px-4">{entry.token}</td>
                  <td className="py-2 px-4">{entry.credits}</td>
                  <td className="py-2 px-4">
                    {new Date(entry.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}
