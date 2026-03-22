const pillars = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    tag: "Voice Realism",
    title: "Indistinguishable from human",
    description:
      "Callix uses next-generation neural text-to-speech trained on thousands of hours of natural conversation — not robotic TTS. Your agent breathes, pauses, uses filler phrases, and adapts its tone to match the caller's energy. Independent blind tests show callers identify our voice as human over 94% of the time.",
    bullets: [
      "Natural breathing & pacing cues",
      "Emotion-aware tone modulation",
      "Multiple voice personas available",
      "Custom voice cloning on Scale plan",
    ],
    accent: "from-brand-500 to-brand-400",
    glow: "shadow-brand-900/40",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    tag: "Response Latency",
    title: "Conversations that feel instant",
    description:
      "Most AI voice platforms have 1–3 second response delays — callers notice, and it kills the illusion. Our edge-deployed speech pipeline — speech recognition, intent resolution, and voice synthesis — completes end-to-end in under 250 milliseconds. Conversations flow naturally with zero awkward gaps.",
    bullets: [
      "<250ms end-to-end latency",
      "Edge-deployed globally for speed",
      "Interruption & barge-in handling",
      "Real-time silence detection",
    ],
    accent: "from-accent-500 to-accent-400",
    glow: "shadow-accent-900/40",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    tag: "Knowledge Base",
    title: "Knows your business inside out",
    description:
      "Your agent's answers come entirely from your knowledge base — not generic AI guesses. Upload FAQs, paste your website URL, add service descriptions, pricing, policies, and custom Q&A. The agent answers only from what you've approved, so it's always accurate, always on-brand.",
    bullets: [
      "Upload docs, PDFs, or paste text",
      "Scrape your website automatically",
      "Custom Q&A pairs with exact phrasing",
      "Real-time updates — no retraining",
    ],
    accent: "from-violet-500 to-brand-400",
    glow: "shadow-violet-900/40",
  },
];

const secondary = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: "Intelligent Intake",
    description: "Collect patient or lead info, complete intake forms, and sync data to your CRM or EHR in real-time.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Appointment Scheduling",
    description: "Books, reschedules, and confirms appointments via Google Calendar, Calendly, and 30+ integrations.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: "Smart Escalation",
    description: "Handles routine calls autonomously and routes complex calls to your team with a full transcript summary.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Call Analytics",
    description: "Full transcripts, sentiment scores, call outcomes, and conversion metrics across every interaction.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-xs font-medium mb-4">
            Core Technology
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Three things we obsess over.{" "}
            <span className="gradient-text">Nothing else comes close.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Every other AI voice platform falls short on at least one of these.
            Callix was built from day one to lead in all three.
          </p>
        </div>

        {/* 3 Pillar cards — large, feature-rich */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="relative bg-[#0d0d1a] border border-white/5 rounded-2xl p-7 flex flex-col hover:border-brand-500/25 transition-all duration-300 group overflow-hidden"
            >
              {/* Subtle glow in background */}
              <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${p.accent} opacity-5 blur-3xl group-hover:opacity-10 transition-opacity`} />

              {/* Icon */}
              <div className={`w-13 h-13 mb-5 w-12 h-12 rounded-xl bg-gradient-to-br ${p.accent} flex items-center justify-center text-white shadow-lg ${p.glow}`}>
                {p.icon}
              </div>

              <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 bg-gradient-to-r ${p.accent} bg-clip-text text-transparent`}>
                {p.tag}
              </span>

              <h3 className="text-white font-bold text-xl mb-3 leading-snug">
                {p.title}
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                {p.description}
              </p>

              <ul className="space-y-2 border-t border-white/5 pt-5">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-300">
                    <svg className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Secondary features — compact row */}
        <div className="border-t border-white/5 pt-12">
          <p className="text-center text-slate-500 text-sm uppercase tracking-widest mb-8">
            Plus everything you need to run the front desk
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {secondary.map((f, i) => (
              <div key={i} className="bg-[#0d0d1a] border border-white/5 rounded-xl p-5 hover:border-brand-500/20 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 mb-3">
                  {f.icon}
                </div>
                <h4 className="text-white font-semibold text-sm mb-1.5">{f.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
