import type { CurrentPensionPot } from "../types";
import { INTEREST_RATE, USER_AGE } from "./constants";

type FutureValueData = { name: string; value: number };

/**
 * Calculates each pot's future value at retirement age
 *
 * @param currentPensionPots - Array of CurrentPensionPot objects
 * @param retirementAge - Age at which the user plans to retire
 * @param desiredIncomePerYear - Desired annual income in retirement
 * @param currentAge - Current age of the user
 * @param annualRate - Annual growth rate of the pension pots
 * @returns Array of objects containing the name and future value of each pot
 */
export function calculateCurrentPotsFutureValue(
  currentPensionPots: CurrentPensionPot[],
  retirementAge: number,
  desiredIncomePerYear: number,
  currentAge: number = USER_AGE,
  annualRate: number = INTEREST_RATE
): FutureValueData[] {
  const years = Math.max(retirementAge - currentAge, 0);
  const factor = Math.pow(1 + annualRate, years);

  const potsFutureValue: FutureValueData[] = currentPensionPots.map((p) => ({
    name: p.currentPotProviderName,
    value: parseFloat((p.currentPotValue * factor).toFixed(2)),
  }));

  const desiredPensionLumpSum = desiredIncomePerYear / annualRate;

  const totalFutureValue = potsFutureValue.reduce((sum, s) => sum + s.value, 0);

  const leftToSave = parseFloat(
    Math.max(desiredPensionLumpSum - totalFutureValue, 0).toFixed(2)
  );

  return [...potsFutureValue, { name: "Left to save", value: leftToSave }];
}
