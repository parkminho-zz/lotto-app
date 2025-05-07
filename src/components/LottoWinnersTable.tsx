import { LottoResult } from "@/types/lotto";

// 안전하게 숫자 출력 (null/undefined 대응)
const formatCurrency = (value: number | undefined | null) =>
  value != null ? value.toLocaleString() + "원" : "-";

const formatCount = (value: number | undefined | null) =>
  value != null ? value.toLocaleString() + "게임" : "-";

export default function LottoWinnersTable({ result }: { result: LottoResult }) {
  const rows = [
    {
      rank: "1등",
      prize:
      result.firstPrize && result.firstWinners
        ? result.firstPrize * result.firstWinners
        : null,
      winners: result.firstWinners,
      rule: "당첨번호 6개 숫자일치",
      calc: () =>
        result.firstPrize
          ? `${Number(result.firstPrize).toLocaleString()}원`
          : "-",
    },
    {
      rank: "2등",
      prize: 
      result.secondPrize && result.secondWinners
        ? result.secondPrize * result.secondWinners
        : null,
      winners: result.secondWinners,
      rule: "당첨번호 5개 숫자일치 + 보너스 숫자일치",
      calc: () =>
        result.secondPrize ? `${Number(result.secondPrize).toLocaleString()}원` : "-",
    },
    {
      rank: "3등",
      prize:
        result.thirdPrize && result.thirdWinners
          ? result.thirdPrize * result.thirdWinners
          : null,
      winners: result.thirdWinners,
      rule: "당첨번호 5개 숫자일치",
      calc: () =>
        result.thirdPrize ? `${Number(result.thirdPrize).toLocaleString()}원` : "-",
    },
    {
      rank: "4등",
      prize:
        result.fourthPrize && result.fourthWinners
          ? result.fourthPrize * result.fourthWinners
          : null,
      winners: result.fourthWinners,
      rule: "당첨번호 4개 숫자일치",
      calc: () =>
        result.fourthPrize ? `${Number(result.fourthPrize).toLocaleString()}원` : "-",
    },
    {
      rank: "5등",
      prize:
        result.fifthPrize && result.fifthWinners
          ? result.fifthPrize * result.fifthWinners
          : null,
      winners: result.fifthWinners,
      rule: "당첨번호 3개 숫자일치",
      calc: () =>
        result.fifthPrize ? `${Number(result.fifthPrize).toLocaleString()}원` : "-",
    },
  ];

  return (
    <div className="mt-10 w-full max-w-4xl mx-auto text-center">
      <h2 className="text-xl font-semibold mb-4 text-center">
        🎯 등수별 당첨 내역
      </h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4">순위</th>
            <th className="py-3 px-4">등위별 총 당첨금액</th>
            <th className="py-3 px-4">당첨게임 수</th>
            <th className="py-3 px-4">1게임당 당첨금액</th>
            <th className="py-3 px-4">당첨 기준</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((tier, idx) => (
            <tr key={idx} className="border-b">
              <td className="py-3 px-4">{tier.rank}</td>
              <td className="py-3 px-4">{formatCurrency(tier.prize)}</td>
              <td className="py-3 px-4">{formatCount(tier.winners)}</td>
              <td className="py-3 px-4">{tier.calc()}</td>
              <td className="py-3 px-4">{tier.rule}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
