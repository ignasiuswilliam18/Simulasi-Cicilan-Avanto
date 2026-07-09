import { FinancingProvider } from "../data";

export interface SimulationInput {
  price: number;
  downPayment: number;
  tenor: number;
  provider: FinancingProvider;

  oppoCarePrice?: number;
  iotPrice?: number;
}

export interface SimulationResult {
  hpOnly: CalculationResult;
  smartBundle: CalculationResult;
}

export interface CalculationResult {
  totalPrice: number;
  downPayment: number;
  principal: number;
  adminFee: number;
  interest: number;
  totalPayable: number;
  monthlyInstallment: number;
}

export function calculateSimulation(
  input: SimulationInput
): SimulationResult {
  const {
    price,
    downPayment,
    tenor,
    provider,
    oppoCarePrice = 0,
    iotPrice = 0,
  } = input;

  const hpOnly = calculateBase({
    price,
    downPayment,
    tenor,
    interestRate: provider.interestRate,
    adminFeeType: provider.adminFeeType,
    adminFeeValue: provider.adminFeeValue,
  });

  const bundlePrice = price + oppoCarePrice + iotPrice;

  const smartBundle = calculateBase({
    price: bundlePrice,
    downPayment,
    tenor,
    interestRate: provider.interestRate,
    adminFeeType: provider.adminFeeType,
    adminFeeValue: provider.adminFeeValue,
  });

  return {
    hpOnly,
    smartBundle,
  };
}

interface CalculateBaseParams {
  price: number;
  downPayment: number;
  tenor: number;
  interestRate: number;
  adminFeeType: "percentage" | "fixed";
  adminFeeValue: number;
}

function calculateBase({
  price,
  downPayment,
  tenor,
  interestRate,
  adminFeeType,
  adminFeeValue,
}: CalculateBaseParams): CalculationResult {
  // Pokok pembiayaan setelah DP
  const principal = Math.max(price - downPayment, 0);

  // Admin dihitung dari pokok pembiayaan
  let adminFee = 0;

  if (adminFeeType === "percentage") {
    adminFee = principal * adminFeeValue;
  } else {
    adminFee = adminFeeValue;
  }

  // ======================================================
  // BUSINESS RULE AVANTO
  // Bunga dihitung dari harga produk SEBELUM DP
  // ======================================================

  const monthlyRate = interestRate / 12;

  const interest = price * monthlyRate * tenor;

  // ======================================================

  const totalPayable =
    principal +
    adminFee +
    interest;

  const monthlyInstallment =
    tenor > 0
      ? totalPayable / tenor
      : 0;

  return {
    totalPrice: Math.round(price),

    downPayment: Math.round(downPayment),

    principal: Math.round(principal),

    adminFee: Math.round(adminFee),

    interest: Math.round(interest),

    totalPayable: Math.round(totalPayable),

    monthlyInstallment: Math.round(monthlyInstallment),
  };
}