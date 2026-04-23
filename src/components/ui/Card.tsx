interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = false,
  glow = false,
}: CardProps) {
  return (
    <div
      className={`bg-[#0d0d1a] border border-white/5 rounded-2xl ${
        hover ? "hover:border-brand-500/25 transition-all duration-300" : ""
      } ${glow ? "glow-card" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
