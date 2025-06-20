import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { RaffleWidget } from './RaffleWidget';

interface LayoutProps {
    children: React.ReactNode;
    title: string;
    includeRaffleWidget?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title, includeRaffleWidget = true }) => {
    return (
        <div className="min-h-screen flex flex-col">            <Head>
            <title>{`${title} | Bloggies Viral Engine`}</title>
            <meta name="description" content="Bloggies Viral Engine - Module 5 Legal Pages & Opt-Out UI" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

            <header className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold">Bloggies Viral Engine</h1>
                    </div>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><Link href="/" className="hover:text-blue-300">Home</Link></li>
                            <li><Link href="/terms" className="hover:text-blue-300">Terms</Link></li>
                            <li><Link href="/raffle-rules" className="hover:text-blue-300">Raffle Rules</Link></li>
                            <li><Link href="/faq" className="hover:text-blue-300">FAQ</Link></li>
                            <li><Link href="/admin" className="hover:text-blue-300">Admin</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="flex-grow container mx-auto py-6 px-4">
                {children}
                {includeRaffleWidget && <RaffleWidget />}
            </main>

            <footer className="bg-gray-800 text-white p-4 mt-8">
                <div className="container mx-auto text-center">
                    <p>&copy; {new Date().getFullYear()} Bloggies Viral Engine. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
