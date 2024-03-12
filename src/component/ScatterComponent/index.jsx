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
import { useState, useEffect } from "react";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const rotateColors = ["red", "blue", "green"]; // Add more colors as needed
const behaviourMap = { red: "Agressive", blue: "Normal", green: "Safe" };
const getRandomColor = (score) => {
  if (score > 70) return rotateColors[0];
  else if (score > 40) return rotateColors[1];
  else return rotateColors[2];
};

const ScatterComponent = ({ driverData, xAxisName, xAxisLabel }) => {
  const [colorMap, setColorMap] = useState({});
  useEffect(() => {
    const generateColorMap = () => {
      const tesmColorMap = { red: [], blue: [], green: [] };
      driverData[xAxisName].forEach((deviceId, index) => {
        const color = getRandomColor(driverData.scaledScores[index]);
        tesmColorMap[color].push({
          x: index,
          y: driverData.scaledScores[index],
        });
      });
      setColorMap(tesmColorMap);
    };
    generateColorMap();
  }, [driverData, xAxisName]);

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
            return `${xAxisLabel == "Drivers" ? "Driver Id" : "Trip Id"}: ${
              dataPoint.x
            }, Score: ${dataPoint.y}`;
          },
          title: (tooltipItem) => {
            const index = tooltipItem[0].dataIndex;
            return `Point ${index + 1}`;
          },
        },
      },
    },
    legend: {
      display: false, // Remove legend
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const dataPoint = driverData[xAxisName][index];
        if (xAxisName === "deviceid") {
          const url = `http://localhost:5173/driver/${dataPoint}`;
          window.location.href = url;
        } else {
          const url = `http://localhost:5173/trip/${dataPoint}`;
          window.location.href = url;
        }
      }
    },
  };
  const data = {
    datasets:
      // [
      //   {
      //     label: "",
      //     data: driverData[xAxisName].map((deviceId, index) => ({
      //       x: index,
      //       y: driverData.scaledScores[index],
      //     })),
      //     pointLabel: "Driver Behaviour",
      //     pointBackgroundColor: driverData[xAxisName].map((deviceId, index) =>
      //       getRandomColor(driverData.scaledScores[index])
      //     ),
      //     pointBorderColor: "transparent",
      //     pointRadius: 4,
      //   },
      // ],
      Object.entries(colorMap).map(([color, data]) => ({
        label: behaviourMap[color],
        data: data,
        pointBackgroundColor: color,
        pointBorderColor: "transparent",
        pointRadius: 4,
      })),
  };

  return (
    <div className="container">
      <div className="row justify-content-center white-box">
        <div className=" pt-2 text-center">
          <Scatter options={options} data={data} className="rounded-2" />
        </div>
      </div>
    </div>
  );
};
ScatterComponent.propTypes = {
  driverData: PropTypes.shape({
    score: PropTypes.arrayOf(PropTypes.number).isRequired,
    scaledScores: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  xAxisName: PropTypes.string.isRequired,
  xAxisLabel: PropTypes.string.isRequired,
};
export default ScatterComponent;
