import { FinancingResult } from '@/types/financing';
import Money from '@/components/common/money';

interface SmartBundleCardProps {
  modelName: string;
  result: FinancingResult;
}

export default function SmartBundleCard({ modelName, result }: SmartBundleCardProps) {
  return (
    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 border border-emerald-500 rounded-xl p-3 shadow-sm space-y-2 text-white">
      <div className="flex justify-between items-center">
        <span className="text-[9px] font-bold uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded text-emerald-50">Opsi 2: Paket Combo</span>
        <span className="text-[9px] font-bold bg-amber-400 text-amber-950 px-1.5 py-0.5 rounded shadow-sm">REKOMENDASI</span>
      </div>
      <div className="font-bold text-xs truncate">{modelName ? `${modelName} + Care + IoT` : 'Belum Pilih Unit'}</div>
      <div className="flex justify-between items-baseline pt-1 border-t border-white/10">
        <span className="text-[10px] text-emerald-100">Angsuran:</span>
        <span className="font-black text-sm">
          <Money amount={result.monthlyInstallment} /> <span className="text-[9px] font-normal text-emerald-200">/bln</span>
        </span>
      </div>
    </div>
  );
}