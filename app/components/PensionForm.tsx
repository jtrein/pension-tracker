import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "@/components/ui/FormField";
import { MAX_RETIREMENT_AGE, MIN_RETIREMENT_AGE } from "@/lib/constants";
import { PensionFormValues } from "@/types";

export type PensionFormProps = {
  defaultValues: PensionFormValues;
  onSubmit: (data: PensionFormValues) => void;
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
      .lte(MAX_RETIREMENT_AGE, getGteErrorMessage(MAX_RETIREMENT_AGE))
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
      <div className="flex flex-col gap-y-2">
        <div className="w-fit flex flex-col gap-y-2">
          <FormField
            label="Annual income you want in retirement"
            errorMessage={errors.retirementIncomePerYear?.message}
            type="number"
            placeholder="30000"
            className="w-1/2"
            {...register("retirementIncomePerYear")}
          />
          <FormField
            label="Employer monthly contribution"
            type="number"
            errorMessage={errors.employerMonthlyContribution?.message}
            placeholder="400"
            className="w-1/2"
            {...register("employerMonthlyContribution")}
          />
          <FormField
            label="Your monthly contribution"
            type="number"
            errorMessage={errors.employeeMonthlyContribution?.message}
            placeholder="1000"
            className="w-1/2"
            {...register("employeeMonthlyContribution")}
          />
          <FormField
            label="Retirement age"
            type="number"
            errorMessage={errors.retirementAge?.message}
            placeholder="55"
            className="w-1/3"
            {...register("retirementAge")}
          />
        </div>

        {/* Current pensions */}
        <div className="flex flex-col gap-y-2">
          {currentPotsFields.map((item, i) => (
            <div key={item.id}>
              <div className="flex w-fit flex-col gap-y-2 sm:flex-row gap-x-4 sm:gap-y-0">
                {/* Don't display to user or assistive users */}
                <div className="hidden">
                  <FormField
                    label="Current Pot ID"
                    type="text"
                    errorMessage={
                      errors.currentPensionPots?.[i]?.currentPotId?.message
                    }
                    placeholder="123e4567-e89b-12d3-a456-426614174000"
                    aria-hidden="true"
                    {...register(`currentPensionPots.${i}.currentPotId`)}
                  />
                </div>

                <FormField
                  label="Provider Name"
                  type="text"
                  errorMessage={
                    errors.currentPensionPots?.[i]?.currentPotProviderName
                      ?.message
                  }
                  placeholder="Aviva"
                  {...register(
                    `currentPensionPots.${i}.currentPotProviderName`
                  )}
                />

                <FormField
                  label="Current Value"
                  type="number"
                  placeholder="10000"
                  errorMessage={
                    errors.currentPensionPots?.[i]?.currentPotValue?.message
                  }
                  className="w-1/2"
                  {...register(`currentPensionPots.${i}.currentPotValue`)}
                />
              </div>

              <button
                className="mt-2 cursor-pointer text-sm font-bold text-white/60 hover:text-rose-500"
                type="button"
                onClick={() => remove(i)}
              >
                🗑️ delete
              </button>
            </div>
          ))}
        </div>

        <button
          className="w-fit font-semibold mt-4 text-sm ring-1 ring-inset ring-white/50 rounded-lg py-2 px-4 cursor-pointer hover:bg-slate-200/20"
          type="button"
          onClick={addCurrentPensionPot}
        >
          + Add current pension
        </button>
      </div>

      <button
        className="mt-12 bg-blue-200 text-black text-xl font-semibold ring-2 ring-inset ring-slate-600 rounded-lg py-2 px-6 cursor-pointer hover:bg-blue-200/90"
        type="submit"
      >
        Calculate pension! 🐿️
      </button>
    </form>
  );
}
