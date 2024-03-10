import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const LineGraphComponent = ({ graphData, label }) => {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Average Dwell Time",
        },
      },
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "Bus Zones",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = `Bus Stop: ${tooltipItem.label}, Dwell Time: ${tooltipItem.formattedValue}`;
            return label;
          },
          title: function (tooltipItem) {
            return `${label} ID: ${
              label == "Driver"
                ? graphData[tooltipItem[0].datasetIndex].driverId
                : graphData[tooltipItem[0].datasetIndex].tripId
            }`;
          },
        },
      },
    },
    legend: {
      display: true,
      position: "top",
      align: "start",
      labels: {
        generateLabels: function (chart) {
          return chart.data.datasets.map((dataset, i) => ({
            text: `${label} ID: ${
              label == "Driver" ? dataset.driverId : dataset.tripId
            }`,
            fillStyle: dataset.backgroundColor || "rgba(0,0,0,0)",
            strokeStyle: dataset.borderColor || "rgba(0,0,0,0)",
            lineWidth: dataset.borderWidth || 0,
            hidden: !chart.isDatasetVisible(i),
            index: i,
          }));
        },
      },
    },
  };

  const data = {
    datasets: graphData.map((driverData, index) => ({
      label: `${label} ${
        label == "Driver" ? driverData.driverId : driverData.tripId
      }`,
      data: driverData.dwellTimes.map(
        ({ bus_stop_no, average_dwell_time }) => ({
          x: bus_stop_no,
          y: average_dwell_time,
          label: bus_stop_no,
          formattedValue: average_dwell_time,
        })
      ),
      borderColor: `hsl(${(index * 40) % 360}, 100%, 50%)`, // Adjust color
      backgroundColor: "rgba(0, 0, 255, 0.1)", // Area under line color (optional)
      pointRadius: 0, // Hide points
      driverId: driverData.driverId, // Custom property to hold driverId
    })),
  };

  return (
    <div className="white-box pt-2">
      <Line options={options} data={data} className="white-box rounded-2" />
    </div>
  );
};

const FirstDataType = PropTypes.shape({
  driverId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  dwellTimes: PropTypes.arrayOf(
    PropTypes.shape({
      average_dwell_time: PropTypes.number.isRequired,
      bus_stop_no: PropTypes.number.isRequired,
    })
  ).isRequired,
});

const SecondDataType = PropTypes.shape({
  tripId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  dwellTimes: PropTypes.arrayOf(
    PropTypes.shape({
      average_dwell_time: PropTypes.number.isRequired,
      bus_stop_no: PropTypes.number.isRequired,
    })
  ).isRequired,
});
LineGraphComponent.propTypes = {
  graphData: PropTypes.arrayOf(
    PropTypes.oneOfType([FirstDataType, SecondDataType])
  ).isRequired,
  label: PropTypes.string.isRequired,
};

export default LineGraphComponent;
