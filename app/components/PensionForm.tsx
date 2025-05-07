import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "@/components/ui/FormField";
import { MIN_RETIREMENT_AGE } from "@/lib/constants";

type CurrentPensionPot = {
  currentPotId: string;
  currentPotValue: number;
  currentPotProviderName: string;
};

type FormValues = {
  retirementIncomePerYear: number;
  employerMonthlyContribution: number;
  employeeMonthlyContribution: number;
  retirementAge: number;
  currentPensionPots: CurrentPensionPot[];
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

const CurentPensionPotsSchema = z.object({
  currentPotId: z.string().uuid("Invalid UUID"),
  currentPotProviderName: z.string().min(1, "Provider name is required"),
  currentPotValue: z.preprocess(
    parseAsNumber,
    z.number(MUST_BE_NUMBER_ERROR).gte(1, getGteErrorMessage(1))
  ),
});

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
  currentPensionPots: z.array(CurentPensionPotsSchema),
});

export default function PensionForm({
  defaultValues,
  onSubmit,
}: Readonly<PensionFormProps>): React.JSX.Element {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(PensionFormSchema),
  });

  const {
    fields: currentPotsFields,
    append,
    remove,
  } = useFieldArray({
    name: "currentPensionPots",
    control,
  });

  const addCurrentPensionPot = () => {
    append({
      currentPotId: crypto.randomUUID(),
      currentPotValue: 0,
      currentPotProviderName: "",
    });
  };

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
          {currentPotsFields.map((item, i) => (
            <div key={item.id}>
              <FormField
                label="Current Pot ID"
                type="text"
                errorMessage={
                  errors.currentPensionPots?.[i]?.currentPotId?.message
                }
                placeholder="123e4567-e89b-12d3-a456-426614174000"
                {...register(`currentPensionPots.${i}.currentPotId`)}
                aria-hidden="true"
                className="hidden"
              />
              <FormField
                label="Provider Name"
                type="text"
                errorMessage={
                  errors.currentPensionPots?.[i]?.currentPotProviderName
                    ?.message
                }
                placeholder="Aviva"
                {...register(`currentPensionPots.${i}.currentPotProviderName`)}
              />
              <FormField
                label="Current Value"
                type="number"
                placeholder="10000"
                errorMessage={
                  errors.currentPensionPots?.[i]?.currentPotValue?.message
                }
                {...register(`currentPensionPots.${i}.currentPotValue`)}
              />

              <button type="button" onClick={() => remove(i)}>
                ✕
              </button>
            </div>
          ))}
        </div>

        <button type="button" onClick={addCurrentPensionPot}>
          + Add a current pension
        </button>
      </div>

      <button type="submit">🐿️ Calculate pension!</button>
    </form>
  );
}
