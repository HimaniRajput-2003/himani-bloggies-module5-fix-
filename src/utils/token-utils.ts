import {
  addDays,
  subDays,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

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
      expired: true,
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
    expired: false,
  };
}

/**
 * Validates a token (mock logic using last 2 digits of token as "days old")
 * @param token The token to validate
 * @returns Object with validation result and token data
 */
export function validateToken(token: string): {
  valid: boolean;
  userId?: string;
  tokenDate?: Date;
  expiryDate?: Date;
} {
  if (!token || token.length < 4) {
    return { valid: false };
  }

  const last2 = token.slice(-2);
  const simulatedDays = parseInt(last2);

  if (isNaN(simulatedDays)) {
    return { valid: false };
  }

  const tokenDate = subDays(new Date(), simulatedDays);
  const expiryDate = addDays(tokenDate, 45);
  const valid = simulatedDays >= 45;

  console.log("✅ Simulated token days:", simulatedDays, "| Valid:", valid);

  return {
    valid,
    userId: `user-${token.slice(0, 6)}`,
    tokenDate,
    expiryDate,
  };
}
