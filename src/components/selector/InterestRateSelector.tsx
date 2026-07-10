interface InterestRateSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const INTEREST_RATES = [2.7, 2.99, 3.75, 3.99];

export default function InterestRateSelector({
  value,
  onChange,
}: InterestRateSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        Suku Bunga
      </label>

      <div className="grid grid-cols-4 gap-3">
        {INTEREST_RATES.map((rate) => (
          <button
            key={rate}
            type="button"
            onClick={() => onChange(rate)}
            className={`
              rounded-xl
              border
              py-3
              font-semibold
              transition

              ${
                value === rate
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-slate-300 bg-white hover:bg-slate-50"
              }
            `}
          >
            {rate}%
          </button>
        ))}
      </div>
    </div>
  );
}
