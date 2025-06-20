import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Accordion from '@/components/Accordion';
import { readJsonFile } from '@/utils/file-loader';

interface FAQ {
    question: string;
    answer: string;
}

interface FAQPageProps {
    initialFaqs: FAQ[];
}

export default function FAQPage({ initialFaqs }: FAQPageProps) {
    const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>(initialFaqs);

    // This ensures content is always up-to-date, even after deployment
    useEffect(() => {
        fetch('/api/legal/faq')
            .then(res => res.json())
            .then(data => {
                if (data && data.faqs) {
                    setFaqs(data.faqs);
                    setFilteredFaqs(data.faqs);
                }
            })
            .catch(err => console.error('Failed to fetch FAQs:', err));
    }, []);

    // Filter FAQs based on search term
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredFaqs(faqs);
        } else {
            const filtered = faqs.filter(
                faq =>
                    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredFaqs(filtered);
        }
    }, [searchTerm, faqs]);

    // Group FAQs by categories (just a sample, you could enhance this with real categories)
    const categories = ['General', 'Raffle', 'Account', 'Technical Support'];

    return (
        <Layout title="Frequently Asked Questions">
            <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-lg p-8 text-white">
                    <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
                    <p className="text-lg opacity-90 mb-6">
                        Find answers to the most common questions about our services.
                    </p>

                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search FAQs..."
                            className="w-full p-4 pr-12 rounded-lg border-2 border-white bg-white/10 text-white placeholder-white/70 focus:outline-none focus:bg-white/20"
                        />
                        <svg
                            className="absolute right-4 top-4 w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <div className="bg-white rounded-b-lg shadow-xl p-8">
                    {/* Category tabs - only shown when not searching */}
                    {searchTerm.trim() === '' && (
                        <div className="flex overflow-x-auto space-x-2 mb-8 pb-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className="px-6 py-2 rounded-full bg-blue-100 text-blue-800 font-medium hover:bg-blue-200 flex-shrink-0"
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}

                    {filteredFaqs.length > 0 ? (
                        <Accordion items={filteredFaqs} />
                    ) : (
                        <div className="bg-yellow-50 p-6 rounded-lg text-center">
                            <svg className="w-16 h-16 text-yellow-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-xl font-medium text-yellow-800">No matching FAQs found</p>
                            <p className="text-yellow-700 mt-2">Try another search term or browse through the categories.</p>

                            {searchTerm.trim() !== '' && (
                                <button
                                    className="mt-4 px-6 py-2 bg-yellow-200 rounded-md text-yellow-800 font-medium hover:bg-yellow-300"
                                    onClick={() => setSearchTerm('')}
                                >
                                    Clear Search
                                </button>
                            )}
                        </div>
                    )}

                    {/* Contact section */}
                    <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Still have questions?</h3>
                        <p className="text-gray-600 mb-4">
                            Can't find the answer you're looking for? Please contact our support team.
                        </p>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                            Contact Support
                        </button>                    </div>
                </div>
            </div>
        </Layout>
    );
}


export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const faqData = await readJsonFile<{ faqs: FAQ[] }>('faq.json');
        return {
            props: {
                initialFaqs: faqData?.faqs || []
            }
        };
    } catch (error) {
        console.error('Failed to load FAQ content:', error);
        return { props: { initialFaqs: [] } };
    }
};
