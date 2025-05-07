"use client";

import { useState } from "react";
import PensionForm, { type PensionFormProps } from "@/components/PensionForm";
import { calculateTotalPensionTarget } from "@/lib/calculateTotalPensionTarget";
import { INTEREST_RATE, USER_AGE } from "@/lib/constants";
import { calculatePensionGrowthSeries } from "@/lib/calculatePensionGrowthSeries";

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

  const totalPensionTarget = calculateTotalPensionTarget(
    formValues.retirementIncomePerYear,
    INTEREST_RATE
  );

  const pensionGrowthSeriesData = calculatePensionGrowthSeries(
    formValues,
    INTEREST_RATE,
    USER_AGE
  );

  console.log(totalPensionTarget);
  console.log(pensionGrowthSeriesData);

  const handleSubmit = (data: PensionFormProps["defaultValues"]) => {
    setFormValues(data);
    setView("charts");
  };

  return (
    <div>
      {view == "form" ? (
        <PensionForm defaultValues={formValues} onSubmit={handleSubmit} />
      ) : (
        <button onClick={() => setView("form")}>← Edit pension 🐿️</button>
      )}
    </div>
  );
}
