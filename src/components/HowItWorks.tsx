const steps = [
  {
    number: "01",
    title: "Build your knowledge base",
    description:
      "Upload your FAQs, services, pricing, and policies. Paste your website URL and Callix scrapes it automatically. Add custom Q&A so your agent answers exactly the way you would.",
    detail: "Updates go live instantly",
  },
  {
    number: "02",
    title: "Choose your voice & persona",
    description:
      "Pick from our library of ultra-realistic neural voices — or clone your own. Give your agent a name, set its tone, and define escalation rules. No scripting required.",
    detail: "Multiple voices available",
  },
  {
    number: "03",
    title: "Forward your phone number",
    description:
      "Point your existing business number to Callix or get a new dedicated number. Works with any carrier. No hardware. No hold music. No missed calls, ever.",
    detail: "Works with any existing number",
  },
  {
    number: "04",
    title: "Go live — data syncs automatically",
    description:
      "Your agent is live 24/7. Every call produces a full transcript, intake form, and summary synced to your CRM, EHR, or email. You focus on closing, not answering.",
    detail: "50+ integrations available",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-accent-500/30 bg-accent-500/10 text-accent-400 text-xs font-medium mb-4">
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Up and running in{" "}
            <span className="gradient-text">under 5 minutes</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            No developers. No lengthy onboarding. Just a voice agent that
            works — from day one.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-brand-500/20 via-brand-500/50 to-brand-500/20" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                {/* Step number bubble */}
                <div className="relative mb-6 z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-500 flex items-center justify-center shadow-lg shadow-brand-900/50">
                    <span className="text-white font-bold text-sm">{step.number}</span>
                  </div>
                  {/* animated ping on first step */}
                  {i === 0 && (
                    <div className="absolute inset-0 rounded-2xl bg-brand-500/30 animate-pulse-ring" />
                  )}
                </div>

                <h3 className="text-white font-semibold text-xl mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {step.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-brand-400 font-medium">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {step.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-16 bg-gradient-to-r from-brand-900/30 via-brand-800/20 to-accent-900/30 border border-brand-500/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-semibold text-xl mb-1">
              Ready to never miss a call again?
            </h3>
            <p className="text-slate-400 text-sm">
              Join 2,400+ businesses using Callix to automate their front desk.
            </p>
          </div>
          <a
            href="#pricing"
            className="flex-shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold text-sm shadow-lg shadow-brand-900/40 hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Start your free trial
          </a>
        </div>
      </div>
    </section>
  );
}
