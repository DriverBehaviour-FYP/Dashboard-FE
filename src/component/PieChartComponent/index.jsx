import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PieChartComponent = () => {
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
          labels: ["Red", "Blue", "Green"],
          datasets: [
            {
              label: "Driver Behavior",
              data: [12, 19, 3],
              backgroundColor: ["red", "blue", "green"],
              borderColor: ["black", "black", "black"],
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
  }, []);

  return <canvas ref={chartRef} />;
};

export default PieChartComponent;
