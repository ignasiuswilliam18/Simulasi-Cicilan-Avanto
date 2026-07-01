import { useState } from 'react';
// Import data utama
import { 
  type ProductItem, 
  HP_PRODUCTS, 
  OPPO_CARE_PRODUCTS, 
  IOT_PRODUCTS 
} from './data';

export default function App() {
  // ================= STATE SIMULATOR =================
  const [platform, setPlatform] = useState<'Kredivo' | 'YesssCredit'>('Kredivo');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedOppoCare, setSelectedOppoCare] = useState(0); // Index array
  const [selectedIot, setSelectedIot] = useState(0); // Index array
  const [tenor, setTenor] = useState<number>(3); // Default tenor 3 Bulan

  // Mengambil item yang sedang dipilih oleh promotor
  const currentHp = HP_PRODUCTS?.find((p: ProductItem) => p.model === selectedModel);
  const currentOppoCare = OPPO_CARE_PRODUCTS?.[selectedOppoCare];
  const currentIot = IOT_PRODUCTS?.[selectedIot];

  // PERBAIKAN FINAL: Kedua platform (Kredivo & YesssCredit) sekarang menggunakan bunga flat 3.75% (0.0375)
  const monthlyRate = 0.0375;

  // ================= PERHITUNGAN 1: HP SAJA =================
  const hpPrice = currentHp && currentHp.price > 0 ? currentHp.price : 0;
  
  // Logika Kredivo (Admin 2% ikut dibungakan) vs YesssCredit (Admin 60rb flat tidak dibungakan)
  const hpAdminTotal = platform === 'Kredivo' ? Math.round(hpPrice * 0.02) : 60000;
  const hpPrincipalWithAdmin = platform === 'Kredivo' ? (hpPrice + hpAdminTotal) : hpPrice;
  
  const hpInterestTotal = Math.round(hpPrincipalWithAdmin * monthlyRate * tenor);
  const hpTotalLoan = hpPrincipalWithAdmin + hpInterestTotal + (platform === 'YesssCredit' ? hpAdminTotal : 0);
  const hpOnlyMonthlyInstallment = hpPrice > 0 ? Math.round(hpTotalLoan / tenor) : 0;

  // ================= PERHITUNGAN 2: PAKET LENGKAP =================
  const oppoCarePrice = currentOppoCare && currentOppoCare.price > 0 ? currentOppoCare.price : 0;
  const iotPrice = currentIot && currentIot.price > 0 ? currentIot.price : 0;
  const totalBundlePrice = hpPrice + oppoCarePrice + iotPrice;

  const bundleAdminTotal = platform === 'Kredivo' ? Math.round(totalBundlePrice * 0.02) : 60000;
  const bundlePrincipalWithAdmin = platform === 'Kredivo' ? (totalBundlePrice + bundleAdminTotal) : totalBundlePrice;

  const bundleInterestTotal = Math.round(bundlePrincipalWithAdmin * monthlyRate * tenor);
  const bundleTotalLoan = bundlePrincipalWithAdmin + bundleInterestTotal + (platform === 'YesssCredit' ? bundleAdminTotal : 0);
  const bundleMonthlyInstallment = totalBundlePrice > 0 ? Math.round(bundleTotalLoan / tenor) : 0;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-6 w-full max-w-4xl transition-all">
        
        {/* TOP BRANDING HEADER */}
        <div className="text-center mb-8 border-b border-slate-100 pb-4">
          <h1 className="text-3xl font-black text-emerald-600 tracking-tighter">AVANTO</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
            Promotor Smart Bundle Simulator
          </p>
        </div>

        {/* INTERACTIVE TWO-COLUMN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* KOLOM KIRI: INPUT PANEL */}
          <div className="space-y-5">
            
            {/* 1. SELEKSI PLATFORM FINANCING */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                1. Pilih Platform Pembiayaan
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Kredivo', 'YesssCredit'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlatform(p)}
                    className={`py-2.5 text-xs font-bold rounded-xl border transition-all duration-200 ${
                      platform === p
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-100'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Avanto by {p}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. SELECT SMARTPHONE */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                2. Pilih Tipe HP OPPO
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 font-semibold cursor-pointer"
              >
                {HP_PRODUCTS?.map((product: ProductItem, index: number) => (
                  <option key={index} value={product.model}>
                    {product.model} {product.price > 0 ? ` - Rp ${product.price.toLocaleString('id-ID')}` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. SELECT PROTEKSI OPPO CARE */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                3. Tambah Proteksi OPPO Care
              </label>
              <select
                value={selectedOppoCare}
                onChange={(e) => setSelectedOppoCare(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-3 text-sm outline-none focus:border-emerald-500 font-semibold cursor-pointer"
              >
                {OPPO_CARE_PRODUCTS?.map((item: ProductItem, idx: number) => (
                  <option key={idx} value={idx}>
                    {item.model} {item.price > 0 ? ` (+Rp ${item.price.toLocaleString('id-ID')})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. SELECT GADGET IOT */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                4. Tambah Produk IoT
              </label>
              <select
                value={selectedIot}
                onChange={(e) => setSelectedIot(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-3 text-sm outline-none focus:border-emerald-500 font-semibold cursor-pointer"
              >
                {IOT_PRODUCTS?.map((item: ProductItem, idx: number) => (
                  <option key={idx} value={idx}>
                    {item.model} {item.price > 0 ? ` (+Rp ${item.price.toLocaleString('id-ID')})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* 5. SELEKSI MATRIKS TENOR */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                5. Pilih Masa Tenor
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[3, 6, 9, 12].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTenor(m)}
                    className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                      tenor === m
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {m} Bln
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* KOLOM KANAN: LIVE COMPARISON REPORT DISPLAY */}
          <div className="flex flex-col justify-between bg-slate-50/50 rounded-2xl p-5 border border-slate-100">
            
            {currentHp && currentHp.price > 0 ? (
              <div className="space-y-4">
                
                <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl inline-block">
                  ⚡ Skema Pembiayaan: Avanto via {platform} ({tenor} Bulan)
                </div>

                {/* CARDS SIDE BY SIDE */}
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Paket HP Saja */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                    <div>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Opsi 1</span>
                      <h4 className="text-xs font-bold text-slate-700 mt-0.5">HP Saja</h4>
                      <p className="text-[9px] text-slate-400 mt-0.5 truncate">{currentHp.model}</p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-slate-100">
                      <span className="text-[9px] text-slate-400 block font-medium">Cicilan / bln:</span>
                      <span className="text-sm font-bold text-slate-800">
                        Rp {hpOnlyMonthlyInstallment.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  {/* Paket Lengkap */}
                  <div className="bg-gradient-to-br from-emerald-50/30 to-white border-2 border-emerald-500 rounded-2xl p-4 flex flex-col justify-between shadow-lg shadow-emerald-50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-emerald-500 text-[8px] text-white font-black px-2 py-0.5 rounded-bl-xl uppercase tracking-wider">
                      Combo
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold text-emerald-600 uppercase block">Opsi 2</span>
                      <h4 className="text-xs font-bold text-emerald-900 mt-0.5">Paket Lengkap</h4>
                      <p className="text-[9px] font-medium text-slate-500 mt-0.5 leading-tight truncate">
                        {currentHp.model} Combo
                      </p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-emerald-100">
                      <span className="text-[9px] text-emerald-700 block font-bold">Cicilan / bln:</span>
                      <span className="text-base font-extrabold text-emerald-600">
                        Rp {bundleMonthlyInstallment.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                </div>

                {/* DETIL TRANSPARANSI BIAYA (BUNGA & ADMIN) */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 text-[11px] space-y-3 shadow-sm">
                  
                  {/* Bagian HP Saja */}
                  <div>
                    <h5 className="font-bold text-slate-700 border-b border-slate-100 pb-1 mb-1.5">Rincian Opsi 1 (HP Saja):</h5>
                    <div className="flex justify-between text-slate-500">
                      <span>Harga Unit HP:</span>
                      <span className="font-medium text-slate-700">Rp {hpPrice.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Biaya Admin ({platform === 'Kredivo' ? '2%' : 'Flat'}):</span>
                      <span className="font-medium text-slate-700">
                        Rp {hpAdminTotal.toLocaleString('id-ID')} <span className="text-[10px] text-slate-400">(Rp {Math.round(hpAdminTotal/tenor).toLocaleString('id-ID')}/bln)</span>
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Total Bunga ({(monthlyRate * 100).toFixed(2)}%/bln):</span>
                      <span className="font-medium text-slate-700">
                        Rp {hpInterestTotal.toLocaleString('id-ID')} <span className="text-[10px] text-slate-400">(Rp {Math.round(hpInterestTotal/tenor).toLocaleString('id-ID')}/bln)</span>
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-700 font-bold bg-slate-50 p-1 rounded mt-1">
                      <span>Total Pengembalian:</span>
                      <span>Rp {hpTotalLoan.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  {/* Bagian Paket Lengkap */}
                  <div className="pt-2 border-t border-dashed border-slate-200">
                    <h5 className="font-bold text-emerald-800 border-b border-emerald-50 pb-1 mb-1.5">Rincian Opsi 2 (Paket Lengkap):</h5>
                    <div className="flex justify-between text-slate-500">
                      <span>Total Harga Barang:</span>
                      <span className="font-medium text-slate-700">Rp {totalBundlePrice.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Biaya Admin ({platform === 'Kredivo' ? '2%' : 'Flat'}):</span>
                      <span className="font-medium text-slate-700">
                        Rp {bundleAdminTotal.toLocaleString('id-ID')} <span className="text-[10px] text-slate-400">(Rp {Math.round(bundleAdminTotal/tenor).toLocaleString('id-ID')}/bln)</span>
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Total Bunga ({(monthlyRate * 100).toFixed(2)}%/bln):</span>
                      <span className="font-medium text-slate-700">
                        Rp {bundleInterestTotal.toLocaleString('id-ID')} <span className="text-[10px] text-slate-400">(Rp {Math.round(bundleInterestTotal/tenor).toLocaleString('id-ID')}/bln)</span>
                      </span>
                    </div>
                    <div className="flex justify-between text-emerald-900 font-bold bg-emerald-50/50 p-1 rounded mt-1">
                      <span>Total Pengembalian:</span>
                      <span>Rp {bundleTotalLoan.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  {/* Highlight Selisih */}
                  <div className="pt-2.5 border-t-2 border-slate-100 flex justify-between items-center text-slate-700 font-bold text-xs">
                    <span>Selisih Angsuran Paket:</span>
                    <span className="text-emerald-600 font-black">
                      + Rp {(bundleMonthlyInstallment - hpOnlyMonthlyInstallment).toLocaleString('id-ID')} / bln
                    </span>
                  </div>

                </div>

                <div className="text-center text-[10px] text-slate-400 italic">
                  *Rumus hitung disamakan 100% dengan skema hitungan berkas master Excel finansial.
                </div>

              </div>
            ) : (
              <div className="h-full min-h-[260px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-6 text-center bg-white">
                <span className="text-3xl mb-2">📱</span>
                <p className="text-xs font-semibold text-slate-400 italic max-w-[220px]">
                  Silakan tentukan model smartphone di panel kiri untuk membuka lembar rincian simulasi lengkap.
                </p>
              </div>
            )}

            {/* LIVE FOOTER STATUS */}
            <div className="pt-3 border-t border-slate-200/60 flex justify-between items-center text-[10px] text-slate-400">
              <span>Engine Status: <strong className="text-emerald-600">Dual Platform 3.75% Match</strong></span>
              <span className="font-bold text-slate-500">v3.5 - Final</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}