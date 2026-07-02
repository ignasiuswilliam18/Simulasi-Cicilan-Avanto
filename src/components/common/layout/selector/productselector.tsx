import { ProductItem } from '../../../../../types/financing';
import SectionTitle from '../../sectiontittle';

interface ProductSelectorProps {
  products: ProductItem[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export default function ProductSelector({ products, selectedValue, onChange }: ProductSelectorProps) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
      <SectionTitle>2. Pilih Tipe HP OPPO</SectionTitle>
      <div className="relative">
        <select
          value={selectedValue}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 appearance-none font-medium cursor-pointer"
        >
          <option value="">-- Pilih Tipe Smartphone --</option>
          {products?.map((product, index) => (
            <option key={index} value={product.model}>
              {product.model} (Rp {product.price.toLocaleString('id-ID')})
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
}