interface SectionTitleProps {
  children: React.ReactNode;
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
      {children}
    </label>
  );
}