import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "@/components/ui/FormField";
import { MIN_RETIREMENT_AGE } from "@/lib/constants";

type FormValues = {
  retirementIncomePerYear: number;
  employerMonthlyContribution: number;
  employeeMonthlyContribution: number;
  retirementAge: number;
  currentPotProviderName: string;
  currentPotValue: number;
};

export type PensionFormProps = {
  defaultValues: FormValues;
  onSubmit: (data: FormValues) => void;
};

const parseAsNumber = (value: unknown) =>
  typeof value === "string" ? Number(value) : value;

const MUST_BE_NUMBER_ERROR = { invalid_type_error: "Value must be a number" };

const getGteErrorMessage = (value: number) =>
  `Value must be greater than or equal to ${value}`;

const PensionFormSchema = z.object({
  retirementIncomePerYear: z.preprocess(
    parseAsNumber,
    z.number(MUST_BE_NUMBER_ERROR).gte(1, getGteErrorMessage(1))
  ),
  employerMonthlyContribution: z.preprocess(
    parseAsNumber,
    z.number(MUST_BE_NUMBER_ERROR).gte(0, getGteErrorMessage(0))
  ),
  employeeMonthlyContribution: z.preprocess(
    parseAsNumber,
    z.number(MUST_BE_NUMBER_ERROR).gte(1, getGteErrorMessage(1))
  ),
  retirementAge: z.preprocess(
    parseAsNumber,
    z
      .number(MUST_BE_NUMBER_ERROR)
      .gte(MIN_RETIREMENT_AGE, getGteErrorMessage(MIN_RETIREMENT_AGE))
  ),
  currentPotProviderName: z.string().min(1, "Provider name is required"),
  currentPotValue: z.preprocess(
    parseAsNumber,
    z.number(MUST_BE_NUMBER_ERROR).gte(1, getGteErrorMessage(1))
  ),
});

export default function PensionForm({
  defaultValues,
  onSubmit,
}: Readonly<PensionFormProps>): React.JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(PensionFormSchema),
  });

  return (
    <form aria-label="Pension Form" onSubmit={handleSubmit(onSubmit)}>
      <FormField
        label="Annual income you want in retirement"
        errorMessage={errors.retirementIncomePerYear?.message}
        type="number"
        placeholder="30000"
        {...register("retirementIncomePerYear")}
      />
      <FormField
        label="Employer monthly contribution"
        type="number"
        errorMessage={errors.employerMonthlyContribution?.message}
        placeholder="400"
        {...register("employerMonthlyContribution")}
      />
      <FormField
        label="Your monthly contribution"
        type="number"
        errorMessage={errors.employeeMonthlyContribution?.message}
        placeholder="1000"
        {...register("employeeMonthlyContribution")}
      />
      <FormField
        label="Retirement age"
        type="number"
        errorMessage={errors.retirementAge?.message}
        placeholder="55"
        {...register("retirementAge")}
      />

      <div>
        <div>
          <FormField
            label="Provider Name"
            type="text"
            errorMessage={errors.currentPotProviderName?.message}
            placeholder="Aviva"
            {...register("currentPotProviderName")}
          />
          <FormField
            label="Current Value"
            type="number"
            placeholder="10000"
            errorMessage={errors.currentPotValue?.message}
            {...register("currentPotValue")}
          />

          <button onClick={() => {}}>✕</button>
        </div>

        <button type="button" onClick={() => {}}>
          Add a current pension
        </button>
      </div>

      <button type="submit">🐿️ Calculate pension!</button>
    </form>
  );
}
