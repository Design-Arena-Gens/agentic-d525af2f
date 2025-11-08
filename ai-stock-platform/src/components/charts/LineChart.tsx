"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Chart } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import { useEffect, useRef } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
);

type LineChartProps = {
  labels: string[];
  dataset: number[];
  label: string;
  timeframe: string;
};

export function LineChart({
  labels,
  dataset,
  label,
  timeframe,
}: LineChartProps) {
  const chartRef = useRef<ChartJS<"line"> | null>(null);

  useEffect(() => {
    chartRef.current?.resetZoom();
  }, [timeframe]);

  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label,
        data: dataset,
        borderColor: "#008080",
        backgroundColor: "rgba(0,128,128,0.1)",
        tension: 0.25,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
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
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
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
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          font: {
            family: "Open Sans, Roboto, sans-serif",
          },
        },
        grid: {
          color: "#e2e8f0",
        },
      },
    },
  };

  return (
    <figure
      className="h-full w-full"
      aria-label="Line chart illustrating revenue growth year over year"
    >
      <Chart
        ref={(instance) => {
          if (instance) {
            chartRef.current = instance as unknown as ChartJS<"line">;
          }
        }}
        type="line"
        data={data}
        options={options}
        aria-hidden={false}
        role="img"
      />
    </figure>
  );
}
