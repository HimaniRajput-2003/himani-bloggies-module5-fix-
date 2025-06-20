import React from 'react';
import Layout from './Layout';

interface LegalPageLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    lastUpdated?: string;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
    children,
    title,
    subtitle,
    lastUpdated
}) => {
    return (
        <Layout title={title}>
            <div className="max-w-6xl mx-auto">
                <div className="legal-page-header bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-lg p-8 text-white">
                    <h1 className="text-4xl font-bold mb-2">{title}</h1>
                    {subtitle && <p className="text-lg opacity-90">{subtitle}</p>}
                    {lastUpdated && (
                        <div className="mt-4 text-sm opacity-75 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Last updated: {lastUpdated}
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-b-lg shadow-xl p-8  prose-lg  legal-content">
                    {children}
                </div>

                <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200 legal-card">
                    <div className="flex items-start">
                        <div className="mr-4 bg-blue-100 p-3 rounded-full">
                            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Have questions?</h3>
                            <p className="text-gray-600 mb-4">
                                If you have any questions about these {title.toLowerCase()}, please contact our support team.
                            </p>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default LegalPageLayout;
