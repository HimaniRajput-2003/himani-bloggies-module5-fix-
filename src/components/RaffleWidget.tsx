import React, { useEffect } from 'react';

/**
 * Component that embeds the raffle widget script on the page
 */
export const RaffleWidget: React.FC = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/raffle-widget.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Clean up - remove the script when component unmounts
            const scriptElement = document.querySelector('script[src="/raffle-widget.js"]');
            if (scriptElement && scriptElement.parentNode) {
                scriptElement.parentNode.removeChild(scriptElement);
            }
        };
    }, []);

    return (
        <div className="raffle-widget-container my-8 p-4 bg-gray-50 rounded-lg">
            <div id="raffle-widget" className="flex justify-center">
                {/* This div will be populated by the raffle widget script */}
                <p className="text-gray-500">Loading raffle widget...</p>
            </div>
        </div>
    );
}
