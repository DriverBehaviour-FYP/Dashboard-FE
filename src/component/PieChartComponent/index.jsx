import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import PropTypes from "prop-types";

const PieChartComponent = ({ values, title, labels, colors }) => {
  const chartRef = useRef(null); // Initialize with null

  useEffect(() => {
    let myChart = null; // Reference to the Chart instance

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy any existing chart instance
      if (myChart) {
        myChart.destroy();
      }

      // Create new chart instance with animation
      myChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Driver Behavior",
              data: values,
              backgroundColor: colors,
              // borderColor: ["black", "black", "black"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          animation: {
            // Configure animation properties
            duration: 4000, // Animation duration in milliseconds
            easing: "easeInOutQuad", // Easing function
          },
          plugins: {
            title: {
              display: true,
              text: title, // Add your title here
            },
          },
          // Add other chart options here if needed
        },
      });
    }

    // Cleanup function to destroy chart when component unmounts
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [values, colors, labels, title]);

  return <canvas ref={chartRef} className="box white-box" />;
};
PieChartComponent.propTypes = {
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  title: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default PieChartComponent;
