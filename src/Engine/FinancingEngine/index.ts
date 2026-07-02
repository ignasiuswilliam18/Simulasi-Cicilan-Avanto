import { PlatformType, CalculationResult } from '../../types/financing';

const MONTHLY_RATE = 0.0299; 

export function calculateFinancing(
  basePrice: number,
  platform: PlatformType,
  tenor: number,
  downPayment: number = 0
): CalculationResult {
  const netPrice = Math.max(0, basePrice - downPayment);

  if (netPrice <= 0) {
    return { adminTotal: 0, principalWithAdmin: 0, interestTotal: 0, totalLoan: 0, monthlyInstallment: 0 };
  }

  const adminTotal = platform === 'Kredivo' ? Math.round(netPrice * 0.02) : 60000;
  const principalWithAdmin = netPrice + adminTotal;
  const interestTotal = Math.round(principalWithAdmin * MONTHLY_RATE * tenor);
  const totalLoan = principalWithAdmin + interestTotal;
  const monthlyInstallment = Math.round(totalLoan / tenor);

  return {
    adminTotal,
    principalWithAdmin,
    interestTotal,
    totalLoan,
    monthlyInstallment,
  };
}