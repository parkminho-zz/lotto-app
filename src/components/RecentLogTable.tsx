import Link from "next/link";

type RecentLogTableProps = {
    title: string;
    logs: { userId: string; time: string; reason?: string }[];
  };

export function RecentLogTable({ title, logs }: RecentLogTableProps) {
    return (
      <div>
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <div className="border rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">유저 ID</th>
                <th className="p-2 text-left">시간</th>
                {logs[0]?.reason && <th className="p-2 text-left">사유</th>}
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{log.userId}</td>
                  <td className="p-2">{log.time}</td>
                  {log.reason && <td className="p-2">{log.reason}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }