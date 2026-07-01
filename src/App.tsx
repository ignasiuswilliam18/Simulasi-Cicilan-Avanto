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
  const [selectedOppoCare, setSelectedOppoCare] = useState(0); 
  const [selectedIot, setSelectedIot] = useState(0); 
  const [tenor, setTenor] = useState<number>(3); 
  const [copied, setCopied] = useState(false);

  // Mengambil item yang sedang dipilih
  const currentHp = HP_PRODUCTS?.find((p: ProductItem) => p.model === selectedModel);
  const currentOppoCare = OPPO_CARE_PRODUCTS?.[selectedOppoCare];
  const currentIot = IOT_PRODUCTS?.[selectedIot];

  const monthlyRate = 0.0375;

  // ================= PERHITUNGAN 1: HP SAJA =================
  const hpPrice = currentHp && currentHp.price > 0 ? currentHp.price : 0;
  const hpAdminTotal = platform === 'Kredivo' ? Math.round(hpPrice * 0.02) : 60000;
  const hpPrincipalWithAdmin = hpPrice > 0 ? (hpPrice + hpAdminTotal) : 0;
  const hpInterestTotal = Math.round(hpPrincipalWithAdmin * monthlyRate * tenor);
  const hpTotalLoan = hpPrincipalWithAdmin + hpInterestTotal;
  const hpOnlyMonthlyInstallment = hpPrice > 0 ? Math.round(hpTotalLoan / tenor) : 0;

  // ================= PERHITUNGAN 2: PAKET LENGKAP =================
  const oppoCarePrice = currentOppoCare && currentOppoCare.price > 0 ? currentOppoCare.price : 0;
  const iotPrice = currentIot && currentIot.price > 0 ? currentIot.price : 0;
  const totalBundlePrice = hpPrice + oppoCarePrice + iotPrice;

  const bundleAdminTotal = platform === 'Kredivo' ? Math.round(totalBundlePrice * 0.02) : 60000;
  const bundlePrincipalWithAdmin = totalBundlePrice > 0 ? (totalBundlePrice + bundleAdminTotal) : 0;
  const bundleInterestTotal = Math.round(bundlePrincipalWithAdmin * monthlyRate * tenor);
  const bundleTotalLoan = bundlePrincipalWithAdmin + bundleInterestTotal;
  const bundleMonthlyInstallment = totalBundlePrice > 0 ? Math.round(bundleTotalLoan / tenor) : 0;

  // ================= LOGIKA SHARE / COPY STRUK =================
  const handleCopyStruk = (type: 'hpsaja' | 'paketlengkap') => {
    const isBundle = type === 'paketlengkap';
    const modelName = currentHp ? currentHp.model : '';
    const installment = isBundle ? bundleMonthlyInstallment : hpOnlyMonthlyInstallment;
    
    const textStruk = `=====================================
        BROSUR DIGITAL AVANTO       
=====================================
📋 *Rencana Pembiayaan Gadget*

• *Tipe HP:* ${modelName}
• *Opsi:* ${isBundle ? '📦 PAKET LENGKAP (Combo)' : '📱 HP Saja'}
${isBundle ? `• *Proteksi:* ${currentOppoCare?.model}\n• *Bonus IoT:* ${currentIot?.model}` : ''}

-------------------------------------
⚙️ *Skema Angsuran (Avanto by ${platform})*
-------------------------------------
• *Masa Tenor:* ${tenor} Bulan
• *CICILAN BULANAN:* Rp ${installment.toLocaleString('id-ID')} / bln

-------------------------------------
💡 _Yuk, kunjungi OPPO Store terdekat untuk langsung mengajukan limit dan proses instant serah terima unit!_
=====================================`;

    navigator.clipboard.writeText(textStruk).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-6 w-full max-w-5xl transition-all">
        
        {/* TOP BRANDING HEADER */}
        <div className="text-center mb-8 border-b border-slate-100 pb-4">
          <h1 className="text-3xl font-black text-emerald-600 tracking-tighter">AVANTO</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
            Promotor Smart Bundle Simulator
          </p>
        </div>

        {/* INTERACTIVE THREE-COLUMN/TWO-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* KOLOM 1: INPUT PANEL */}
          <div className="space-y-4 lg:col-span-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Panel Parameter</span>
            
            {/* PLATFORM */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">1. Pembiayaan</label>
              <div className="grid grid-cols-2 gap-2">
                {(['Kredivo', 'YesssCredit'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlatform(p)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      platform === p ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-600'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* TIPE HP */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">2. Tipe HP OPPO</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none"
              >
                {HP_PRODUCTS?.map((product: ProductItem, index: number) => (
                  <option key={index} value={product.model}>
                    {product.model} {product.price > 0 ? ` - Rp ${product.price.toLocaleString('id-ID')}` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* OPPO CARE */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">3. Proteksi</label>
              <select
                value={selectedOppoCare}
                onChange={(e) => setSelectedOppoCare(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none"
              >
                {OPPO_CARE_PRODUCTS?.map((item: ProductItem, idx: number) => (
                  <option key={idx} value={idx}>
                    {item.model} {item.price > 0 ? ` (+Rp ${item.price.toLocaleString('id-ID')})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* IOT */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">4. Produk IoT</label>
              <select
                value={selectedIot}
                onChange={(e) => setSelectedIot(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none"
              >
                {IOT_PRODUCTS?.map((item: ProductItem, idx: number) => (
                  <option key={idx} value={idx}>
                    {item.model} {item.price > 0 ? ` (+Rp ${item.price.toLocaleString('id-ID')})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* TENOR */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">5. Masa Tenor</label>
              <div className="grid grid-cols-4 gap-1.5">
                {[3, 6, 9, 12].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTenor(m)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      tenor === m ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    {m}M
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* KOLOM 2: ANALISA PERBANDINGAN */}
          <div className="bg-slate-50/60 rounded-2xl p-4 border border-slate-100 lg:col-span-1 space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Rincian Komparasi</span>
              {currentHp && currentHp.price > 0 ? (
                <div className="space-y-3 text-[11px]">
                  <div className="bg-white border rounded-xl p-3 shadow-sm">
                    <span className="text-[9px] font-bold text-slate-400 block">OPSI 1: HP SAJA</span>
                    <span className="text-sm font-black text-slate-800 block mt-0.5">Rp {hpOnlyMonthlyInstallment.toLocaleString('id-ID')} /bln</span>
                  </div>

                  <div className="bg-emerald-50/50 border-2 border-emerald-500 rounded-xl p-3 shadow-sm">
                    <span className="text-[9px] font-bold text-emerald-600 block">OPSI 2: PAKET LENGKAP COMBO</span>
                    <span className="text-base font-black text-emerald-700 block mt-0.5">Rp {bundleMonthlyInstallment.toLocaleString('id-ID')} /bln</span>
                    <span className="text-[9px] text-emerald-600 font-bold block mt-1">Selisih: +Rp {(bundleMonthlyInstallment - hpOnlyMonthlyInstallment).toLocaleString('id-ID')}/bln</span>
                  </div>

                  <div className="bg-white border rounded-xl p-3 space-y-1 text-slate-500">
                    <div className="flex justify-between"><span>Harga Pokok HP:</span><span className="font-bold text-slate-700">Rp {hpPrice.toLocaleString('id-ID')}</span></div>
                    <div className="flex justify-between"><span>Total Admin:</span><span className="font-bold text-slate-700">Rp {bundleAdminTotal.toLocaleString('id-ID')}</span></div>
                    <div className="flex justify-between"><span>Bunga (3.75%):</span><span className="font-bold text-slate-700">Rp {bundleInterestTotal.toLocaleString('id-ID')}</span></div>
                  </div>
                </div>
              ) : (
                <p className="text-xs italic text-slate-400 text-center pt-8">Silakan pilih tipe smartphone terlebih dahulu.</p>
              )}
            </div>
            <div className="text-[10px] text-slate-400 text-center italic border-t pt-2">Math engine v3.6 verified</div>
          </div>

          {/* KOLOM 3: LIVE PREVIEW "STRUK DIGITAL" */}
          <div className="lg:col-span-1 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Live Preview Struk</span>
              
              {currentHp && currentHp.price > 0 ? (
                /* DESAIN STRUK BELANJA KASIR */
                <div className="bg-amber-50/40 border border-amber-200/60 rounded-2xl p-5 shadow-inner font-mono text-[11px] text-amber-950 space-y-4 relative overflow-hidden bg-white">
                  {/* Decorative Watermark Struk */}
                  <div className="text-center border-b border-dashed border-amber-300 pb-3">
                    <div className="font-black tracking-widest text-sm">AVANTO FINANCING</div>
                    <div className="text-[9px] text-amber-700">OFFICIAL DIGITAL RECEIPT</div>
                  </div>

                  <div className="space-y-1">
                    <div>UNIT  : {currentHp.model}</div>
                    <div>OPSI  : PAKET LENGKAP COMBO</div>
                    <div className="pl-2 text-amber-800/80">• {currentOppoCare?.model}</div>
                    <div className="pl-2 text-amber-800/80">• {currentIot?.model}</div>
                  </div>

                  <div className="border-t border-dashed border-amber-300 pt-3 space-y-1">
                    <div>MITRA : Avanto by {platform}</div>
                    <div>TENOR : {tenor} BULAN</div>
                    <div className="text-xs font-bold bg-amber-100 p-1.5 rounded mt-2 flex justify-between">
                      <span>ANGSURAN:</span>
                      <span>Rp {bundleMonthlyInstallment.toLocaleString('id-ID')}/bln</span>
                    </div>
                  </div>

                  {/* TOMBOL AKSI SHARE DI DALAM STRUK */}
                  <div className="pt-2 grid grid-cols-1 gap-2 font-sans">
                    <button
                      type="button"
                      onClick={() => handleCopyStruk('paketlengkap')}
                      className={`w-full py-2 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                        copied ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      {copied ? '✅ Struk Berhasil Disalin!' : '📋 Salin Struk Paket Lengkap'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopyStruk('hpsaja')}
                      className="w-full py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl font-medium text-xs transition-all text-center"
                    >
                      Salin Struk Opsi HP Saja
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full min-h-[200px] border border-dashed rounded-2xl flex flex-col items-center justify-center text-center p-4 bg-slate-50 text-slate-400 text-xs">
                  Struk otomatis terisi setelah memilih unit.
                </div>
              )}
            </div>

            {/* NOTIFIKASI EDUKATIF PROMOTOR */}
            {currentHp && (
              <p className="text-[10px] text-slate-400 text-center leading-tight font-medium mt-3">
                💡 Promotor tinggal klik <strong>"Salin Struk"</strong>, lalu buka WhatsApp konsumen dan tekan <strong>Paste (Ctrl+V)</strong>.
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}