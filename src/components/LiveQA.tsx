"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// Mock knowledge base — the "business" this demo agent knows about
const KB: Record<string, string> = {
  hours:
    "We're open Monday through Friday from 8 AM to 6 PM, and Saturday from 9 AM to 2 PM. We are closed on Sundays and major holidays.",
  insurance:
    "Yes, we accept most major insurance plans including Blue Cross Blue Shield, Aetna, United Healthcare, and Cigna. I'd recommend calling us directly to verify your specific plan before your visit.",
  appointment:
    "Absolutely! I can help you schedule an appointment. We have openings this week on Tuesday at 10 AM, Wednesday at 2 PM, and Friday at 9 AM. Which works best for you?",
  cancel:
    "Our cancellation policy requires at least 24 hours notice. Same-day cancellations may be subject to a $50 fee. Would you like to reschedule instead?",
  cost:
    "An initial consultation is $150 and lasts about 45 minutes. Follow-up visits are $90. We also offer a free 15-minute phone consultation if you'd like to discuss your situation first.",
  location:
    "We're located at 4820 Riverside Drive, Suite 210. There's free parking in the garage on the right side of the building. We're also two blocks from the Riverside Metro station.",
  waittime:
    "Right now our typical wait time for a new patient appointment is 3 to 5 business days. For urgent matters, we do keep a few same-day slots open each morning — call us before 9 AM to request one.",
  directions:
    "From downtown, take Highway 101 North to the Riverside exit, then turn left on Maple Avenue. We're in the Riverside Medical Plaza on the right. You can't miss the blue awning.",
  newpatient:
    "Welcome! To get you set up as a new patient, I'll need your full name, date of birth, insurance information, and a brief reason for your visit. I can collect that right now if you're ready.",
  referral:
    "You don't need a referral to see us. We accept both direct patients and referrals from other providers. If you have referral paperwork, just bring it with you or fax it to us beforehand.",
};

const SUGGESTED_QUESTIONS = [
  { label: "What are your hours?", key: "hours" },
  { label: "Do you take my insurance?", key: "insurance" },
  { label: "Can I book an appointment?", key: "appointment" },
  { label: "What does a visit cost?", key: "cost" },
  { label: "Where are you located?", key: "location" },
  { label: "How long is the wait?", key: "waittime" },
  { label: "What's your cancellation policy?", key: "cancel" },
  { label: "Do I need a referral?", key: "referral" },
];

const WAVE_BARS = 28;
const WAVE_H = [55, 35, 70, 45, 80, 30, 65, 50, 75, 40, 60, 35, 70, 55, 45, 80, 30, 65, 50, 75, 40, 60, 70, 35, 55, 80, 45, 65];

type Message = {
  role: "caller" | "agent";
  text: string;
  timestamp: string;
};

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function findAnswer(question: string): string {
  const q = question.toLowerCase();
  if (/hour|open|close|when|schedule|time/i.test(q)) return KB.hours;
  if (/insurance|accept|cover|plan|blue|aetna|united/i.test(q)) return KB.insurance;
  if (/book|appoint|schedul|visit|see/i.test(q)) return KB.appointment;
  if (/cancel|reschedul|miss|policy/i.test(q)) return KB.cancel;
  if (/cost|price|fee|charge|pay|money|how much/i.test(q)) return KB.cost;
  if (/where|location|address|park|find/i.test(q)) return KB.location;
  if (/wait|how long|backlog|available/i.test(q)) return KB.waittime;
  if (/direction|get there|drive|highway|exit/i.test(q)) return KB.directions;
  if (/new patient|first time|sign up|register/i.test(q)) return KB.newpatient;
  if (/referral|refer|need a referral/i.test(q)) return KB.referral;
  return "That's a great question. Let me check on that for you. For anything I'm not able to answer directly, I can transfer you to one of our team members who can help. Would you like me to do that?";
}

