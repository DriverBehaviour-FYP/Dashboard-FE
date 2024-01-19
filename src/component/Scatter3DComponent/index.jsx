import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2"; // Correct import statement

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const options = {
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Y Axis Label",
      },
    },
    x: {
      beginAtZero: true,
      title: {
        display: true,
        text: "X Axis Label",
      },
    },
    z: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Z Axis Label",
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) => {
          const dataPoint = context.parsed;
          return `X: ${dataPoint.x}, Y: ${dataPoint.y}, Z: ${dataPoint.z}`;
        },
        title: (tooltipItem) => {
          const index = tooltipItem[0].dataIndex;
          return `Point ${index + 1}`;
        },
      },
    },
  },
  onClick: (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      // const dataPoint = chart.data.datasets[0].data[index];
      const url = `https://example.com/${index + 1}`;
      window.location.href = url;
    }
  },
};

const rotateColors = ["red", "blue", "green", "black"];

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
        z: Math.random() * 200 - 100,
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
