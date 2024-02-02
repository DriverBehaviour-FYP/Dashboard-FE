import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import PropTypes from "prop-types";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const rotateColors = ["red", "blue", "green", "black"]; // Add more colors as needed

const getRandomColor = () => {
  const index = Math.floor(Math.random() * rotateColors.length);
  return rotateColors[index];
};

const ScatterComponent = ({ driverData, xAxisName, xAxisLabel }) => {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Score",
        },
      },
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: xAxisLabel,
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
  const data = {
    datasets: [
      {
        label:
          xAxisName === "deviceid" ? "All Drivers" : "All Trips Of Driver 116",
        data: driverData[xAxisName].map((deviceId, index) => ({
          x: index,
          y: driverData.scaledScores[index],
        })),
        pointLabel: "Driver Behaviour",
        pointBackgroundColor: Array.from({ length: 100 }, () =>
          getRandomColor()
        ),
      },
    ],
  };

  return (
    <Scatter
      options={options}
      data={data}
      className="white-box rounded-2 p-3"
    />
  );
};
ScatterComponent.propTypes = {
  driverData: PropTypes.shape({
    deviceid: PropTypes.arrayOf(PropTypes.number).isRequired,
    score: PropTypes.arrayOf(PropTypes.number).isRequired,
    scaledScores: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  xAxisName: PropTypes.string.isRequired,
  xAxisLabel: PropTypes.string.isRequired,
};
export default ScatterComponent;
