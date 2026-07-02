import { CalculationResult } from '../../types/financing';
import Money from '../common/Money';

interface HpOnlyCardProps {
  modelName: string;
  result: CalculationResult;
}

export default function HpOnlyCard({ modelName, result }: HpOnlyCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
      <div>
        <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Opsi 1</span>
        <h4 className="text-xs font-bold text-slate-700 mt-0.5">HP Saja</h4>
        <p className="text-[9px] text-slate-400 mt-0.5 truncate">{modelName}</p>
      </div>
      <div className="mt-4 pt-2 border-t border-slate-100">
        <span className="text-[9px] text-slate-400 block font-medium">Cicilan / bln:</span>
        <Money amount={result.monthlyInstallment} className="text-sm font-bold text-slate-800" />
      </div>
    </div>
  );
}