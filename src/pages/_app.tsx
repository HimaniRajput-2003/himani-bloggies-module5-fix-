import '@/styles/tailwind.css';
import '@/styles/globals.css';
import '@/styles/legal-pages.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
