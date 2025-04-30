type SummaryCardProps = {
    label: string;
    value: number;
    color: string;
  };

export function SummaryCard({ label, value, color }: SummaryCardProps) {
    return (
        <div className={`rounded-lg p-4 shadow bg-${color}-100`}>
        <h2 className="text-sm font-medium text-gray-600">{label}</h2>
        <p className={`text-2xl font-bold text-${color}-700`}>{value}</p>
        </div>
    );
}
  