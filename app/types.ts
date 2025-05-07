export type CurrentPensionPot = {
  currentPotId: string;
  currentPotValue: number;
  currentPotProviderName: string;
};

export type PensionFormValues = {
  retirementIncomePerYear: number;
  employerMonthlyContribution: number;
  employeeMonthlyContribution: number;
  retirementAge: number;
  currentPensionPots: CurrentPensionPot[];
};
