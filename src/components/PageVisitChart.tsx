"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type PageVisitData = {
  page: string;
  count: number;
};

export default function PageVisitChart({ data }: { data: PageVisitData[] }) {
  const chartData = {
    labels: data.map(d => d.page),
    datasets: [
      {
        label: "페이지 방문 수",
        data: data.map(d => d.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
    },
  };
  return (
    <div className="h-[400px] w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
}
