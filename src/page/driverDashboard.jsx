import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ScatterComponent from "../component/ScatterComponent";
import CircularProgressComponent from "../component/CircularProgressComponent";
import MetaDataComponent from "../component/MetaDataComponent";
import LoaderComponent from "../component/LoaderComponent";
import DateFilterComponent from "../component/DateFilterComponent";
import PieChartComponent from "../component/PieChartComponent";
import summaryJson from "../data/116-driver-summary-statics.json";
import metaDataJson from "../data/116-driver-meta-data.json";

import {
  // fetchDriverSummary,
  // fetchDriverMetadata,
  fetchTripScore,
} from "../services/driverServices";

const DriverDashboard = () => {
  const { driverId } = useParams();
  const [summaryData, setSummaryData] = useState({});
  const [metadata, setMetadata] = useState({});
  const [scores, setScores] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [clusterSummary, setClusterSummary] = useState({});
  const [allClusterSummary, setAllClusterSummary] = useState({});

  const handleDate = (_selectedStartDate, _selectedEndDate) => {
    setSelectedStartDate(_selectedStartDate);
    setSelectedEndDate(_selectedEndDate);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = parseInt(driverId); // Parse to integer
        if (isNaN(id)) {
          window.location.href = "/not-found";
          return;
        }

        // const summaryResponse = await fetchDriverSummary(
        //   id,
        //   selectedStartDate,
        //   selectedEndDate
        // );
        // const metadataResponse = await fetchDriverMetadata(
        //   id,
        //   selectedStartDate,
        //   selectedEndDate
        // );
        const summaryResponse = summaryJson;
        const metadataResponse = metaDataJson;

        const scoreResponse = await fetchTripScore(id);

        setStartDate(summaryResponse["start-date"]);
        setEndDate(summaryResponse["end-date"]);

        setClusterSummary(summaryResponse["cluster-summary"]);
        setAllClusterSummary(summaryResponse["all-cluster-summary"]);
        const newSummaryResponse = {};
        const newMetadataResponse = {};
        // Iterate over properties of the original object and copy desired properties to the new object
        for (const key in summaryResponse) {
          if (
            key !== "cluster-summary" &&
            key !== "all-cluster-summary" &&
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
            newMetadataResponse[key] = metaDataJson[key];
          }
        }
        setSummaryData(newSummaryResponse);
        setMetadata(newMetadataResponse);
        setScores(scoreResponse);
        setIsLoading(false); // Set to false when data fetching is completed
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
        window.location.href = "/";
      }
    };

    fetchData();
  }, [driverId, selectedStartDate, selectedEndDate]);

  return (
    <div className="container light-purpal-box">
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <>
          <br />
          <h1 style={{ color: "blue" }}>Driver Id {driverId}</h1>
          <DateFilterComponent
            startDate={startDate}
            endDate={endDate}
            handleDate={handleDate}
          />

          <div className="row mt-3">
            <MetaDataComponent metaData={metadata} topicName={"driver"} />
          </div>
          <div className="row">
            {/* Column for CircularProgressComponent */}
            <div className="col-md-2">
              <CircularProgressComponent
                summaryStatics={summaryData}
                topicName={"driver"}
              />
            </div>
            <div className="col-md-1"></div>
            {/* Column for MapComponent */}
            <div className="col-md-9">
              <ScatterComponent
                driverData={scores}
                xAxisLabel={"Trips"}
                xAxisName={"trip_id"}
                driverId={parseInt(driverId)}
              />
              <br />
              <div className="row">
                <div className="col-md-3 mt-5">
                  <PieChartComponent
                    values={[
                      allClusterSummary["aggressive"],
                      clusterSummary["aggressive"],
                    ]}
                    title={"Aggressive"}
                    labels={["All", `${driverId}`]}
                    colors={["red", "blue"]}
                  />
                </div>
                <div className="col-md-3 mt-5">
                  <PieChartComponent
                    values={[
                      allClusterSummary["normal"],
                      clusterSummary["normal"],
                    ]}
                    title={"Normal"}
                    labels={["All", `${driverId}`]}
                    colors={["red", "blue"]}
                  />
                </div>
                <div className="col-md-3 mt-5">
                  <PieChartComponent
                    values={[allClusterSummary["safe"], clusterSummary["safe"]]}
                    title={"Safe"}
                    labels={["All", `${driverId}`]}
                    colors={["red", "blue"]}
                  />
                </div>
                <div className="col-md-3 mt-5">
                  <PieChartComponent
                    values={[
                      clusterSummary["aggressive"],
                      clusterSummary["normal"],
                      clusterSummary["safe"],
                    ]}
                    title={`Behavior Of Driver ${driverId}`}
                    labels={["Aggressive", "Normal", "Safe"]}
                    colors={["red", "blue", "green"]}
                  />
                </div>
              </div>
            </div>
          </div>
          <br />
        </>
      )}
    </div>
  );
};

export default DriverDashboard;
