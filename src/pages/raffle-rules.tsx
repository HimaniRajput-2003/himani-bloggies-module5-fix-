import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import LegalPageLayout from '@/components/LegalPageLayout';
import { readMarkdownFile } from '@/utils/file-loader';

interface RaffleRulesPageProps {
    initialContent: string;
}

export default function RaffleRulesPage({ initialContent }: RaffleRulesPageProps) {
    const [content, setContent] = useState(initialContent);
    const [lastUpdated, setLastUpdated] = useState(`${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`);

    // This ensures content is always up-to-date, even after deployment
    useEffect(() => {
        fetch('/api/legal/raffle-rules')
            .then(res => res.text())
            .then(data => {
                setContent(data);
                // In a real app, you might get this date from metadata or an API
                setLastUpdated(`${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`);
            })
            .catch(err => console.error('Failed to fetch raffle rules:', err));
    }, []);

    return (
        <LegalPageLayout
            title="Raffle Rules"
            subtitle="Official rules and regulations governing all raffle activities"
            lastUpdated={lastUpdated}
        >
            <div className="prose-blue">
                <ReactMarkdown className="prose-headings:text-blue-800 prose-a:text-blue-600 prose-a:font-semibold hover:prose-a:text-blue-800">
                    {content}
                </ReactMarkdown>
            </div>
        </LegalPageLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const content = await readMarkdownFile('raffle_rules_placeholder.md');
        return { props: { initialContent: content } };
    } catch (error) {
        console.error('Failed to load raffle rules content:', error);
        return { props: { initialContent: '# Error Loading Raffle Rules\n\nUnable to load raffle rules content.' } };
    }
};
