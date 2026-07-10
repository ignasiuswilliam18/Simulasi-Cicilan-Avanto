import { useMemo, useState } from "react";
import Header from "./components/layout/Header";
import SelectorPanel from "./components/selector/SelectorPanel";
import ResultCard from "./components/result/ResultCard";
import SummaryCard from "./components/result/SummaryCard";

import { HP_PRODUCTS, OPPO_CARE_PRODUCTS, IOT_PRODUCTS, FINANCING_PROVIDERS } from "./data";
import { calculateSimulation } from "./engine/calculateSimulation";

export default function App() {
  // --- STATE ---
  const [provider, setProvider] = useState(FINANCING_PROVIDERS[0].name);
  const [product, setProduct] = useState(HP_PRODUCTS[1].model);
  const [oppoCare, setOppoCare] = useState(OPPO_CARE_PRODUCTS[0].model);
  const [iot, setIot] = useState(IOT_PRODUCTS[0].model);
  const [dp, setDP] = useState(0);
  const [tenor, setTenor] = useState(3);
  const [interestRate, setInterestRate] = useState(3.75);
  const [promoterName, setPromoterName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  // --- LOOKUP & SIMULATION ---
  const currentProvider = useMemo(() => FINANCING_PROVIDERS.find(item => item.name === provider)!, [provider]);
  const currentProduct = useMemo(() => HP_PRODUCTS.find(item => item.model === product)!, [product]);
  const currentOppoCare = useMemo(() => OPPO_CARE_PRODUCTS.find(item => item.model === oppoCare), [oppoCare]);
  const currentIot = useMemo(() => IOT_PRODUCTS.find(item => item.model === iot), [iot]);

  const simulation = useMemo(() => calculateSimulation({
    price: currentProduct.price,
    downPayment: dp,
    tenor,
    provider: currentProvider,
    oppoCarePrice: currentOppoCare?.price ?? 0,
    iotPrice: currentIot?.price ?? 0,
  }), [currentProduct, currentProvider, currentOppoCare, currentIot, dp, tenor, interestRate]);

  // --- ACTIONS ---
  function copyResult(title: string, result: typeof simulation.hpOnly) {
    const text = `AVANTO FINANCING: ${title}\nCicilan: Rp ${result.monthlyInstallment.toLocaleString("id-ID")}/bln`;
    navigator.clipboard.writeText(text);
    alert("Simulation copied");
  }

  const selectorState = { provider, providers: FINANCING_PROVIDERS.map(item => item.name), product, productOptions: HP_PRODUCTS.map(item => ({ label: item.model, value: item.model })), productPrice: currentProduct.price, oppoCare, oppoCareOptions: OPPO_CARE_PRODUCTS.map(item => item.model), iot, iotOptions: IOT_PRODUCTS.map(item => item.model), dp, tenor, interestRate, promoterName, whatsapp };
  const selectorActions = { setProvider, setProduct, setOppoCare, setIot, setDP, setTenor, setInterestRate, setPromoterName, setWhatsapp };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-emerald-700">AVANTO</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest mt-1">PROMOTOR SMART BUNDLE SIMULATOR</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* SECTION 1: PANEL PARAMETER */}
          <div className="space-y-6">
            <h2 className="font-bold text-slate-700 uppercase text-sm">1. PANEL PARAMETER</h2>
            <SelectorPanel state={selectorState} actions={selectorActions} />
          </div>

          {/* SECTION 2: RINCIAN KOMPARASI */}
          <div className="space-y-6">
            <h2 className="font-bold text-slate-700 uppercase text-sm">2. RINCIAN KOMPARASI</h2>
            <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-4">
              <div className="border p-4 rounded-lg">
                <p className="text-xs font-bold">OPSI 1: HP SAJA</p>
                <p className="text-xl font-black">Rp {simulation.hpOnly.monthlyInstallment.toLocaleString('id-ID')}</p>
              </div>
              <div className="border-2 border-emerald-500 p-4 rounded-lg">
                <p className="text-xs font-bold text-emerald-600">OPSI 2: PAKET LENGKAP COMBO</p>
                <p className="text-xl font-black text-emerald-600">Rp {simulation.smartBundle.monthlyInstallment.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>

          {/* SECTION 3: LIVE PREVIEW STRUK */}
          <div className="space-y-6">
            <h2 className="font-bold text-slate-700 uppercase text-sm">3. LIVE PREVIEW STRUK</h2>
            <div className="border-2 border-dashed border-emerald-200 p-6 rounded-lg bg-white shadow-sm">
              <div className="text-center mb-4">
                <h3 className="font-bold">AVANTO FINANCING</h3>
                <p className="text-[10px]">OFFICIAL DIGITAL RECEIPT</p>
              </div>
              <div className="text-xs space-y-2 border-t border-b border-dashed py-4">
                <p>UNIT: {product}</p>
                <p>MITRA: {provider}</p>
                <p>TENOR: {tenor} BULAN</p>
              </div>
              <div className="mt-4 bg-amber-50 p-3 flex justify-between font-bold text-sm">
                <span>ANGSURAN:</span>
                <span>Rp {simulation.smartBundle.monthlyInstallment.toLocaleString('id-ID')}/bln</span>
              </div>
              <button 
                onClick={() => copyResult("SMART BUNDLE", simulation.smartBundle)}
                className="w-full mt-4 bg-slate-900 text-white py-2 rounded text-sm font-bold"
              >
                Salin Struk
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}