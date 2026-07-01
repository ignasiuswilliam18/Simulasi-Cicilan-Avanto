import type { FinancingProvider } from '../data';

export interface CalculationResult {
  tenor: number;
  monthlyInstallment: number;
  totalPrincipal: number;
  totalInterest: number;
  totalAdminFee: number;
  grandTotal: number;
}

export const calculateFinancing = (
  totalProductPrice: number,
  provider: FinancingProvider,
  tenor: number
): CalculationResult => {
  // Antisipasi jika total harga kosong atau tidak valid
  const totalPrincipal = totalProductPrice || 0;
  const currentTenor = tenor || 3;
  const interestRate = provider?.interestRate || 0.0375;

  // 1. Hitung Biaya Admin Aman
  let totalAdminFee = 0;
  if (provider?.adminFeeType === 'percentage') {
    totalAdminFee = totalPrincipal * (provider.adminFeeValue || 0);
  } else {
    totalAdminFee = provider?.adminFeeValue || 0;
  }

  // 2. Hitung Total Bunga Flat Excel
  const totalInterest = totalPrincipal * interestRate * currentTenor;

  // 3. Akumulasi Akhir
  const grandTotal = totalPrincipal + totalInterest + totalAdminFee;

  // 4. Cicilan bulanan
  const monthlyInstallment = grandTotal / currentTenor;

  return {
    tenor: currentTenor,
    monthlyInstallment: Math.round(monthlyInstallment) || 0,
    totalPrincipal,
    totalInterest: Math.round(totalInterest) || 0,
    totalAdminFee: Math.round(totalAdminFee) || 0,
    grandTotal: Math.round(grandTotal) || 0
  };
};

export const generateAllTenorSimulations = (
  totalProductPrice: number,
  provider: FinancingProvider,
  tenors: number[] = [3, 6, 9, 12]
): CalculationResult[] => {
  return tenors.map(tenor => calculateFinancing(totalProductPrice, provider, tenor));
};