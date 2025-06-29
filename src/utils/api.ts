/**
 * Process an opt-out request by calling the real API route
 * @param token The opt-out token
 * @returns Object with success status and message
 */
export async function processOptOut(token: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const res = await fetch('/api/remove-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });

    if (!res.ok) {
      const error = await res.json();
      return {
        success: false,
        message: error?.error || 'Failed to process opt-out.'
      };
    }

    const data = await res.json();
    return {
      success: true,
      message: data?.message || 'You have been removed from the ecosystem.'
    };
  } catch (error) {
    console.error('⛔ API error during opt-out:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again later.'
    };
  }
}
