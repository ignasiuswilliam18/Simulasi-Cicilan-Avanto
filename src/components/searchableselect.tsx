import { useState, useMemo } from 'react';
import { ProductItem } from '../types/financing';
import SectionTitle from './common/sectiontittle';
interface SearchableSelectProps {
  products: ProductItem[];
  selectedValue: string;
  onChange: (model: string) => void;
}

export default function SearchableSelect({ products, selectedValue, onChange }: SearchableSelectProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Urutkan produk sesuai abjad & filter berdasarkan keyword pencarian
  const filteredAndSortedProducts = useMemo(() => {
    // Duplikat array agar tidak merusak data asli, lalu urutkan abjad A-Z
    const sorted = [...products].sort((a, b) => a.model.localeCompare(b.model));
    
    if (!searchTerm) return sorted;
    
    return sorted.filter((p) =>
      p.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <div className="space-y-1.5">
      <SectionTitle>2. Pilih & Cari Tipe HP OPPO</SectionTitle>
      
      {/* Kolom Input Search */}
      <input
        type="text"
        placeholder="🔍 Ketik kata kunci tipe HP (cth: Reno)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-2 text-xs font-medium outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100"
      />

      {/* Select Dropdown List */}
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-3 text-sm outline-none focus:border-emerald-500 font-semibold cursor-pointer"
      >
        <option value="">-- Pilih Unit HP --</option>
        {filteredAndSortedProducts.map((product, index) => (
          <option key={index} value={product.model}>
            {product.model} {product.price > 0 ? ` - Rp ${product.price.toLocaleString('id-ID')}` : ''}
          </option>
        ))}
      </select>
    </div>
  );
}