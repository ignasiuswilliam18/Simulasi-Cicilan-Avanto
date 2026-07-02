import { PlatformType, CalculationResult } from '../types/financing';

const MONTHLY_RATE = 0.0375; 

/**
 * Menghitung simulasi kredit berdasarkan harga barang, platform, tenor, dan DP manual
 */
export function calculateFinancing(
  basePrice: number,
  platform: PlatformType,
  tenor: number,
  downPayment: number = 0 // Tambahan parameter DP manual
): CalculationResult {
  // Pokok utang adalah harga barang dikurangi uang muka (DP)
  const netPrice = Math.max(0, basePrice - downPayment);

  if (netPrice <= 0) {
    return { adminTotal: 0, principalWithAdmin: 0, interestTotal: 0, totalLoan: 0, monthlyInstallment: 0 };
  }

  // 1. Hitung nominal admin berdasarkan aturan platform dari harga NET setelah DP
  const adminTotal = platform === 'Kredivo' ? Math.round(netPrice * 0.02) : 60000;

  // 2. Pokok Pinjaman setelah digabung admin
  const principalWithAdmin = netPrice + adminTotal;

  // 3. Hitung total bunga berdasarkan tenor bulanan
  const interestTotal = Math.round(principalWithAdmin * MONTHLY_RATE * tenor);

  // 4. Total pengembalian keseluruhan
  const totalLoan = principalWithAdmin + interestTotal;

  // 5. Pembagian angsuran per bulan
  const monthlyInstallment = Math.round(totalLoan / tenor);

  return {
    adminTotal,
    principalWithAdmin,
    interestTotal,
    totalLoan,
    monthlyInstallment,
  };
}