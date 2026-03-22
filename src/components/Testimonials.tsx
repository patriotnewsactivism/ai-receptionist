const testimonials = [
  {
    quote:
      "I was skeptical at first — no way an AI sounds that real. After the first week, three patients asked if our new receptionist was 'really nice.' It's an AI. I cried a little.",
    name: "Dr. Priya Nair",
    title: "Family Practice, Houston TX",
    avatar: "PN",
    stars: 5,
  },
  {
    quote:
      "We went from missing 30% of inbound calls after hours to 0% missed. Callix booked 14 qualified consultations in the first month alone. ROI was obvious in week one.",
    name: "Marcus Levine",
    title: "Personal Injury Attorney, Miami FL",
    avatar: "ML",
    stars: 5,
  },
  {
    quote:
      "Our front desk staff now focuses on in-office patients instead of being glued to the phone. Callix handles everything else. It's like cloning your best receptionist.",
    name: "Jenna Park",
    title: "Dental Practice Owner, Austin TX",
    avatar: "JP",
    stars: 5,
  },
  {
    quote:
      "The intake quality is unreal. Callix collects more information than our human agents used to — politely, consistently, every single time. Our close rate went up 22%.",
    name: "Chris Okafor",
    title: "Real Estate Brokerage, Atlanta GA",
    avatar: "CO",
    stars: 5,
  },
  {
    quote:
      "For $199/month, we replaced a $4,200/month answering service. The quality is ten times better and I have full transcripts of every call. Total no-brainer.",
    name: "Rachel Torres",
    title: "Med Spa Director, Los Angeles CA",
    avatar: "RT",
    stars: 5,
  },
  {
    quote:
      "The CRM integration is seamless. Every call creates a lead record with notes, sentiment, and a summary. My sales team comes in Monday morning with a full pipeline.",
    name: "Daniel Kim",
    title: "B2B SaaS Founder, San Francisco CA",
    avatar: "DK",
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-900/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-xs font-medium mb-4">
            Customer Stories
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Businesses that never{" "}
            <span className="gradient-text">miss a call</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Over 2,400 businesses have replaced their answering services and
            reduced missed calls to zero.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="break-inside-avoid bg-[#0d0d1a] border border-white/5 rounded-2xl p-6 hover:border-brand-500/20 transition-colors"
            >
              <Stars count={t.stars} />
              <blockquote className="mt-3 text-slate-300 text-sm leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-600 to-accent-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
