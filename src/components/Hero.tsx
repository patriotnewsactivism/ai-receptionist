"use client";

import { useState, useEffect } from "react";

const WAVE_BARS = 32;
// Pre-computed heights to avoid Math.random() during render
const BAR_HEIGHTS = [55, 35, 70, 45, 80, 30, 65, 50, 75, 40, 60, 35, 70, 55, 45, 80, 30, 65, 50, 75, 40, 60, 70, 35, 55, 80, 45, 65, 30, 75, 50, 60];

function WaveVisualizer({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-[3px] h-10">
      {Array.from({ length: WAVE_BARS }).map((_, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-full transition-all ${
            active ? "bg-brand-400" : "bg-slate-700"
          }`}
          style={{
            height: active ? `${BAR_HEIGHTS[i]}%` : "20%",
            animation: active
              ? `wave ${0.8 + (i % 5) * 0.15}s ease-in-out ${
                  (i % 7) * 0.08
                }s infinite`
              : "none",
          }}
        />
      ))}
    </div>
  );
}

const DEMO_MESSAGES = [
  { role: "caller", text: "Hi, I'd like to schedule an appointment for next week." },
  {
    role: "agent",
    text: "Of course! I'd be happy to help you schedule an appointment. What day works best for you?",
  },
  { role: "caller", text: "How about Tuesday around 2pm?" },
  {
    role: "agent",
    text: "Tuesday at 2 PM looks great. Can I get your name and a brief reason for your visit?",
  },
  { role: "caller", text: "Sarah Johnson — it's a follow-up consultation." },
  {
    role: "agent",
    text: "Perfect, Sarah! You're confirmed for Tuesday at 2 PM. You'll receive a confirmation text shortly.",
  },
];

export default function Hero() {
  const [demoActive, setDemoActive] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);

  useEffect(() => {
    if (!demoActive) {
      setVisibleMessages(0);
      return;
    }
    let idx = 0;
    const show = () => {
      if (idx >= DEMO_MESSAGES.length) return;
      const msg = DEMO_MESSAGES[idx];
      setIsAgentSpeaking(msg.role === "agent");
      setVisibleMessages((v) => v + 1);
      idx++;
      if (idx < DEMO_MESSAGES.length) {
        setTimeout(show, 1800);
      } else {
        setTimeout(() => setIsAgentSpeaking(false), 1000);
      }
    };
    setTimeout(show, 400);
  }, [demoActive]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg">
      {/* Background glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-accent-500/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: copy */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              #1 Rated AI Voice Receptionist Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
              Every call answered.{" "}
              <span className="gradient-text">Every lead captured.</span>
              <br />
              <span className="text-slate-300">Around the clock.</span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mb-8 leading-relaxed">
              Deploy ultra-realistic AI voice agents that handle inbound calls,
              answer FAQs, qualify leads, and complete intake forms — all for
              under{" "}
              <span className="text-white font-semibold">$0.09 per minute</span>
              . Callers can&apos;t tell the difference.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10">
              {[
                { value: "< $0.09", label: "per minute" },
                { value: "99.2%", label: "caller satisfaction" },
                { value: "<250ms", label: "response latency" },
                { value: "24/7", label: "always available" },
              ].map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <div className="text-2xl font-bold gradient-text">
                    {s.value}
                  </div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="#demo"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold text-sm shadow-lg shadow-brand-900/40 hover:opacity-90 transition-all hover:scale-[1.02]"
              >
                Start free trial — no card needed
              </a>
              <a
                href="#how-it-works"
                className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-all"
              >
                See how it works
              </a>
            </div>

            <p className="text-slate-600 text-xs mt-4">
              Free 14-day trial · Setup in under 5 minutes · Cancel anytime
            </p>
          </div>

          {/* Right: interactive demo card */}
          <div id="demo" className="flex-1 w-full max-w-md">
            <div className="gradient-border rounded-2xl bg-[#0d0d1a] p-6 glow-card">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold">
                      C
                    </div>
                    {isAgentSpeaking && (
                      <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#0d0d1a]" />
                    )}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">
                      Callix Agent — &quot;Aria&quot;
                    </div>
                    <div className="text-green-400 text-xs">
                      {demoActive ? "Live call in progress..." : "Ready to answer"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-slate-500 text-xs">Online</span>
                </div>
              </div>

              {/* Wave visualizer */}
              <div className="bg-[#080810] rounded-xl px-4 py-3 mb-4">
                <WaveVisualizer active={isAgentSpeaking} />
              </div>

              {/* Transcript */}
              <div className="space-y-3 mb-4 min-h-[220px]">
                {DEMO_MESSAGES.slice(0, visibleMessages).map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-2 ${
                      msg.role === "agent" ? "" : "flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold ${
                        msg.role === "agent"
                          ? "bg-gradient-to-br from-brand-500 to-accent-500 text-white"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {msg.role === "agent" ? "AI" : "C"}
                    </div>
                    <div
                      className={`text-xs rounded-xl px-3 py-2 max-w-[78%] leading-relaxed ${
                        msg.role === "agent"
                          ? "bg-brand-900/40 text-slate-200 border border-brand-800/40"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {!demoActive && (
                  <div className="text-center text-slate-600 text-xs pt-8">
                    Click &quot;Simulate Call&quot; to see Aria in action
                  </div>
                )}
              </div>

              {/* Controls */}
              <button
                onClick={() => {
                  setDemoActive(false);
                  setTimeout(() => setDemoActive(true), 100);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Simulate a call
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust logos */}
      <div className="relative z-10 w-full border-t border-white/5 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-slate-600 text-xs uppercase tracking-widest mb-6">
            Trusted by 2,400+ businesses
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-40">
            {[
              "Dental Pro",
              "LegalEdge",
              "MedSchedule",
              "RealtyFlow",
              "ClinicHub",
              "FinServe+",
            ].map((name) => (
              <span
                key={name}
                className="text-slate-300 text-sm font-semibold tracking-wide"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
