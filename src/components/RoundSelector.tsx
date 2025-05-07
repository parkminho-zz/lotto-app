'use client';

type RoundSelectorProps = {
  rounds: number[];
  selectedRound: number;
  onChange: (round: number) => void;
};

export default function RoundSelector({ rounds, selectedRound, onChange }: RoundSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="round-select" className="font-semibold text-gray-700">
        회차 선택:
      </label>
      <select
        id="round-select"
        className="p-2 border rounded-md"
        value={selectedRound}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {rounds.map((round) => (
          <option key={round} value={round}>
            {round}회
          </option>
        ))}
      </select>
    </div>
  );
}
