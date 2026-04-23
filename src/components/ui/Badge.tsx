interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  className?: string;
}

const variantStyles = {
  default:
    "border-brand-500/30 bg-brand-500/10 text-brand-300",
  success:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  warning:
    "border-amber-500/30 bg-amber-500/10 text-amber-300",
  danger:
    "border-red-500/30 bg-red-500/10 text-red-300",
  info:
    "border-accent-500/30 bg-accent-500/10 text-accent-300",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
