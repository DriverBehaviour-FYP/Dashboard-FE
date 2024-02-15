import { useState, useEffect } from "react";
import ScatterComponent from "../component/ScatterComponent";
import CircularProgressComponent from "../component/CircularProgressComponent";
import MetaDataComponent from "../component/MetaDataComponent";
import LoaderComponent from "../component/LoaderComponent";
import DateFilterComponent from "../component/DateFilterComponent";
// import summaryJson from "../data/all-driver-summary-statics.json";
// import metaDataJson from "../data/all-driver-meta-data.json";

import {
  fetchAllDriversMetadata,
  fetchAllDriversSummary,
  fetchAllDriversScore,
} from "../services/allDriverServices";
import PieChartComponent from "../component/PieChartComponent";

const Dashboard = () => {
  const [summaryData, setSummaryData] = useState({});
  const [metadata, setMetadata] = useState({});
  const [scores, setScores] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loader
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [clusterSummary, setClusterSummary] = useState({});

  const handleDate = (_selectedStartDate, _selectedEndDate) => {
    setSelectedStartDate(_selectedStartDate);
    setSelectedEndDate(_selectedEndDate);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryResponse = await fetchAllDriversSummary(
          selectedStartDate,
          selectedEndDate
        );
        const metadataResponse = await fetchAllDriversMetadata(
          selectedStartDate,
          selectedEndDate
        );
        // const summaryResponse = summaryJson;
        // const metadataResponse = metaDataJson;

        const scoreResponse = await fetchAllDriversScore();

        setStartDate(metadataResponse["data-collection-start-date"]);
        setEndDate(metadataResponse["data-collection-end-date"]);

        setClusterSummary(summaryResponse["all-cluster-summary"]);

        const newSummaryResponse = {};
        const newMetadataResponse = {};
        // Iterate over properties of the original object and copy desired properties to the new object
        for (const key in summaryResponse) {
          if (
            key !== "cluster-summary" &&
            key !== "selected-start-date" &&
            key !== "selected-end-date" &&
            key !== "start-date" &&
            key !== "end-date"
          ) {
            newSummaryResponse[key] = summaryResponse[key];
          }
        }
        for (const key in metadataResponse) {
          if (key !== "selected-start-date" && key !== "selected-end-date") {
            newMetadataResponse[key] = metadataResponse[key];
          }
        }
        setSummaryData(newSummaryResponse);
        setMetadata(newMetadataResponse);
        setScores(scoreResponse);
        setIsLoading(false); // Set to false when data fetching is completed
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
        window.location.href = "/not-found";
      }
    };

    fetchData();
  }, [selectedStartDate, selectedEndDate]);

  return (
    <div className="container light-purpal-box">
      {isLoading ? ( // Show loader when isLoading is true
        <LoaderComponent />
      ) : (
        <>
          <br />
          <h1 style={{ color: "blue" }}>All Drivers</h1>
          <DateFilterComponent
            startDate={startDate}
            endDate={endDate}
            handleDate={handleDate}
          />
          <div className="row mt-3">
            <MetaDataComponent metaData={metadata} topicName={"allDriver"} />
          </div>
          <div className="row">
            {/* Column for CircularProgressComponent */}
            <div className="col-md-2 ">
              <CircularProgressComponent
                summaryStatics={summaryData}
                topicName={"allDriver"}
              />
            </div>

            <div className="col-md-7">
              <ScatterComponent
                driverData={scores}
                xAxisLabel={"Drivers"}
                xAxisName={"deviceid"}
              />
            </div>
            <div className="col-md-3">
              <PieChartComponent
                values={[
                  clusterSummary["aggressive"],
                  clusterSummary["normal"],
                  clusterSummary["safe"],
                ]}
                title={"Behavior Of All Drivers"}
                labels={["Aggressive", "Normal", "Safe"]}
                colors={["red", "blue", "green"]}
              />
            </div>
          </div>

          <br />
        </>
      )}
    </div>
  );
};

export default Dashboard;
