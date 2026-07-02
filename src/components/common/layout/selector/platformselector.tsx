import { PlatformType } from '../../../../../types/financing';
import SectionTitle from '../../../../components/common/sectiontittle';

interface PlatformSelectorProps {
  value: PlatformType;
  onChange: (platform: PlatformType) => void;
}

export default function PlatformSelector({ value, onChange }: PlatformSelectorProps) {
  return (
    <div>
      <SectionTitle>1. Pilih Platform Pembiayaan</SectionTitle>
      <div className="grid grid-cols-2 gap-2">
        {(['Kredivo', 'YesssCredit'] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={`py-2.5 text-xs font-bold rounded-xl border transition-all duration-200 ${
              value === p
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-100'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Avanto by {p}
          </button>
        ))}
      </div>
    </div>
  );
}