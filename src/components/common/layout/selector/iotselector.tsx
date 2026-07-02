import { ProductItem } from '../../types/financing';
import SectionTitle from '../../../../components/common/sectiontittle';

interface IotSelectorProps {
  products: ProductItem[];
  value: number;
  onChange: (index: number) => void;
}

export default function IotSelector({ products, value, onChange }: IotSelectorProps) {
  return (
    <div>
      <SectionTitle>4. Tambah Produk IoT</SectionTitle>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-3 text-sm outline-none focus:border-emerald-500 font-semibold cursor-pointer"
      >
        {products?.map((item, idx) => (
          <option key={idx} value={idx}>
            {item.model} {item.price > 0 ? ` (+Rp ${item.price.toLocaleString('id-ID')})` : ''}
          </option>
        ))}
      </select>
    </div>
  );
}