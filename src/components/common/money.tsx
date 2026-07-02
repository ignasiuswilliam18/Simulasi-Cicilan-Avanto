interface MoneyProps {
  amount: number;
  className?: string;
}

export default function Money({ amount, className = "" }: MoneyProps) {
  return (
    <span className={className}>
      Rp {amount.toLocaleString('id-ID')}
    </span>
  );
}