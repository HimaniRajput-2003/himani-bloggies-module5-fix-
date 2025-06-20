import React, { useState, useEffect } from 'react';
import { calculateTimeRemaining } from '../utils/token-utils';

interface CountdownTimerProps {
    expiryDate: Date;
}

const CountdownTimerComponent: React.FC<CountdownTimerProps> = ({ expiryDate }) => {
    const [timeRemaining, setTimeRemaining] = useState(() =>
        calculateTimeRemaining(new Date(expiryDate))
    );

    useEffect(() => {
        // Update countdown every second for smoother experience
        const intervalId = setInterval(() => {
            const newTimeRemaining = calculateTimeRemaining(new Date(expiryDate));
            setTimeRemaining(newTimeRemaining);

            if (newTimeRemaining.expired) {
                clearInterval(intervalId);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [expiryDate]);

    if (timeRemaining.expired) {
        return (
            <div className="text-center p-6 bg-red-100 border border-red-300 rounded-lg shadow-md">
                <p className="text-2xl font-bold text-red-800 mb-2">Opt-out period has expired</p>
                <p className="text-gray-700">Please contact support if you still need assistance.</p>
            </div>
        );
    }

    // Calculate percentage for progress bar
    const totalSeconds = 24 * 60 * 60 * timeRemaining.days + 60 * 60 * timeRemaining.hours + 60 * timeRemaining.minutes + timeRemaining.seconds;
    const maxSeconds = 7 * 24 * 60 * 60; // Assuming 7-day max countdown
    const progressPercentage = Math.max(0, Math.min(100, 100 - (totalSeconds / maxSeconds * 100)));

    return (
        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-800">Time Remaining to Complete Opt-Out:</h3>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 dark:bg-gray-700">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full"
                    style={{ width: `${progressPercentage}%` }}></div>
            </div>

            <div className="flex justify-center gap-4 text-center">
                <div className="countdown-section bg-white p-4 rounded-lg shadow-sm w-20">
                    <span className="block text-4xl font-bold text-indigo-700">{timeRemaining.days}</span>
                    <span className="text-sm text-indigo-600 font-medium">Days</span>
                </div>
                <div className="countdown-section bg-white p-4 rounded-lg shadow-sm w-20">
                    <span className="block text-4xl font-bold text-indigo-700">{timeRemaining.hours}</span>
                    <span className="text-sm text-indigo-600 font-medium">Hours</span>
                </div>                <div className="countdown-section bg-white p-4 rounded-lg shadow-sm w-20">
                    <span className="block text-4xl font-bold text-indigo-700">{timeRemaining.minutes}</span>
                    <span className="text-sm text-indigo-600 font-medium">Minutes</span>
                </div>
                <div className="countdown-section bg-white p-4 rounded-lg shadow-sm w-20">
                    <span className="block text-4xl font-bold text-indigo-700">{timeRemaining.seconds}</span>
                    <span className="text-sm text-indigo-600 font-medium">Seconds</span>
                </div>
            </div>

            <p className="mt-6 text-gray-600">Complete your opt-out process before the time expires.</p>
        </div>
    );
};

// Also export as default for backwards compatibility
// Export both as named and default
export const CountdownTimer = CountdownTimerComponent;
export default CountdownTimerComponent;
