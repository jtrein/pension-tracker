import PensionTracker from "@/components/PensionTracker";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <h1 className="text-5xl font-bold tracking-tight mb-8">
          Pension Squirrel
        </h1>
        <PensionTracker />
      </main>
    </div>
  );
}
