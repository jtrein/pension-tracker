import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const BASE_INPUT_CLASSES =
  "bg-white/95 rounded-xl px-4 py-2 text-black text-xl ring-2 ring-inset focus:ring-3 focus:ring-slate-400/80 focus:outline-0 ring-slate-300 hover:bg-white focus:bg-white";

export default function Input(props: Readonly<InputProps>): React.JSX.Element {
  return (
    <>
      <input
        {...props}
        className={twMerge(BASE_INPUT_CLASSES, props.className)}
      />
    </>
  );
}
