import { ProductType } from '../../../../../types/financing'; // sesuaikan nama type jika berbeda
import SectionTitle from '../../../../components/common/sectiontittle';
interface ProductSelectorProps {
  products: ProductItem[];
  value: string;
  onChange: (model: string) => void;
}

export default function ProductSelector({ products, value, onChange }: ProductSelectorProps) {
  return (
    <div>
      <SectionTitle>2. Pilih Tipe HP OPPO</SectionTitle>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 font-semibold cursor-pointer"
      >
        {products?.map((product, index) => (
          <option key={index} value={product.model}>
            {product.model} {product.price > 0 ? ` - Rp ${product.price.toLocaleString('id-ID')}` : ''}
          </option>
        ))}
      </select>
    </div>
  );
}