import { PlatformType, CalculationResult } from '../types/financing';

const MONTHLY_RATE = 0.0375; // Suku bunga flat 3.75%

/**
 * Menghitung simulasi kredit berdasarkan harga barang, platform, dan tenor
 */
export function calculateFinancing(
  basePrice: number,
  platform: PlatformType,
  tenor: number
): CalculationResult {
  if (basePrice <= 0) {
    return { adminTotal: 0, principalWithAdmin: 0, interestTotal: 0, totalLoan: 0, monthlyInstallment: 0 };
  }

  // 1. Hitung nominal admin berdasarkan aturan platform
  // Kredivo = 2% dari harga barang, YesssCredit = Flat Rp 60.000
  const adminTotal = platform === 'Kredivo' ? Math.round(basePrice * 0.02) : 60000;

  // 2. Pokok Pinjaman setelah digabung admin (Sistem Kapitalisasi)
  const principalWithAdmin = basePrice + adminTotal;

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