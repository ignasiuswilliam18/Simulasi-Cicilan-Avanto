import { FinancingResult } from '@/types/financing';

interface HpOnlyCardProps {
  modelName: string;
  result: FinancingResult;
}

export default function HpOnlyCard({ modelName, result }: HpOnlyCardProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm space-y-2">
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Opsi 1: Ponsel Saja</div>
      <div className="font-bold text-slate-800 text-xs truncate">{modelName || 'Belum Pilih Unit'}</div>
      <div className="flex justify-between items-baseline pt-1 border-t border-slate-50">
        <span className="text-[10px] text-slate-500">Angsuran:</span>
        <span className="font-extrabold text-slate-900 text-sm">
          Rp {result.monthlyInstallment.toLocaleString('id-ID')} <span className="text-[9px] font-normal text-slate-400">/bln</span>
        </span>
      </div>
    </div>
  );
}