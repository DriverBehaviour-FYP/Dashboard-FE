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

const getRandomColor = (score) => {
  if (score > 70) return rotateColors[0];
  else if (score > 40) return rotateColors[1];
  else return rotateColors[2];
};

const ScatterComponent = ({ driverData, xAxisName, xAxisLabel, driverId }) => {
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
    datasets: [
      {
        label:
          xAxisName === "deviceid"
            ? "All Drivers"
            : `All Trips Of Driver ${driverId}`,
        data: driverData[xAxisName].map((deviceId, index) => ({
          x: index,
          y: driverData.scaledScores[index],
        })),
        pointLabel: "Driver Behaviour",
        pointBackgroundColor: driverData[xAxisName].map((deviceId, index) =>
          getRandomColor(driverData.scaledScores[index])
        ),
      },
    ],
  };

  return (
    <div className="white-box mt-2 pt-5">
      <div className="row pr-3">
        <div className="col-2"></div>
        <div className="col-3">
          <div className="legend-item">
            <span className="circle red"></span>
            <span className="legend-text">Element 1</span>
          </div>
        </div>
        <div className="col-3">
          <div className="legend-item">
            <span className="circle" style={{ backgroundColor: "blue" }}></span>
            <span className="legend-text">Element 1</span>
          </div>
        </div>
        <div className="col-3">
          <div className="legend-item">
            <span
              className="circle"
              style={{ backgroundColor: "green" }}
            ></span>
            <span className="legend-text">Element 1</span>
          </div>
        </div>
      </div>
      <Scatter
        options={options}
        data={data}
        className="white-box rounded-2 p-3"
      />
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
  driverId: PropTypes.number,
};
export default ScatterComponent;
