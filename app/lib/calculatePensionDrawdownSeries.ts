import { INTEREST_RATE, LIFE_EXPECTANCY } from "./constants";

/**
 * Returns one data‐point per year from retirement age → `LIFE_EXPECTANCY`.:
 *
 *  ```
 * { age: number, balance: number }
 *
 * ```
 * After withdrawing the balance will still grow at the annual `INTEREST_RATE`.
 *
 * @param startingBalance - Initial balance at retirement age
 * @param retirementAge - Age at which the user plans to retire
 * @param desiredIncomePerYear - Desired income per year
 * @param lifeExpectancy - Expected lifespan of the user
 * @param annualRate - Annual growth rate of the pension pots
 * @returns Array of objects containing the age and balance at that age
 */
export function calculatePensionDrawdownSeries(
  startingBalance: number,
  retirementAge: number,
  desiredIncomePerYear: number,
  lifeExpectancy: number = LIFE_EXPECTANCY,
  annualRate: number = INTEREST_RATE
): { age: number; balance: number }[] {
  const years: { age: number; balance: number }[] = [];
  let balance = startingBalance;

  for (let age = retirementAge; age <= lifeExpectancy; age += 1) {
    years.push({ age, balance: parseInt(balance.toFixed(2)) });

    // Update the balance for the next year
    balance = Math.max(balance * (1 + annualRate) - desiredIncomePerYear, 0);
  }

  return years;
}
