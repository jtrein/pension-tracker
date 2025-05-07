import type { DetailedHTMLProps, InputHTMLAttributes } from "react";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function Input(props: Readonly<InputProps>): React.JSX.Element {
  return (
    <>
      <input
        className="bg-white/95 rounded-xl px-4 py-2 text-black text-xl font-[family-name:var(--font-outfit-sans)] ring-2 ring-inset focus:ring-3 focus:ring-slate-400/80 focus:outline-0 ring-slate-300 hover:bg-white focus:bg-white"
        {...props}
      />
    </>
  );
}
