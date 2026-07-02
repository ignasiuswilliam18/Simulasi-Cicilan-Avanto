import { PlatformType } from '@/types/financing';
import SectionTitle from '@/components/common/sectiontittle';

interface PlatformSelectorProps {
  value: PlatformType;
  onChange: (value: PlatformType) => void;
}

export default function PlatformSelector({ value, onChange }: PlatformSelectorProps) {
  const platforms: PlatformType[] = ['Kredivo', 'YesssCredit'];

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
      <SectionTitle>1. Pilih Mitra Pembiayaan</SectionTitle>
      <div className="grid grid-cols-2 gap-2">
        {platforms.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={`py-2.5 px-4 rounded-xl font-bold text-xs transition-all border ${
              value === p
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-100'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}