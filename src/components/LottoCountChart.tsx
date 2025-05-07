"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface LottoCountChartProps {
  data: { number: number; count: number }[];
}

export default function LottoCountChart({ data }: LottoCountChartProps) {
    const labels = data.map(item => item.number);
    const dataCounts = data.map(item => item.count);
  return (
    <div className="mt-10 w-full max-w-4xl">
      <h2 className="text-xl font-semibold mb-4 text-center">번호별 생성 횟수</h2>
      <Bar
        data={{
          labels: data.map(item => item.number.toString()),
          datasets: [
            {
              label: '생성 횟수',
              data: data.map(item => item.count),
              backgroundColor: 'green',
              borderColor: 'green',
              borderWidth: 1,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: false },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { precision: 0, stepSize: 1 },
            },
          },
        }}
      />
    </div>
  );
}
