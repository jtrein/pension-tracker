import FormField from "@/components/ui/FormField";

export default function PensionForm(): React.JSX.Element {
  return (
    <form aria-label="Pension Form">
      <FormField
        name="retirementIncomePerYear"
        label="Annual income you want in retirement"
        errorMessage=""
        type="number"
        min="1"
        step={"0.01"}
        placeholder="30000"
      />
      <FormField
        name="employerMonthlyContribution"
        label="Employer monthly contribution"
        type="number"
        min="0"
        step={"0.01"}
        errorMessage=""
        placeholder="400"
      />
      <FormField
        name="employeeMonthlyContribution"
        label="Your monthly contribution"
        type="number"
        min="0"
        step={"0.01"}
        errorMessage=""
        placeholder="1000"
      />
      <FormField
        name="retirementAge"
        label="Retirement age"
        type="number"
        min="0"
        step={"0.01"}
        errorMessage=""
        placeholder="55"
      />
    </form>
  );
}
