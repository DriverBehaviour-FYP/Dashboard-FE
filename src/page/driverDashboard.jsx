import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ScatterComponent from "../component/ScatterComponent";
import CircularProgressComponent from "../component/CircularProgressComponent";
import MetaDataComponent from "../component/MetaDataComponent";
import LoaderComponent from "../component/LoaderComponent";
import DateFilterComponent from "../component/DateFilterComponent";
import PieChartComponent from "../component/PieChartComponent";
import TabsComponent from "../component/TabsComponent";

import {
  fetchDriverSummary,
  fetchDriverMetadata,
  fetchTripScore,
  fetchDriverDwellTime,
  fetchDriverZoneWiseSpeed,
  fetchDriverSpeedPercentages,
} from "../services/driverServices";
import { fetchAllDriversSummary } from "../services/allDriverServices";

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
  const [driverDwellTimeData, setDriverDwellTimeData] = useState({});
  const [driverSpeedAtZone, setDriverSpeedAtZone] = useState({});
  const [speedPercentages, setSpeedPercentages] = useState({});

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

        const summaryResponse = await fetchDriverSummary(
          id,
          selectedStartDate,
          selectedEndDate
        );
        const allSummaryResponse = await fetchAllDriversSummary(
          selectedStartDate,
          selectedEndDate
        );
        const metadataResponse = await fetchDriverMetadata(
          id,
          selectedStartDate,
          selectedEndDate
        );
        const dwellTimeResponse = await fetchDriverDwellTime(
          id,
          selectedStartDate,
          selectedEndDate
        );
        const speedAtZoneResponse = await fetchDriverZoneWiseSpeed(
          id,
          selectedStartDate,
          selectedEndDate
        );
        const speedPercentagesResponse = await fetchDriverSpeedPercentages(
          id,
          selectedStartDate,
          selectedEndDate
        );

        setDriverDwellTimeData(dwellTimeResponse);
        setDriverSpeedAtZone(speedAtZoneResponse);
        setSpeedPercentages(speedPercentagesResponse);

        const scoreResponse = await fetchTripScore(
          id,
          selectedStartDate,
          selectedEndDate
        );

        setStartDate(metadataResponse["data-collection-start-date"]);
        setEndDate(metadataResponse["data-collection-end-date"]);

        setClusterSummary(summaryResponse["cluster-summary"]);
        setAllClusterSummary(allSummaryResponse["all-cluster-summary"]);

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
        // window.location.href = "/";
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

            <div className="col-md-7">
              <ScatterComponent
                driverData={scores}
                xAxisLabel={"Trips"}
                xAxisName={"trip_id"}
              />
              <div className="row">
                <div className="col-md-4 mt-3">
                  <PieChartComponent
                    values={[
                      allClusterSummary["aggressive"],
                      clusterSummary["aggressive"],
                    ]}
                    title={"Aggressive"}
                    labels={["All", `Driver ${driverId}`]}
                    colors={["red", "blue"]}
                    type={"Driver Behavior"}
                  />
                </div>
                <div className="col-md-4 mt-3">
                  <PieChartComponent
                    values={[
                      allClusterSummary["normal"],
                      clusterSummary["normal"],
                    ]}
                    title={"Normal"}
                    labels={["All", `Driver ${driverId}`]}
                    colors={["red", "blue"]}
                    type={"Driver Behavior"}
                  />
                </div>
                <div className="col-md-4 mt-3">
                  <PieChartComponent
                    values={[allClusterSummary["safe"], clusterSummary["safe"]]}
                    title={"Safe"}
                    labels={["All", `Driver ${driverId}`]}
                    colors={["red", "blue"]}
                    type={"Driver Behavior"}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <PieChartComponent
                values={[
                  clusterSummary["aggressive"],
                  clusterSummary["normal"],
                  clusterSummary["safe"],
                ]}
                title={`Behavior Of Driver ${driverId}`}
                labels={["Aggressive", "Normal", "Safe"]}
                colors={["red", "blue", "green"]}
                type={"Driver Behavior"}
              />
              <br />
              <PieChartComponent
                values={[
                  speedPercentages["higher-than-3rd-quantile"],
                  speedPercentages["between"],
                  speedPercentages["lower-than-1st-quantile"],
                ]}
                title={`Speed Percentages Of Driver ${driverId}`}
                labels={[
                  "Higher Than 3rd Quantile",
                  "Between 1st and 3rd Quantiles",
                  "Lower Than 1st Quantile",
                ]}
                colors={["red", "blue", "green"]}
                type={"Percentage"}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <TabsComponent
              tabs={[
                {
                  label: "Direction 1",
                  driverZoneData: driverSpeedAtZone["direction-1"],
                  driverDwellTimeData: driverDwellTimeData["direction-1"],
                },
                {
                  label: "Direction 2",
                  driverZoneData: driverSpeedAtZone["direction-2"],
                  driverDwellTimeData: driverDwellTimeData["direction-2"],
                },
              ]}
              type="row"
              label="Driver"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DriverDashboard;
