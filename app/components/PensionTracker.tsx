"use client";

import { useState } from "react";
import PensionForm, { type PensionFormProps } from "@/components/PensionForm";

export default function PensionTracker(): React.JSX.Element {
  const [view, setView] = useState<"form" | "charts">("form");

  const [formValues, setFormValues] = useState<
    PensionFormProps["defaultValues"]
  >({
    retirementIncomePerYear: 0,
    employerMonthlyContribution: 0,
    employeeMonthlyContribution: 0,
    retirementAge: 0,
    currentPotProviderName: "",
    currentPotValue: 0,
  });

  const handleSubmit = (data: PensionFormProps["defaultValues"]) => {
    setFormValues(data);
    setView("charts");
  };

  return (
    <div>
      {view == "form" ? (
        <PensionForm defaultValues={formValues} onSubmit={handleSubmit} />
      ) : (
        <button onClick={() => setView("form")}>← Edit</button>
      )}
    </div>
  );
}
