"use client";

import { ChartData, ChartDataset, ChartOptions } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Chart } from "react-chartjs-2";
import { useEffect, useMemo, useRef } from "react";
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";
import "chartjs-chart-financial";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  CandlestickController,
  CandlestickElement,
  zoomPlugin,
);

export type CandleDatum = {
  x: string;
  o: number;
  h: number;
  l: number;
  c: number;
};

type CandlestickChartProps = {
  data: CandleDatum[];
  timeframe: string;
};

export function CandlestickChart({ data, timeframe }: CandlestickChartProps) {
  const chartRef = useRef<ChartJS<"candlestick"> | null>(null);

  useEffect(() => {
    const chart = chartRef.current;
    chart?.resetZoom();
  }, [timeframe]);

  const timeUnit = useMemo(() => {
    switch (timeframe) {
      case "1M":
        return "day";
      case "3M":
      case "1Y":
        return "week";
      case "5Y":
      case "Max":
      default:
        return "month";
    }
  }, [timeframe]);

  const dataset = {
    label: "OHLC",
    data,
    borderColor: "#0f172a",
    color: {
      up: "#16a34a",
      down: "#dc2626",
      unchanged: "#64748b",
    },
  } as unknown as ChartDataset<"candlestick", CandleDatum[]>;

  const chartData: ChartData<"candlestick", CandleDatum[], unknown> = {
    datasets: [dataset],
  };

  const options: ChartOptions<"candlestick"> = {
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
        callbacks: {
          label(context) {
            const datum = context.raw as CandleDatum;
            return `O:${datum.o.toFixed(2)} H:${datum.h.toFixed(
              2,
            )} L:${datum.l.toFixed(2)} C:${datum.c.toFixed(2)}`;
          },
        },
      },
      zoom: {
        limits: {
          x: { min: "original", max: "original" },
          y: { min: "original", max: "original" },
        },
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
        adapters: {
          date: {},
        },
        type: "time",
        time: {
          unit: timeUnit,
        },
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
      aria-label="Interactive candlestick chart showing OHLC price data"
    >
      <Chart
        ref={(instance) => {
          if (instance) {
            chartRef.current =
              instance as unknown as ChartJS<"candlestick"> | null;
          }
        }}
        type="candlestick"
        data={chartData}
        options={options}
        aria-hidden={false}
        role="img"
      />
    </figure>
  );
}
