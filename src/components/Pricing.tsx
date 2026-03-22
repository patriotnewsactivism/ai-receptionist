const plans = [
  {
    name: "Starter",
    price: 99,
    description: "Perfect for solo practitioners and small offices.",
    minutes: 150,
    overage: "0.79",
    features: [
      "150 minutes / month included",
      "1 AI voice agent",
      "Appointment scheduling",
      "Basic intake forms",
      "Email + SMS notifications",
      "Call transcripts",
      "Standard support",
    ],
    cta: "Start free trial",
    highlight: false,
  },
  {
    name: "Professional",
    price: 199,
    description: "For busy practices and growing teams.",
    minutes: 350,
    overage: "0.69",
    features: [
      "350 minutes / month included",
      "3 AI voice agents",
      "Everything in Starter",
      "CRM & calendar integrations",
      "Custom knowledge base",
      "Sentiment analytics",
      "Priority support",
    ],
    cta: "Start free trial",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Scale",
    price: 399,
    description: "For high-volume call centers and agencies.",
    minutes: 800,
    overage: "0.59",
    features: [
      "800 minutes / month included",
      "Unlimited agents",
      "Everything in Professional",
      "White-label options",
      "Dedicated account manager",
      "Custom voice cloning",
      "SLA guarantee",
    ],
    cta: "Start free trial",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-xs font-medium mb-4">
            Simple Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            A fraction of the cost of{" "}
            <span className="gradient-text">a human receptionist</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            The average receptionist costs $3,500/month. Callix answers every
            call, never calls in sick, and never puts a caller on hold — for a
            flat monthly rate.
          </p>
        </div>

        {/* Cost comparison bar */}
        <div className="max-w-3xl mx-auto mb-16 bg-[#0d0d1a] border border-white/5 rounded-2xl p-6">
          <div className="text-slate-400 text-sm text-center mb-4 font-medium">
            Monthly cost comparison
          </div>
          <div className="space-y-3">
            {[
              { label: "Human Receptionist (full-time)", cost: 3500, max: 3500, color: "bg-red-500/70" },
              { label: "Traditional Answering Service", cost: 420, max: 3500, color: "bg-orange-500/70" },
              { label: "Callix AI (Professional)", cost: 199, max: 3500, color: "bg-gradient-to-r from-brand-500 to-accent-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-44 text-xs text-slate-400 text-right flex-shrink-0">
                  {item.label}
                </div>
                <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} flex items-center justify-end pr-2`}
                    style={{ width: `${(item.cost / item.max) * 100}%` }}
                  >
                    <span className="text-white text-[10px] font-bold">
                      ${item.cost.toLocaleString()}/mo
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 flex flex-col ${
                plan.highlight
                  ? "bg-gradient-to-b from-brand-900/60 to-[#0d0d1a] border border-brand-500/50 shadow-2xl shadow-brand-900/30 scale-[1.02]"
                  : "bg-[#0d0d1a] border border-white/5"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white text-xs font-semibold">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-white font-semibold text-lg mb-1">
                  {plan.name}
                </h3>
                <p className="text-slate-500 text-sm mb-4">{plan.description}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">
                    ${plan.price}
                  </span>
                  <span className="text-slate-500 text-sm mb-1.5">/month</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  ${plan.overage}/min for additional minutes
                </div>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <svg
                      className="w-4 h-4 text-brand-400 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.highlight
                    ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white hover:opacity-90 shadow-lg shadow-brand-900/40"
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-600 text-sm mt-8">
          All plans include a 14-day free trial. No credit card required.
          Need more volume?{" "}
          <a href="#" className="text-brand-400 hover:text-brand-300 transition-colors">
            Contact us for custom enterprise pricing.
          </a>
        </p>
      </div>
    </section>
  );
}
