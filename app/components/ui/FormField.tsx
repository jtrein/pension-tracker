import Input from "@/components/ui/Input";

/**
 * FormField is a reusable component that renders a
 * form field with a label and an error message.
 *
 * @param name         – the field name for the <input>
 * @param label        – the text for the <label>
 * @param errorMessage – the error message for this field
 * @param as           – the element or component to render, default <Input />
 * @param rest         – any other props you want to pass to the input
 */
export default function FormField<C extends React.ElementType = typeof Input>({
  name,
  label,
  errorMessage,
  as: Component = Input,
  ...rest
}: Readonly<
  {
    name: string;
    label: string;
    errorMessage?: string;
    as?: C;
  } & React.ComponentProps<C>
>): React.JSX.Element {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>

      {/* Need to keep `name` and `id` for react-hook-form and label */}
      <Component id={name} name={name} {...rest} />

      {errorMessage && (
        <p role="alert" className="text-rose-400">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
