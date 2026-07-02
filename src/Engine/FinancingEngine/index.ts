import { PlatformType, CalculationResult } from '../types/financing';

// Suku bunga disinkronkan 100% dengan formula bar Excel Anda (2.99%)
const MONTHLY_RATE = 0.0299; 

export function calculateFinancing(
  basePrice: number,
  platform: PlatformType,
  tenor: number,
  downPayment: number = 0
): CalculationResult {
  // Pokok utang dikurangi DP (Uang Muka) secara manual
  const netPrice = Math.max(0, basePrice - downPayment);

  if (netPrice <= 0) {
    return { adminTotal: 0, principalWithAdmin: 0, interestTotal: 0, totalLoan: 0, monthlyInstallment: 0 };
  }

  // Kredivo = 2% dari sisa pokok, YesssCredit = Flat Rp 60.000
  const adminTotal = platform === 'Kredivo' ? Math.round(netPrice * 0.02) : 60000;

  // Pokok pinjaman setelah kapitalisasi admin
  const principalWithAdmin = netPrice + adminTotal;

  // Total bunga berjalannya
  const interestTotal = Math.round(principalWithAdmin * MONTHLY_RATE * tenor);

  // Total keseluruhan pinjaman pembeli
  const totalLoan = principalWithAdmin + interestTotal;

  // Angsuran final per bulan
  const monthlyInstallment = Math.round(totalLoan / tenor);

  return {
    adminTotal,
    principalWithAdmin,
    interestTotal,
    totalLoan,
    monthlyInstallment,
  };
}