const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    title: "Human-Indistinguishable Voice",
    description:
      "Powered by the world's most advanced neural TTS. Natural cadence, emotional tone, breathing cues — callers genuinely can't tell the difference.",
    tag: "HD Neural Voice",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Sub-250ms Response Latency",
    description:
      "Our edge-deployed pipeline processes speech-to-intent-to-speech in under 250ms — creating a conversation that feels perfectly natural.",
    tag: "Ultra-low Latency",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: "Intelligent Intake & Qualification",
    description:
      "Collect patient details, qualify leads, or complete custom intake forms. All data syncs to your CRM, EHR, or webhook in real-time.",
    tag: "Smart Intake",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Appointment Scheduling",
    description:
      "Integrates with Google Calendar, Calendly, and 30+ scheduling platforms. Books, reschedules, and confirms appointments end-to-end.",
    tag: "Calendar Integration",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: "Smart Call Routing & Escalation",
    description:
      "Handles routine calls autonomously and escalates complex issues to your team with full context — including a transcript and call summary.",
    tag: "Intelligent Routing",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Analytics & Call Intelligence",
    description:
      "Full transcripts, sentiment scores, call outcomes, and conversion metrics. Know exactly what callers are asking and how agents perform.",
    tag: "Deep Analytics",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 relative"
    >
      {/* subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-xs font-medium mb-4">
            Platform Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Everything your front desk does —{" "}
            <span className="gradient-text">done better</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Callix agents are trained on millions of real calls to handle every
            scenario your business encounters — without scripts, without fatigue.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative bg-[#0d0d1a] border border-white/5 rounded-2xl p-6 hover:border-brand-500/30 transition-all duration-300 hover:-translate-y-1 glow-card"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 mb-4 group-hover:bg-brand-500/20 transition-colors">
                {f.icon}
              </div>

              {/* Tag */}
              <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-brand-400 mb-2">
                {f.tag}
              </span>

              <h3 className="text-white font-semibold text-lg mb-2">
                {f.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
