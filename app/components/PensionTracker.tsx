"use client";

import { useState } from "react";
import PensionForm, { type PensionFormProps } from "@/components/PensionForm";
import { calculateDesiredPensionLumpSum } from "@/lib/calculateDesiredPensionLumpSum";
import { INTEREST_RATE, USER_AGE } from "@/lib/constants";
import { calculatePensionGrowthSeries } from "@/lib/calculatePensionGrowthSeries";
import PensionGrowthChart from "@/components/PensionGrowthChart";
import { calculatePensionDrawdownSeries } from "@/lib/calculatePensionDrawdownSeries";
import { PensionDrawdownChart } from "./PensionDrawDownChart";

export default function PensionTracker(): React.JSX.Element {
  const [view, setView] = useState<"form" | "charts">("form");

  const [formValues, setFormValues] = useState<
    PensionFormProps["defaultValues"]
  >({
    retirementIncomePerYear: 0,
    employerMonthlyContribution: 0,
    employeeMonthlyContribution: 0,
    retirementAge: 0,
    currentPensionPots: [],
  });

  const desiredPensionLumpSum = calculateDesiredPensionLumpSum(
    formValues.retirementIncomePerYear,
    INTEREST_RATE
  );

  const pensionGrowthSeriesData = calculatePensionGrowthSeries(
    formValues,
    INTEREST_RATE,
    USER_AGE
  );

  const retireBalance = pensionGrowthSeriesData.at(-1)?.balance ?? 0;

  const pensionDrawdownSeriesData = calculatePensionDrawdownSeries(
    retireBalance,
    formValues.retirementAge,
    formValues.retirementIncomePerYear
  );

  const handleSubmit = (data: PensionFormProps["defaultValues"]) => {
    setFormValues(data);
    setView("charts");
  };

  return (
    <div>
      {view == "form" ? (
        <PensionForm defaultValues={formValues} onSubmit={handleSubmit} />
      ) : (
        <>
          <button onClick={() => setView("form")}>← Edit pension 🐿️</button>

          <div className="grid gap-4 w-[50vw]">
            <h2 className="text-2xl font-bold">
              Pension growth until retirement
            </h2>

            <PensionGrowthChart
              data={pensionGrowthSeriesData}
              desiredPensionLumpSum={desiredPensionLumpSum}
              retirementAge={formValues.retirementAge}
            />

            <h2 className="text-2xl font-bold">
              Pension drawdown in retirement
            </h2>

            <PensionDrawdownChart data={pensionDrawdownSeriesData} />
          </div>
        </>
      )}
    </div>
  );
}
