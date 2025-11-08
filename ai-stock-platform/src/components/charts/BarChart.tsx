"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Chart } from "react-chartjs-2";
import { useEffect, useRef } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
);

type BarChartProps = {
  labels: string[];
  dataset: number[];
  label: string;
  timeframe: string;
};

export function BarChart({
  labels,
  dataset,
  label,
  timeframe,
}: BarChartProps) {
  const chartRef = useRef<ChartJS<"bar"> | null>(null);

  useEffect(() => {
    chartRef.current?.resetZoom();
  }, [timeframe]);

  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label,
        data: dataset,
        backgroundColor: labels.map((metric) =>
          metric.toLowerCase().includes("debt")
            ? "rgba(234, 179, 8, 0.65)"
            : metric.toLowerCase().includes("roe")
              ? "rgba(45, 212, 191, 0.75)"
              : "rgba(14, 165, 233, 0.75)",
        ),
        borderRadius: 12,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            family: "Open Sans, Roboto, sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: "#0f172a",
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: "x",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: "Open Sans, Roboto, sans-serif",
          },
        },
        grid: { display: false },
      },
      y: {
        ticks: {
          font: {
            family: "Open Sans, Roboto, sans-serif",
          },
        },
        grid: { color: "#e2e8f0" },
      },
    },
  };

  return (
    <figure
      className="h-full w-full"
      aria-label="Bar chart comparing profitability and leverage metrics"
    >
      <Chart
        ref={(instance) => {
          if (instance) {
            chartRef.current = instance as unknown as ChartJS<"bar">;
          }
        }}
        type="bar"
        data={data}
        options={options}
        aria-hidden={false}
        role="img"
      />
    </figure>
  );
}
