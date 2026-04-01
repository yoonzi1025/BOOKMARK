import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ReadingStatusChart = ({ chartData }) => {
  const data = {
    ...chartData,
    datasets: chartData.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: ["#2f3e9e", "#6f7dd8", "#d9def5", "#e5e5e5"],
      borderWidth: 0,
      hoverOffset: 4,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "62%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#111111",
        bodyColor: "#ffffff",
        titleColor: "#999999",
        bodyFont: {
          weight: "700",
        },
        padding: 10,
        cornerRadius: 10,
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed}권`,
        },
      },
    },
  };

  return (
    <div className="reading-status-chart">
      <Pie data={data} options={options} />
    </div>
  );
};

export default ReadingStatusChart;
