import type { CurrentPensionPot, PensionFormValues } from "../types";
import { INTEREST_RATE, USER_AGE } from "./constants";

/**
 * Returns one data‐point per year from age USER_AGE → retirement age:
 * ```
 * { age: number, balance: number }
 *
 * ```
 * `balance` includes
 * - all existing pots grown at rate
 * - all monthly contributions grown at rate
 */
export function calculatePensionGrowthSeries(
  {
    retirementAge,
    employerMonthlyContribution,
    employeeMonthlyContribution,
    currentPensionPots,
  }: PensionFormValues,
  annualRate: number = INTEREST_RATE,
  startAge = USER_AGE
): Array<{ age: number; balance: number }> {
  const years: { age: number; balance: number }[] = [];

  let currentPotsBalance: number = currentPensionPots.reduce(
    (sum: number, p: CurrentPensionPot) => sum + p.currentPotValue,
    0
  );

  const totalAnnualContributions =
    (employerMonthlyContribution + employeeMonthlyContribution) * 12;

  for (let age = startAge; age <= retirementAge; age += 1) {
    years.push({ age, balance: parseFloat(currentPotsBalance.toFixed(2)) });

    // Add to the balance for the next year
    currentPotsBalance =
      currentPotsBalance * (1 + annualRate) + totalAnnualContributions;
  }

  return years;
}
