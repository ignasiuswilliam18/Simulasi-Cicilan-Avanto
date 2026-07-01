// Interface untuk input data simulasi
export interface CalculationInput {
  price: number;        // Harga barang/HP
  downPayment: number;  // Uang muka (DP)
  tenor: number;        // Tenor dalam bulan (3, 6, 9, 12, dst)
  interestRate: number; // Suku bunga per tahun (misal 0.12 untuk 12%)
}

// Interface untuk hasil kalkulasi yang akan dikembalikan ke UI
export interface CalculationResult {
  principalLoan: number;    // Pokok hutang (Harga - DP)
  totalInterest: number;    // Total bunga selama masa tenor
  totalPayback: number;     // Total yang harus dibayar (Pokok + Bunga)
  monthlyInstallment: number; // Cicilan bulanan
}

/**
 * Fungsi Utama untuk Menghitung Cicilan Pembiayaan Avanto (Flat Rate)
 */
export function calculateFinancing(input: CalculationInput): CalculationResult {
  const { price, downPayment, tenor, interestRate } = input;

  // 1. Hitung Pokok Hutang (Pembiayaan yang diajukan)
  const principalLoan = Math.max(0, price - downPayment);

  if (principalLoan === 0 || tenor <= 0) {
    return {
      principalLoan: 0,
      totalInterest: 0,
      totalPayback: 0,
      monthlyInstallment: 0,
    };
  }

  // 2. Hitung Bunga per Bulan (Menggunakan metode Flat per tahun digeser ke bulan)
  const monthlyRate = interestRate / 12;
  const totalInterest = principalLoan * monthlyRate * tenor;

  // 3. Total Hutang Keseluruhan (Pokok + Bunga)
  const totalPayback = principalLoan + totalInterest;

  // 4. Cicilan per bulan
  const monthlyInstallment = Math.round(totalPayback / tenor);

  return {
    principalLoan,
    totalInterest: Math.round(totalInterest),
    totalPayback: Math.round(totalPayback),
    monthlyInstallment,
  };
}