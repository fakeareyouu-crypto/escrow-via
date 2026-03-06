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
            className={`rounded-md border px-2 py-1 ${
              isActive ? "border-sky-300 bg-sky-50 text-sky-700" : "border-slate-200 text-slate-500"
            }`}
          >
            {step}
          </li>
        );
      })}
    </ol>
  );
}
