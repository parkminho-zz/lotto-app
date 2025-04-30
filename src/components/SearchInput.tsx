type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  startDate: string;
  endDate: string;
  onStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function SearchInput({
  value,
  onChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: Props) {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="ID, 이름 검색"
        className="border px-3 py-2 w-64"
      />
      <input
        type="date"
        value={startDate}
        onChange={onStartDateChange}
        className="border px-3 py-2"
      />
      <span>~</span>
      <input
        type="date"
        value={endDate}
        onChange={onEndDateChange}
        className="border px-3 py-2"
      />
    </div>
  );
}
