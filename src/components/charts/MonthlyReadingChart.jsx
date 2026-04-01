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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyReadingChart = ({ chartData }) => {
  const data = {
    ...chartData,
    datasets: chartData.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: "#d9def5",
      borderRadius: 8,
      maxBarThickness: 28,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        backgroundColor: "#111111",
        titleColor: "#999999",
        bodyColor: "#ffffff",
        bodyFont: { weight: "700" },
        padding: 10,
        cornerRadius: 10,
        callbacks: {
          label: (ctx) => `${ctx.parsed.y}권`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: "#666666",
          font: { size: 11, weight: "600" },
        },
      },
      y: {
        grid: { color: "#f0f0f0" },
        border: { display: false },
        ticks: {
          color: "#666666",
          font: { size: 11, weight: "600" },
          stepSize: 1,
        },
      },
    },
  };

  return <Bar options={options} data={data} />;
};

export default MonthlyReadingChart;
