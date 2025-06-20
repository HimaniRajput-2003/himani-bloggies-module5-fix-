import { NextPage } from 'next';
import Layout from '@/components/Layout';
import Link from 'next/link';

const Home: NextPage = () => {
    return (
        <Layout title="Home">
            <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-4xl font-bold mb-6">Welcome to Bloggies Viral Engine</h1>
                <p className="text-xl mb-8">Module 5: Legal Pages & Opt-Out UI</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <Link href="/terms" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h2 className="text-2xl font-semibold mb-2">Terms & Conditions</h2>
                        <p className="text-gray-600">View our terms and conditions.</p>
                    </Link>

                    <Link href="/raffle-rules" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h2 className="text-2xl font-semibold mb-2">Raffle Rules</h2>
                        <p className="text-gray-600">Learn about our raffle rules and guidelines.</p>
                    </Link>

                    <Link href="/faq" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h2 className="text-2xl font-semibold mb-2">FAQ</h2>
                        <p className="text-gray-600">Find answers to frequently asked questions.</p>
                    </Link>

                    <Link href="/admin" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h2 className="text-2xl font-semibold mb-2">Admin Panel</h2>
                        <p className="text-gray-600">View user credits and raffle entries.</p>
                    </Link>
                </div>                <div className="mt-12 p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-100">
                    <h2 className="text-2xl font-semibold mb-4">Opt-Out Information</h2>
                    <p className="text-gray-700 mb-4">
                        To opt out of our services, you need a valid token. Visit the opt-out page with your token:
                    </p>
                    <div className="bg-gray-100 p-4 rounded-md font-mono text-sm border border-gray-200">
                        /opt-out?token=your_token_here
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
