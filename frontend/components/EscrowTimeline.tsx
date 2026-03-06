const steps = ["pending", "accepted", "escrow funded", "delivered", "completed"];

export default function EscrowTimeline({ currentStatus }: { currentStatus: string }) {
  const activeIndex = Math.max(steps.indexOf(currentStatus), 0);

  return (
    <ol className="grid gap-2 text-xs sm:grid-cols-5">
      {steps.map((step, index) => {
        const isActive = index <= activeIndex;
        return (
          <li
            key={step}
            className={`rounded-lg border px-2 py-1.5 text-center capitalize ${
              isActive
                ? "border-sky-500/60 bg-sky-500/15 text-sky-200"
                : "border-slate-700 bg-slate-900/50 text-slate-500"
            }`}
          >
            {step}
          </li>
        );
      })}
    </ol>
  );
}
