const steps = [
  { id: "pending", label: "Deal Created", icon: "🧾" },
  { id: "accepted", label: "Seller Accepted", icon: "✅" },
  { id: "funded", label: "Escrow Funded", icon: "💰" },
  { id: "delivered", label: "Delivered", icon: "📦" },
  { id: "completed", label: "Released", icon: "🎉" }
];

const aliases: Record<string, string> = {
  "escrow funded": "funded"
};

export default function EscrowTimeline({ currentStatus }: { currentStatus: string }) {
  const normalized = aliases[currentStatus] || currentStatus;
  const activeIndex = Math.max(steps.findIndex((step) => step.id === normalized), 0);

  return (
    <ol className="grid gap-2 text-xs sm:grid-cols-5">
      {steps.map((step, index) => {
        const isActive = index <= activeIndex;
        return (
          <li
            key={step.id}
            className={`rounded-lg border px-2 py-1.5 text-center ${
              isActive
                ? "border-sky-500/60 bg-sky-500/15 text-sky-200"
                : "border-slate-700 bg-slate-900/50 text-slate-500"
            }`}
          >
            <span className="mr-1">{step.icon}</span>
            {step.label}
          </li>
        );
      })}
    </ol>
  );
}
