import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Y Axis Label",
      },
    },
    x: {
      type: "linear",
      position: "bottom",
      title: {
        display: true,
        text: "X Axis Label",
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) => {
          const dataPoint = context.parsed;
          return `X: ${dataPoint.x}, Y: ${dataPoint.y}`;
        },
        title: (tooltipItem, data) => {
          const index = tooltipItem[0].dataIndex;
          return `Point ${index + 1}`;
        },
      },
    },
  },
  onClick: (event, elements, chart) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      const dataPoint = chart.data.datasets[0].data[index];
      const url = `https://example.com/${index + 1}`;
      window.location.href = url;
    }
  },
};
const rotateColors = ["red", "blue", "green", "black"]; // Add more colors as needed

const getRandomColor = () => {
  const index = Math.floor(Math.random() * rotateColors.length);
  return rotateColors[index];
};
const data = {
  datasets: [
    {
      label: "A dataset",
      data: Array.from({ length: 100 }, () => ({
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
      })),
      pointLabel: "Test",
      pointBackgroundColor: Array.from({ length: 100 }, () => getRandomColor()),
    },
  ],
};

const ScatterComponent = () => {
  return <Scatter options={options} data={data} />;
};

export default ScatterComponent;
