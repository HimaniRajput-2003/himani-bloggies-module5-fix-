import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import LegalPageLayout from '@/components/LegalPageLayout';
import { readMarkdownFile } from '@/utils/file-loader';

interface TermsPageProps {
    initialContent: string;
}

export default function TermsPage({ initialContent }: TermsPageProps) {
    const [content, setContent] = useState(initialContent);
    const [lastUpdated, setLastUpdated] = useState(`${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`);

    // This ensures content is always up-to-date, even after deployment
    useEffect(() => {
        fetch('/api/legal/terms')
            .then(res => res.text())
            .then(data => {
                setContent(data);
                // In a real app, you might get this date from metadata or an API
                setLastUpdated(`${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`);
            })
            .catch(err => console.error('Failed to fetch terms:', err));
    }, []);

    return (
        <LegalPageLayout
            title="Terms & Conditions"
            subtitle="Please read these terms and conditions carefully before using our service."
            lastUpdated={lastUpdated}
        >
            <ReactMarkdown className="prose-headings:text-blue-800 prose-a:text-blue-600 prose-a:font-semibold hover:prose-a:text-blue-800">
                {content}
            </ReactMarkdown>
        </LegalPageLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const content = await readMarkdownFile('terms_placeholder.md');
        return { props: { initialContent: content } };
    } catch (error) {
        console.error('Failed to load terms content:', error);
        return { props: { initialContent: '# Error Loading Terms\n\nUnable to load terms content.' } };
    }
};
