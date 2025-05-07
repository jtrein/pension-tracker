import { INTEREST_RATE } from "./constants";

/**
 * Lump sum desired at retirement
 *
 * @param desiredIncomePerYear - Desired income per year in retirement
 * @param annualRate - Annual interest rate (default is INTEREST_RATE)
 * @returns Lump sum required at retirement
 * @throws Error if annualRate is less than or equal to 0
 */
export function calculateDesiredPensionLumpSum(
  desiredIncomePerYear: number,
  annualRate: number = INTEREST_RATE
): number {
  if (annualRate <= 0) {
    throw Error("Rate must be greater than 0");
  }

  return parseFloat((desiredIncomePerYear / annualRate).toFixed(2));
}
