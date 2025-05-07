"use client";

import { useState } from "react";
import PensionForm from "@/components/PensionForm";

export default function PensionTracker(): React.JSX.Element {
  const [view, setView] = useState<"form" | "charts">("form");

  return (
    <div>
      {view == "form" ? (
        <PensionForm />
      ) : (
        <button onClick={() => setView("form")}>← Edit</button>
      )}
    </div>
  );
}
