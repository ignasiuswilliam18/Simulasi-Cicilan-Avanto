import { CalculationResult } from '../../types/financing';
import Money from '../common/Money';

interface SmartBundleCardProps {
  modelName: string;
  result: CalculationResult;
}

export default function SmartBundleCard({ modelName, result }: SmartBundleCardProps) {
  return (
    <div className="bg-gradient-to-br from-emerald-50/30 to-white border-2 border-emerald-500 rounded-2xl p-4 flex flex-col justify-between shadow-lg shadow-emerald-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-emerald-500 text-[8px] text-white font-black px-2 py-0.5 rounded-bl-xl uppercase tracking-wider">
        Combo
      </div>
      <div>
        <span className="text-[10px] font-extrabold text-emerald-600 uppercase block">Opsi 2</span>
        <h4 className="text-xs font-bold text-emerald-900 mt-0.5">Paket Lengkap</h4>
        <p className="text-[9px] font-medium text-slate-500 mt-0.5 leading-tight truncate">
          {modelName} Combo
        </p>
      </div>
      <div className="mt-4 pt-2 border-t border-emerald-100">
        <span className="text-[9px] text-emerald-700 block font-bold">Cicilan / bln:</span>
        <Money amount={result.monthlyInstallment} className="text-base font-extrabold text-emerald-600" />
      </div>
    </div>
  );
}