"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const VOICES = [
  {
    id: "aria",
    name: "Aria",
    role: "Medical Receptionist",
    description: "Warm, professional, reassuring. Perfect for healthcare.",
    color: "from-brand-500 to-brand-400",
    glow: "shadow-brand-900/50",
    border: "border-brand-500/40",
    accent: "text-brand-400",
    bg: "bg-brand-500/10",
    sample:
      "Thank you for calling Riverside Medical Group. This is Aria speaking. How can I help you today? I'd be happy to schedule an appointment or answer any questions you have about our services.",
    langHint: { name: "female", rate: 0.92, pitch: 1.08 },
  },
  {
    id: "marcus",
    name: "Marcus",
    role: "Legal Intake Specialist",
    description: "Confident, articulate, trustworthy. Built for law firms.",
    color: "from-accent-500 to-accent-400",
    glow: "shadow-accent-900/50",
    border: "border-accent-500/40",
    accent: "text-accent-400",
    bg: "bg-accent-500/10",
    sample:
      "Good afternoon, you've reached the offices of Bennett and Associates. My name is Marcus. I'm here to help you with your legal matter. Could you please share a bit about what brings you in today so I can get you to the right attorney?",
    langHint: { name: "male", rate: 0.88, pitch: 0.9 },
  },
  {
    id: "sofia",
    name: "Sofia",
    role: "Real Estate Concierge",
    description: "Energetic, friendly, persuasive. Ideal for real estate.",
    color: "from-violet-500 to-brand-400",
    glow: "shadow-violet-900/50",
    border: "border-violet-500/40",
    accent: "text-violet-400",
    bg: "bg-violet-500/10",
    sample:
      "Hi there! Thanks so much for reaching out to Premier Realty. I'm Sofia, your personal property concierge. Are you looking to buy, sell, or just explore what's available in the market right now? I'd love to help you find your perfect home.",
    langHint: { name: "female", rate: 0.97, pitch: 1.12 },
  },
  {
    id: "james",
    name: "James",
    role: "Home Services Dispatcher",
    description: "Calm, efficient, no-nonsense. Great for trades and services.",
    color: "from-emerald-500 to-accent-500",
    glow: "shadow-emerald-900/50",
    border: "border-emerald-500/40",
    accent: "text-emerald-400",
    bg: "bg-emerald-500/10",
    sample:
      "Thanks for calling Apex Home Services. I'm James. We handle plumbing, electrical, and HVAC — and we're available seven days a week. Can I get your address and a quick description of the issue so I can dispatch the right technician for you?",
    langHint: { name: "male", rate: 0.85, pitch: 0.85 },
  },
];

const BAR_COUNT = 40;
const IDLE_HEIGHTS = [20, 22, 18, 25, 20, 19, 23, 20, 22, 18, 21, 20, 24, 19, 22, 20, 18, 23, 20, 22, 25, 19, 21, 20, 22, 18, 24, 20, 19, 23, 20, 22, 18, 21, 25, 20, 22, 19, 23, 20];
const ACTIVE_HEIGHTS = [55, 35, 70, 45, 80, 30, 65, 50, 75, 40, 60, 35, 70, 55, 45, 80, 30, 65, 50, 75, 40, 60, 70, 35, 55, 80, 45, 65, 30, 75, 50, 60, 45, 70, 35, 55, 80, 40, 65, 50];

function WaveBar({ active, height, delay, colorClass }: { active: boolean; height: number; delay: number; colorClass: string }) {
  return (
    <div
      className={`w-[3px] rounded-full transition-colors duration-300 ${active ? colorClass : "bg-slate-700"}`}
      style={{
        height: `${height}%`,
        animation: active ? `wave ${0.7 + (delay % 5) * 0.14}s ease-in-out ${delay * 0.06}s infinite` : "none",
      }}
    />
  );
}

