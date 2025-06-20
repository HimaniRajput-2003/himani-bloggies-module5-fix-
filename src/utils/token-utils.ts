import { addDays, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

/**
 * Calculate time remaining until a date
 * @param tokenDate The date associated with the token
 * @returns Object with days, hours, minutes, and seconds remaining
 */
export function calculateTimeRemaining(tokenDate: Date): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    expired: boolean;
} {
    const expiryDate = addDays(new Date(tokenDate), 45);
    const now = new Date();

    if (now >= expiryDate) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            expired: true
        };
    }

    const days = differenceInDays(expiryDate, now);
    const hours = differenceInHours(expiryDate, now) % 24;
    const minutes = differenceInMinutes(expiryDate, now) % 60;
    const seconds = differenceInSeconds(expiryDate, now) % 60;

    return {
        days,
        hours,
        minutes,
        seconds,
        expired: false
    };
}

/**
 * Validates a token
 * @param token The token to validate
 * @returns Object with validation result and token data
 */
export function validateToken(token: string): {
    valid: boolean;
    userId?: string;
    tokenDate?: Date;
    expiryDate?: Date;
} {
    // This is a mock implementation - in a real app, this would validate against an API
    // Here we're just checking if the token follows a simple pattern
    if (!token || token.length < 6) {
        return { valid: false };
    }

    // Mock token validation - in a real app, this would be replaced with actual validation logic
    const userId = `user${token.substring(0, 3)}`;
    const tokenDate = new Date();
    const expiryDate = addDays(tokenDate, 45);

    return {
        valid: true,
        userId,
        tokenDate,
        expiryDate
    };
}
