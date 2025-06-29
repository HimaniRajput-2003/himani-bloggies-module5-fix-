import Layout from '@/components/Layout';
import Link from 'next/link';

export default function AdminPage() {
    return (
        <Layout title="Admin Panel" includeRaffleWidget={false}>
            <div className="mx-auto max-w-4xl py-10">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Panel</h1>

                <div className="bg-white shadow rounded-lg p-6">
                    <p className="text-gray-700 text-lg mb-4">
                        To view opt-out activity logs (credit adjustments and user removals), click the button below:
                    </p>
                    <Link href="/admin/entries">
                        <span className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
                            Go to Opt-Out Log
                        </span>
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
