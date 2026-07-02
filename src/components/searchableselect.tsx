import { useState, useRef, useEffect } from 'react';
import { ProductItem } from '../types/financing';
import SectionTitle from './common/sectiontittle';

interface SearchableSelectProps {
  products: ProductItem[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export default function SearchableSelect({ products, selectedValue, onChange }: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProducts = products?.filter((p) =>
    p.model.toLowerCase().includes(search.toLowerCase())
  );

  const selectedProduct = products?.find((p) => p.model === selectedValue);

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3" ref={containerRef}>
      <SectionTitle>2. Pilih Tipe HP OPPO</SectionTitle>
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2.5 text-sm font-medium cursor-pointer flex justify-between items-center"
        >
          <span className={selectedProduct ? 'text-slate-800 font-bold' : 'text-slate-400'}>
            {selectedProduct ? `${selectedProduct.model} (Rp ${selectedProduct.price.toLocaleString('id-ID')})` : '-- Cari & Pilih Tipe HP --'}
          </span>
          <svg className={`fill-current h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto p-2 space-y-1.5">
            <input
              type="text"
              placeholder="Ketik tipe HP..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-emerald-500"
            />
            <div className="space-y-0.5">
              {filteredProducts?.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      onChange(product.model);
                      setIsOpen(false);
                      setSearch('');
                    }}
                    className={`px-2.5 py-2 text-xs rounded-lg cursor-pointer transition-all ${
                      selectedValue === product.model
                        ? 'bg-emerald-50 text-emerald-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {product.model} <span className="text-slate-400 font-normal">─ Rp {product.price.toLocaleString('id-ID')}</span>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-400 text-[11px] py-2 italic">Tipe HP tidak ditemukan</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}