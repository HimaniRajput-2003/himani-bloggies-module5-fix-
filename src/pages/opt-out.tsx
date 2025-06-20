import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { CountdownTimer } from '@/components/CountdownTimer';
import { validateToken } from '@/utils/token-utils';
import { processOptOut } from '@/utils/api';
import Link from 'next/link';

export default function OptOutPage() {
    const router = useRouter();
    const { token } = router.query;

    const [tokenData, setTokenData] = useState<{
        valid: boolean;
        userId?: string;
        tokenDate?: Date;
        expiryDate?: Date;
    } | null>(null);

    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
    const [step, setStep] = useState<'confirm' | 'success' | 'error'>('confirm');

    // Validate token when it's available from the URL
    useEffect(() => {
        if (token && typeof token === 'string') {
            const result = validateToken(token);
            setTokenData(result);

            if (!result.valid) {
                setMessage({
                    text: 'The provided token is invalid or has expired.',
                    type: 'error'
                });
                setStep('error');
            }
        }
    }, [token]);

    const handleOptOut = async () => {
        if (!token || typeof token !== 'string' || !tokenData?.valid) return;

        setIsProcessing(true);
        setMessage(null);

        try {
            const response = await processOptOut(token);

            if (response.success) {
                setMessage({
                    text: response.message,
                    type: 'success'
                });
                setStep('success');
            } else {
                setMessage({
                    text: response.message || 'Failed to process your opt-out request. Please try again later.',
                    type: 'error'
                });
                setStep('error');
            }
        } catch (error) {
            setMessage({
                text: 'An error occurred while processing your request. Please try again later.',
                type: 'error'
            });
            setStep('error');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Layout title="Opt-Out Request" includeRaffleWidget={false}>
            <div className="mx-auto max-w-2xl">
                <h1 className="text-3xl font-bold mb-6 text-center text-indigo-800">Opt-Out Request</h1>

                {/* No token provided */}
                {!token && (
                    <div className="bg-yellow-50 p-8 rounded-lg shadow-md border border-yellow-200">
                        <div className="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <h2 className="text-2xl font-semibold text-yellow-700 mb-2">No Token Provided</h2>
                            <p className="text-yellow-700 text-center mb-4">Please access this page with a valid opt-out token.</p>
                            <Link href="/" className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                                Return to Home
                            </Link>
                        </div>
                    </div>
                )}

                {/* Invalid token */}
                {tokenData && !tokenData.valid && (
                    <div className="bg-red-50 p-8 rounded-lg shadow-md border border-red-200">
                        <div className="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h2 className="text-2xl font-semibold text-red-700 mb-2">Invalid Token</h2>
                            <p className="text-red-700 text-center mb-4">The token you provided is invalid or has expired. Please check your link and try again.</p>
                            <Link href="/" className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                                Return to Home
                            </Link>
                        </div>
                    </div>
                )}

                {/* Valid token - Confirm step */}
                {tokenData && tokenData.valid && tokenData.expiryDate && step === 'confirm' && (
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Confirm Opt-Out Request</h2>
                            <p className="mb-6 text-gray-600">
                                You have requested to opt out of our services. This process takes 45 days to complete.
                                Please review the countdown below to see when your opt-out will take effect.
                            </p>

                            <CountdownTimer expiryDate={tokenData.expiryDate} />

                            <div className="mt-8">                                <button
                                onClick={handleOptOut}
                                disabled={isProcessing}
                                className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                                    }`}
                            >
                                {isProcessing ? 'Processing...' : 'Confirm Opt-Out'}
                            </button>
                            </div>

                            {message && (
                                <div className={`mt-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                                    }`}>
                                    {message.text}
                                </div>
                            )}
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h3 className="font-semibold mb-2">What happens next?</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                <li>Your opt-out request will be processed immediately.</li>
                                <li>You will no longer receive marketing communications.</li>
                                <li>Your data will be fully removed from our systems after the 45-day period.</li>
                                <li>You can contact support if you change your mind during this period.</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Success step */}
                {step === 'success' && (
                    <div className="bg-green-50 p-8 rounded-lg shadow-md border border-green-200">
                        <div className="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <h2 className="text-2xl font-semibold text-green-700 mb-2">Opt-Out Confirmed</h2>
                            <p className="text-green-700 text-center mb-6">{message?.text || 'Your opt-out request has been processed successfully.'}</p>
                            <Link href="/" className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                                Return to Home
                            </Link>
                        </div>
                    </div>
                )}

                {/* Error step */}
                {step === 'error' && message && (
                    <div className="bg-red-50 p-8 rounded-lg shadow-md border border-red-200">
                        <div className="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h2 className="text-2xl font-semibold text-red-700 mb-2">Error</h2>
                            <p className="text-red-700 text-center mb-6">{message.text}</p>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setStep('confirm')}
                                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Try Again
                                </button>
                                <Link href="/" className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                                    Return to Home
                                </Link>
                            </div>
                        </div>                    </div>
                )}
            </div>
        </Layout>
    );
}
