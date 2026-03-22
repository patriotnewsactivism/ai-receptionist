"use client";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

      {/* Background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-[300px] h-[300px] bg-accent-500/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="gradient-border rounded-3xl bg-[#0d0d1a]/80 backdrop-blur-sm p-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-300 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Agents available 24/7 — right now
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Your next call could be{" "}
            <span className="gradient-text">answered by AI</span>
            <br />
            in under 5 minutes
          </h2>

          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Start a 14-day free trial. No credit card. No developers. No setup
            fees. Just plug in your number and let Callix handle the rest.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              "Free 14-day trial",
              "No credit card",
              "Setup in 4 minutes",
              "Cancel anytime",
              "Plans from $99/mo",
            ].map((pill) => (
              <span
                key={pill}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm"
              >
                {pill}
              </span>
            ))}
          </div>

          {/* Email capture */}
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your work email"
              className="flex-1 px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold text-sm shadow-lg shadow-brand-900/40 hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Get started free
            </button>
          </form>

          <p className="text-slate-600 text-xs">
            By signing up you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  );
}
