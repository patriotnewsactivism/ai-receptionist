const KB_ENTRIES = [
  {
    type: "FAQ",
    q: "What are your office hours?",
    a: "We're open Monday through Friday, 8 AM to 6 PM, and Saturday 9 AM to 2 PM.",
    color: "text-brand-400 bg-brand-500/10 border-brand-500/20",
  },
  {
    type: "Service",
    q: "Do you accept Blue Cross insurance?",
    a: "Yes, we're in-network with Blue Cross, Aetna, and United Healthcare. Call us to verify your specific plan.",
    color: "text-accent-400 bg-accent-500/10 border-accent-500/20",
  },
  {
    type: "Policy",
    q: "What is your cancellation policy?",
    a: "We ask for at least 24 hours notice to cancel or reschedule. Same-day cancellations may incur a $50 fee.",
    color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  },
  {
    type: "Pricing",
    q: "How much does an initial consultation cost?",
    a: "Initial consultations are $150 and last approximately 45 minutes. We also offer a free 15-minute phone consult.",
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
];

const SOURCES = [
  { icon: "📄", label: "Upload PDFs / Word docs" },
  { icon: "🌐", label: "Paste your website URL" },
  { icon: "✍️", label: "Write custom Q&A pairs" },
  { icon: "📋", label: "Import from Google Docs" },
  { icon: "🔗", label: "Sync from your CMS" },
  { icon: "⚡", label: "Updates live instantly" },
];

export default function KnowledgeBase() {
  return (
    <section id="knowledge-base" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      {/* background glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left: explanation */}
          <div className="flex-1">
            <div className="inline-block px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium mb-5">
              Knowledge Base
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              Your agent only says{" "}
              <span className="gradient-text">what you&apos;ve approved</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              Unlike generic AI that hallucinates answers, Callix agents are
              grounded entirely in your knowledge base. Every response is pulled
              from content you&apos;ve reviewed and approved — so your agent is always
              accurate, always on-brand, and never goes off-script.
            </p>
            <p className="text-slate-400 text-base leading-relaxed mb-8">
              Add your FAQs, services, pricing, policies, and anything else a
              caller might ask. Update it at any time — changes go live instantly
              with no retraining required.
            </p>

            {/* Source types */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SOURCES.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/3 border border-white/5 text-slate-300 text-sm"
                >
                  <span className="text-base">{s.icon}</span>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: mock KB UI */}
          <div className="flex-1 w-full max-w-lg">
            <div className="bg-[#0d0d1a] border border-white/8 rounded-2xl overflow-hidden shadow-2xl">
              {/* Window chrome */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-slate-500 text-xs ml-2">Knowledge Base Editor</span>
                </div>
                <div className="flex items-center gap-1.5 bg-brand-500/15 border border-brand-500/25 rounded-lg px-2.5 py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-brand-300 text-[10px] font-medium">4 entries · Live</span>
                </div>
              </div>

              {/* Search / add bar */}
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
                <div className="flex-1 flex items-center gap-2 bg-white/4 border border-white/8 rounded-lg px-3 py-2">
                  <svg className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-slate-600 text-xs">Search your knowledge base...</span>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-brand-600 to-brand-500 text-white text-xs font-semibold whitespace-nowrap">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Entry
                </button>
              </div>

              {/* KB entries */}
              <div className="divide-y divide-white/4">
                {KB_ENTRIES.map((entry, i) => (
                  <div key={i} className="px-4 py-4 hover:bg-white/2 transition-colors">
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${entry.color}`}>
                        {entry.type}
                      </span>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100">
                        <button className="text-slate-600 hover:text-slate-400 text-[10px]">Edit</button>
                      </div>
                    </div>
                    <p className="text-slate-200 text-xs font-medium mb-1">{entry.q}</p>
                    <p className="text-slate-500 text-xs leading-relaxed">{entry.a}</p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-white/5 bg-white/1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-slate-600 text-[10px]">Agent answers update instantly — no retraining needed</span>
                </div>
              </div>
            </div>

            {/* Accuracy callout */}
            <div className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/8 border border-emerald-500/20">
              <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-emerald-200 text-sm">
                <span className="font-semibold">Zero hallucinations.</span> If the answer isn&apos;t in your knowledge base, the agent says it doesn&apos;t have that information and offers to transfer the call.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
