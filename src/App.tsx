import { useState } from 'react';

// Import Data Utama
import { 
  HP_PRODUCTS, 
  OPPO_CARE_PRODUCTS, 
  IOT_PRODUCTS 
} from './data';

// Import Types & Core Finance Engine
import { PlatformType } from './types/financing';
import { calculateFinancing } from './Engine/financeengine';

// Import Komponen Layout & Common
import MainLayout from './components/layout/MainLayout';
import Header from './components/layout/Header';
import Money from './components/common/Money';

// Import Komponen Selector Input
import PlatformSelector from './components/selector/PlatformSelector';
import ProductSelector from './components/selector/ProductSelector';
import OppoCareSelector from './components/selector/OppoCareSelector';
import IotSelector from './components/selector/IotSelector';
import TenorSelector from './components/selector/TenorSelector';

// Import Komponen Tampilan Hasil
import HpOnlyCard from './components/result/HpOnlyCard';
import SmartBundleCard from './components/result/SmartBundleCard';

export default function App() {
  // ================= STATE SIMULATOR =================
  const [platform, setPlatform] = useState<PlatformType>('Kredivo');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedOppoCare, setSelectedOppoCare] = useState(0); 
  const [selectedIot, setSelectedIot] = useState(0); 
  const [tenor, setTenor] = useState<number>(3); 
  const [copied, setCopied] = useState(false);

  // Mengambil item produk berdasarkan pilihan state
  const currentHp = HP_PRODUCTS?.find((p) => p.model === selectedModel);
  const currentOppoCare = OPPO_CARE_PRODUCTS?.[selectedOppoCare];
  const currentIot = IOT_PRODUCTS?.[selectedIot];

  // ================= PROSES EKSEKUSI ENGINE KALKULASI =================
  const hpPrice = currentHp && currentHp.price > 0 ? currentHp.price : 0;
  const oppoCarePrice = currentOppoCare && currentOppoCare.price > 0 ? currentOppoCare.price : 0;
  const iotPrice = currentIot && currentIot.price > 0 ? currentIot.price : 0;
  
  const totalBundlePrice = hpPrice + oppoCarePrice + iotPrice;

  // Hitung Opsi 1 (HP Saja) & Opsi 2 (Paket Lengkap) via Modular Finance Engine
  const hpResult = calculateFinancing(hpPrice, platform, tenor);
  const bundleResult = calculateFinancing(totalBundlePrice, platform, tenor);

  // ================= LOGIKA SHARE / COPY STRUK =================
  const handleCopyStruk = (type: 'hpsaja' | 'paketlengkap') => {
    const isBundle = type === 'paketlengkap';
    const modelName = currentHp ? currentHp.model : '';
    const installment = isBundle ? bundleResult.monthlyInstallment : hpResult.monthlyInstallment;
    
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
    <MainLayout>
      <Header />

      {/* THREE-COLUMN ADAPTIVE GRID SYSTEMS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* KOLOM KIRI: INPUT PARAMETERS PANEL */}
        <div className="space-y-4 lg:col-span-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Panel Parameter</span>
          
          <PlatformSelector value={platform} onChange={setPlatform} />
          <ProductSelector products={HP_PRODUCTS} value={selectedModel} onChange={setSelectedModel} />
          <OppoCareSelector products={OPPO_CARE_PRODUCTS} value={selectedOppoCare} onChange={setSelectedOppoCare} />
          <IotSelector products={IOT_PRODUCTS} value={selectedIot} onChange={setSelectedIot} />
          <TenorSelector value={tenor} onChange={setTenor} />
        </div>

        {/* KOLOM TENGAH: LIVE COMPARISON REPORT CARD */}
        <div className="bg-slate-50/60 rounded-2xl p-4 border border-slate-100 lg:col-span-1 space-y-4 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Rincian Komparasi</span>
            
            {currentHp && currentHp.price > 0 ? (
              <div className="space-y-3 text-[11px]">
                
                {/* Tampilan Kartu Hasil Opsi */}
                <HpOnlyCard modelName={currentHp.model} result={hpResult} />
                <SmartBundleCard modelName={currentHp.model} result={bundleResult} />

                {/* Transparansi Biaya Finansial Singkat */}
                <div className="bg-white border rounded-xl p-3 space-y-1 text-slate-500">
                  <div className="flex justify-between">
                    <span>Harga Pokok Gabungan:</span>
                    <span className="font-bold text-slate-700"><Money amount={totalBundlePrice} /></span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biaya Admin Terkapitalisasi:</span>
                    <span className="font-bold text-slate-700"><Money amount={bundleResult.adminTotal} /></span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Beban Bunga ({platform === 'Kredivo' ? '2% Base' : 'Flat'}):</span>
                    <span className="font-bold text-slate-700"><Money amount={bundleResult.interestTotal} /></span>
                  </div>
                </div>

              </div>
            ) : (
              <p className="text-xs italic text-slate-400 text-center pt-8">Silakan tentukan parameter smartphone di panel kiri.</p>
            )}
          </div>
          <div className="text-[10px] text-slate-400 text-center italic border-t pt-2">Engine System v3.6 Optimized</div>
        </div>

        {/* KOLOM KANAN: LIVE PREVIEW & INSTANT WHATSAPP SHARE */}
        <div className="lg:col-span-1 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Live Preview Struk</span>
            
            {currentHp && currentHp.price > 0 ? (
              <div className="border border-amber-200/60 rounded-2xl p-5 shadow-inner font-mono text-[11px] text-amber-950 space-y-4 relative overflow-hidden bg-white">
                
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
                    <span><Money amount={bundleResult.monthlyInstallment} />/bln</span>
                  </div>
                </div>

                {/* Aksi Salin Teks Struk */}
                <div className="pt-2 grid grid-cols-1 gap-2 font-sans">
                  <button
                    type="button"
                    onClick={() => handleCopyStruk('paketlengkap')}
                    className={`w-full py-2 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                      copied ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {copied ? '✅ Berhasil Disalin!' : '📋 Salin Struk Paket Lengkap'}
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

          {currentHp && (
            <p className="text-[10px] text-slate-400 text-center leading-tight font-medium mt-3">
              🚀 Siap dikirim! Klik salin lalu langsung lakukan tempel teks (Paste) ke ruang obrolan chat pembeli.
            </p>
          )}
        </div>

      </div>
    </MainLayout>
  );
}