export default function LiveQA() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      text: "Thank you for calling Riverside Medical Group! This is Aria. How can I help you today?",
      timestamp: now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [agentTyping, setAgentTyping] = useState(false);
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [callActive, setCallActive] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [supported] = useState(() =>
    typeof window !== "undefined" && !!window.speechSynthesis
  );
  const [voiceEnabled, setVoiceEnabled] = useState(() =>
    typeof window !== "undefined" && !!window.speechSynthesis
  );
  const transcriptRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (callActive) {
      timerRef.current = setInterval(() => setCallDuration((d) => d + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [callActive]);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [messages, agentTyping]);

  const formatDuration = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const speakText = useCallback((text: string) => {
    if (!supported || !voiceEnabled) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.92;
    utter.pitch = 1.08;
    utter.volume = 1;

    const assignVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const fem = voices.find((v) =>
        v.lang.startsWith("en") &&
        /samantha|victoria|karen|moira|ava|allison|susan|zira|hazel|fiona/i.test(v.name)
      ) || voices.find((v) => v.lang.startsWith("en"));
      if (fem) utter.voice = fem;
    };

    if (window.speechSynthesis.getVoices().length > 0) assignVoice();
    else window.speechSynthesis.onvoiceschanged = assignVoice;

    setAgentSpeaking(true);
    utter.onend = () => setAgentSpeaking(false);
    utter.onerror = () => setAgentSpeaking(false);
    window.speechSynthesis.speak(utter);
  }, [supported, voiceEnabled]);

  const handleAsk = useCallback((question: string) => {
    if (!question.trim() || agentTyping || !callActive) return;

    const callerMsg: Message = { role: "caller", text: question.trim(), timestamp: now() };
    setMessages((m) => [...m, callerMsg]);
    setInput("");
    setAgentTyping(true);

    // Simulate realistic processing delay: 200–400ms
    const thinkTime = 200 + Math.random() * 200;
    setTimeout(() => {
      const answer = findAnswer(question);
      const agentMsg: Message = { role: "agent", text: answer, timestamp: now() };
      setAgentTyping(false);
      setMessages((m) => [...m, agentMsg]);
      speakText(answer);
    }, thinkTime);
  }, [agentTyping, callActive, speakText]);

  const handleEndCall = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setAgentSpeaking(false);
    setCallActive(false);
    setMessages((m) => [
      ...m,
      {
        role: "agent",
        text: "Thank you for calling Riverside Medical Group. Have a wonderful day! Goodbye.",
        timestamp: now(),
      },
    ]);
  };

  const handleReset = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setAgentSpeaking(false);
    setCallActive(true);
    setCallDuration(0);
    setInput("");
    setAgentTyping(false);
    setMessages([
      {
        role: "agent",
        text: "Thank you for calling Riverside Medical Group! This is Aria. How can I help you today?",
        timestamp: now(),
      },
    ]);
  };

  return (
    <section id="live-demo" className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-accent-500/30 bg-accent-500/10 text-accent-300 text-xs font-medium mb-4">
            Live Interactive Demo
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ask the agent{" "}
            <span className="gradient-text">anything.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            This is a live simulation of a Callix agent answering from a real
            knowledge base. Click a question or type your own — the agent
            responds and speaks the answer aloud.
          </p>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 items-start">

          {/* Left: suggested questions + controls */}
          <div className="w-full lg:w-72 flex-shrink-0 space-y-4">
            <div className="bg-[#0d0d1a] border border-white/5 rounded-2xl p-5">
              <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
                Suggested questions
              </div>
              <div className="space-y-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q.key}
                    onClick={() => handleAsk(q.label)}
                    disabled={agentTyping || !callActive}
                    className="w-full text-left px-3 py-2.5 rounded-xl bg-white/3 border border-white/5 text-slate-300 text-sm hover:bg-brand-500/10 hover:border-brand-500/25 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Voice toggle */}
            <div className="bg-[#0d0d1a] border border-white/5 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <div className="text-white text-sm font-medium">Voice output</div>
                <div className="text-slate-500 text-xs">{supported ? "Enabled" : "Not supported"}</div>
              </div>
              <button
                onClick={() => {
                  if (voiceEnabled && window.speechSynthesis) window.speechSynthesis.cancel();
                  setVoiceEnabled((v) => !v);
                  setAgentSpeaking(false);
                }}
                disabled={!supported}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  voiceEnabled && supported ? "bg-brand-500" : "bg-white/10"
                } disabled:opacity-30`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${voiceEnabled && supported ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>

            {/* KB info */}
            <div className="bg-[#0d0d1a] border border-white/5 rounded-2xl p-4">
              <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Agent knowledge base
              </div>
              <div className="space-y-1.5">
                {["Hours & availability", "Insurance accepted", "Appointment booking", "Pricing & fees", "Location & directions", "Cancellation policy", "New patient intake", "Referral requirements"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: call interface */}
          <div className="flex-1 w-full">
            <div className="bg-[#0d0d1a] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">

              {/* Call header */}
              <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-bold">
                      A
                    </div>
                    {(callActive || agentSpeaking) && (
                      <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#0d0d1a]" />
                    )}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold flex items-center gap-2">
                      Aria — Callix Agent
                    </div>
                    <div className={`text-xs flex items-center gap-1.5 ${callActive ? "text-green-400" : "text-slate-500"}`}>
                      {callActive ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          {agentSpeaking ? "Speaking..." : agentTyping ? "Thinking..." : `Live · ${formatDuration(callDuration)}`}
                        </>
                      ) : (
                        "Call ended"
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {callActive ? (
                    <button
                      onClick={handleEndCall}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-medium hover:bg-red-500/25 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                      </svg>
                      End call
                    </button>
                  ) : (
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs font-medium hover:bg-brand-500/25 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      New call
                    </button>
                  )}
                </div>
              </div>

              {/* Waveform */}
              <div className="px-5 py-3 border-b border-white/5 bg-[#080810]">
                <div className="flex items-center gap-[2.5px] h-8">
                  {Array.from({ length: WAVE_BARS }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-[3px] rounded-full transition-colors ${
                        agentSpeaking ? "bg-brand-400" : "bg-slate-800"
                      }`}
                      style={{
                        height: agentSpeaking ? `${WAVE_H[i % WAVE_H.length]}%` : "20%",
                        animation: agentSpeaking
                          ? `wave ${0.7 + (i % 5) * 0.12}s ease-in-out ${(i % 7) * 0.07}s infinite`
                          : "none",
                      }}
                    />
                  ))}
                  <span className="ml-3 text-slate-600 text-[10px] font-mono">
                    {agentSpeaking ? "SPEAKING" : agentTyping ? "PROCESSING..." : callActive ? "LISTENING" : "IDLE"}
                  </span>
                </div>
              </div>

              {/* Transcript */}
              <div
                ref={transcriptRef}
                className="px-5 py-4 space-y-4 overflow-y-auto"
                style={{ minHeight: 280, maxHeight: 360 }}
              >
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.role === "caller" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-bold ${
                      msg.role === "agent"
                        ? "bg-gradient-to-br from-brand-500 to-accent-500 text-white"
                        : "bg-slate-700 text-slate-300"
                    }`}>
                      {msg.role === "agent" ? "AI" : "You"}
                    </div>
                    <div className="max-w-[75%]">
                      <div className={`text-xs rounded-2xl px-4 py-2.5 leading-relaxed ${
                        msg.role === "agent"
                          ? "bg-brand-900/35 border border-brand-800/30 text-slate-200 rounded-tl-sm"
                          : "bg-slate-800 text-slate-300 rounded-tr-sm"
                      }`}>
                        {msg.text}
                      </div>
                      <div className={`text-[10px] text-slate-600 mt-1 ${msg.role === "caller" ? "text-right" : ""}`}>
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                ))}

                {agentTyping && (
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">
                      AI
                    </div>
                    <div className="bg-brand-900/35 border border-brand-800/30 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="px-5 py-4 border-t border-white/5">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAsk(input);
                  }}
                  className="flex gap-3"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={agentTyping || !callActive}
                    placeholder={callActive ? "Type any question a caller might ask..." : "Call ended — click 'New call' to start over"}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/4 border border-white/8 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-brand-500/40 focus:ring-1 focus:ring-brand-500/20 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || agentTyping || !callActive}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>
                <p className="text-slate-700 text-[10px] mt-2 text-center">
                  Agent answers are drawn from its knowledge base · Voice plays automatically if enabled
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
