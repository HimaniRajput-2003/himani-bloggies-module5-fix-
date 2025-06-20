/**
 * Mock users data for the admin panel
 */
export const mockUsers = [
    { id: 'user001', credits: 50, raffleEntries: 3 },
    { id: 'user002', credits: 10, raffleEntries: 0 },
    { id: 'user003', credits: 75, raffleEntries: 5 },
    { id: 'user004', credits: 25, raffleEntries: 1 },
    { id: 'user005', credits: 100, raffleEntries: 8 },
    { id: 'user006', credits: 5, raffleEntries: 0 }
];

/**
 * Process an opt-out request
 * @param token The opt-out token
 * @returns Object with success status and message
 */
export async function processOptOut(token: string): Promise<{ success: boolean; message: string }> {
    // This is a mock implementation - in a real app, this would call an API
    if (!token || token.length < 6) {
        return {
            success: false,
            message: 'Invalid token provided'
        };
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock successful opt-out
    return {
        success: true,
        message: 'Opt-out request processed successfully. It will take effect in 45 days.'
    };
}
