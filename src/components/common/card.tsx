interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white border border-slate-200 rounded-2xl p-4 shadow-sm ${className}`}>
      {children}
    </div>
  );
}