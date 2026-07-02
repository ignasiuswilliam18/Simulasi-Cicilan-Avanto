import SectionTitle from '../../../common/sectiontittle';

interface TenorSelectorProps {
  value: number;
  onChange: (tenor: number) => void;
}

export default function TenorSelector({ value, onChange }: TenorSelectorProps) {
  return (
    <div>
      <SectionTitle>5. Pilih Masa Tenor</SectionTitle>
      <div className="grid grid-cols-4 gap-2">
        {[3, 6, 9, 12].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => onChange(m)}
            className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
              value === m
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {m} Bln
          </button>
        ))}
      </div>
    </div>
  );
}