export default function VoicePlayground() {
  const [activeVoice, setActiveVoice] = useState<string | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [supported] = useState(() =>
    typeof window !== "undefined" && !!window.speechSynthesis
  );
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, []);

  const getBestVoice = useCallback((hint: { name: string }) => {
    const voices = window.speechSynthesis.getVoices();
    const enVoices = voices.filter((v) => v.lang.startsWith("en"));
    if (hint.name === "female") {
      return (
        enVoices.find((v) => /samantha|victoria|karen|moira|fiona|tessa|allison|ava|susan|zira|hazel/i.test(v.name)) ||
        enVoices.find((v) => /female|woman|girl/i.test(v.name)) ||
        enVoices[0] ||
        null
      );
    }
    return (
      enVoices.find((v) => /alex|daniel|fred|tom|bruce|ralph|junior|albert|lee|david|mark/i.test(v.name)) ||
      enVoices.find((v) => /male|man/i.test(v.name)) ||
      enVoices[0] ||
      null
    );
  }, []);

  const speak = useCallback((voiceId: string) => {
    if (!supported) return;
    const voice = VOICES.find((v) => v.id === voiceId);
    if (!voice) return;

    // Stop current
    window.speechSynthesis.cancel();
    if (progressRef.current) clearInterval(progressRef.current);

    if (activeVoice === voiceId && speaking) {
      setSpeaking(false);
      setActiveVoice(null);
      setProgress(0);
      return;
    }

    setActiveVoice(voiceId);
    setSpeaking(true);
    setProgress(0);

    const utter = new SpeechSynthesisUtterance(voice.sample);
    utter.rate = voice.langHint.rate;
    utter.pitch = voice.langHint.pitch;
    utter.volume = 1;

    // Try to assign best voice after voices load
    const assignVoice = () => {
      const best = getBestVoice(voice.langHint);
      if (best) utter.voice = best;
    };
    if (window.speechSynthesis.getVoices().length > 0) {
      assignVoice();
    } else {
      window.speechSynthesis.onvoiceschanged = assignVoice;
    }

    const estimatedDuration = (voice.sample.length / 14) * 1000; // rough ms
    const startTime = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / estimatedDuration) * 100, 98));
    }, 80);

    utter.onend = () => {
      if (progressRef.current) clearInterval(progressRef.current);
      setProgress(100);
      setTimeout(() => {
        setSpeaking(false);
        setActiveVoice(null);
        setProgress(0);
      }, 400);
    };

    utter.onerror = () => {
      if (progressRef.current) clearInterval(progressRef.current);
      setSpeaking(false);
      setActiveVoice(null);
      setProgress(0);
    };

    utteranceRef.current = utter;
    window.speechSynthesis.speak(utter);
  }, [activeVoice, speaking, supported, getBestVoice]);

  return (
    <section id="voices" className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-xs font-medium mb-4">
            Voice Personas
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Hear it for yourself.{" "}
            <span className="gradient-text">Right now.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Click any voice below to hear a live sample — rendered in real-time
            by our neural speech engine, in your browser.
          </p>
          {!supported && (
            <p className="mt-3 text-amber-400 text-sm">
              Live audio preview requires a modern browser (Chrome/Edge/Safari).
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VOICES.map((voice) => {
            const isActive = activeVoice === voice.id;
            const isSpeaking = isActive && speaking;
            return (
              <div
                key={voice.id}
                className={`relative bg-[#0d0d1a] rounded-2xl p-6 border transition-all duration-300 ${
                  isActive ? voice.border : "border-white/5 hover:border-white/10"
                }`}
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${voice.color} flex items-center justify-center text-white font-bold text-base shadow-lg ${voice.glow}`}>
                      {voice.name[0]}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{voice.name}</div>
                      <div className={`text-xs ${voice.accent}`}>{voice.role}</div>
                    </div>
                  </div>

                  {/* Play/Stop button */}
                  <button
                    onClick={() => speak(voice.id)}
                    disabled={!supported}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                      isSpeaking
                        ? `${voice.bg} border ${voice.border} ${voice.accent}`
                        : `bg-gradient-to-r ${voice.color} text-white shadow-lg ${voice.glow} hover:opacity-90`
                    } disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    {isSpeaking ? (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                        Stop
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        Play sample
                      </>
                    )}
                  </button>
                </div>

                <p className="text-slate-500 text-sm mb-4">{voice.description}</p>

                {/* Waveform */}
                <div className="bg-[#080810] rounded-xl px-4 py-3 mb-3">
                  <div className="flex items-center gap-[2px] h-10">
                    {Array.from({ length: BAR_COUNT }).map((_, i) => (
                      <WaveBar
                        key={i}
                        active={isSpeaking}
                        height={isSpeaking ? ACTIVE_HEIGHTS[i % ACTIVE_HEIGHTS.length] : IDLE_HEIGHTS[i % IDLE_HEIGHTS.length]}
                        delay={i}
                        colorClass={`bg-gradient-to-t ${voice.color}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Progress bar */}
                {isActive && (
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${voice.color} rounded-full transition-all duration-100`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}

                {/* Sample text preview */}
                <p className="text-slate-600 text-xs leading-relaxed mt-3 italic line-clamp-2">
                  &ldquo;{voice.sample}&rdquo;
                </p>
              </div>
            );
          })}
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          Voice samples rendered live via browser speech synthesis. Production
          agents use our proprietary neural voice engine for even higher
          realism.
        </p>
      </div>
    </section>
  );
}
