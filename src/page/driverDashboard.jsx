import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ScatterComponent from "../component/ScatterComponent";
import CircularProgressComponent from "../component/CircularProgressComponent";
import MetaDataComponent from "../component/MetaDataComponent";
import LoaderComponent from "../component/LoaderComponent";
import DateFilterComponent from "../component/DateFilterComponent";
import PieChartComponent from "../component/PieChartComponent";
import TabsComponent from "../component/TabsComponent";
import { Tab, Nav } from "react-bootstrap";

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

  const [activeTab, setActiveTab] = useState(0); // State to hold active tab index

  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [tabs, setTabs] = useState([]);
  const handleTabSelect = (index) => {
    setActiveTab(index);
  };

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

        const scoreResponse = await fetchTripScore(
          id,
          selectedStartDate,
          selectedEndDate
        );

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

        setStartDate(metadataResponse["data-collection-start-date"]);
        setEndDate(metadataResponse["data-collection-end-date"]);
        setTabs([
          {
            label: "Overall",
            summaryData: summaryResponse,
            metadata: metadataResponse,
            scores: scoreResponse,
            clusterSummary: summaryResponse["cluster-summary"],
            driverDwellTimeData: dwellTimeResponse["direction-1"],
            driverSpeedAtZone: speedAtZoneResponse["direction-1"],
            speedPercentages: speedPercentagesResponse,
            allClusterSummary: allSummaryResponse["all-cluster-summary"],
          },
          {
            label: "Direction 1",
            summaryData: summaryResponse,
            metadata: metadataResponse,
            scores: scoreResponse,
            clusterSummary: summaryResponse["cluster-summary"],
            driverDwellTimeData: dwellTimeResponse["direction-1"],
            driverSpeedAtZone: speedAtZoneResponse["direction-1"],
            speedPercentages: speedPercentagesResponse,
            allClusterSummary: allSummaryResponse["all-cluster-summary"],
          },
          {
            label: "Direction 2",
            summaryData: summaryResponse,
            metadata: metadataResponse,
            scores: scoreResponse,
            clusterSummary: summaryResponse["cluster-summary"],
            driverDwellTimeData: dwellTimeResponse["direction-1"],
            driverSpeedAtZone: speedAtZoneResponse["direction-1"],
            speedPercentages: speedPercentagesResponse,
            allClusterSummary: allSummaryResponse["all-cluster-summary"],
          },
        ]);
        setIsLoading(false); // Set to false when data fetching is completed

        console.log(summaryResponse);
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
          <br />
          <div className="container-fluid my-2">
            <Nav
              variant="tabs"
              className="justify-content-center"
              activeKey={activeTab.toString()} // activeKey should be string
            >
              {tabs.map((tab, index) => (
                <Nav.Item key={index} className="w-25 text-center">
                  <Nav.Link
                    eventKey={index.toString()} // eventKey should be string
                    active={activeTab === index}
                    onClick={() => handleTabSelect(index)}
                  >
                    {tab.label}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
            <Tab.Content>
              {tabs.map((tab, index) => (
                <Tab.Pane
                  key={index}
                  eventKey={index.toString()} // eventKey should be string
                  active={activeTab === index}
                >
                  <br />
                  <div className="row mt-3">
                    <MetaDataComponent
                      metaData={tab.metadata}
                      topicName={"driver"}
                    />
                  </div>
                  <div className="row">
                    {/* Column for CircularProgressComponent */}
                    <div className="col-md-2">
                      <CircularProgressComponent
                        summaryStatics={tab.summaryData}
                        topicName={"driver"}
                      />
                    </div>

                    <div className="col-md-7">
                      <ScatterComponent
                        driverData={tab.scores}
                        xAxisLabel={"Trips"}
                        xAxisName={"trip_id"}
                      />
                      <div className="row">
                        <div className="col-md-4 mt-3">
                          <PieChartComponent
                            values={[
                              tab.allClusterSummary["aggressive"],
                              tab.clusterSummary["aggressive"],
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
                              tab.allClusterSummary["normal"],
                              tab.clusterSummary["normal"],
                            ]}
                            title={"Normal"}
                            labels={["All", `Driver ${driverId}`]}
                            colors={["red", "blue"]}
                            type={"Driver Behavior"}
                          />
                        </div>
                        <div className="col-md-4 mt-3">
                          <PieChartComponent
                            values={[
                              tab.allClusterSummary["safe"],
                              tab.clusterSummary["safe"],
                            ]}
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
                          tab.clusterSummary["aggressive"],
                          tab.clusterSummary["normal"],
                          tab.clusterSummary["safe"],
                        ]}
                        title={`Behavior`}
                        labels={["Aggressive", "Normal", "Safe"]}
                        colors={["red", "blue", "green"]}
                        type={"Driver Behavior"}
                      />
                      <br />
                      <PieChartComponent
                        values={[
                          tab.speedPercentages["higher-than-3rd-quantile"],
                          tab.speedPercentages["between"],
                          tab.speedPercentages["lower-than-1st-quantile"],
                        ]}
                        title={`Speed Percentages`}
                        labels={[
                          "Higher Than 3Q",
                          "Between 1Q and 3Q",
                          "Lower Than 1Q",
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
                          label: "Driver Speed At Zone",
                          data: tab.driverSpeedAtZone,
                          type: "speed",
                        },
                        {
                          label: "Driver DwellTime",
                          data: tab.driverDwellTimeData,
                          type: "dwellTime",
                        },
                      ]}
                      label="Driver"
                    />
                  </div>
                  <br />
                </Tab.Pane>
              ))}
            </Tab.Content>
          </div>
        </>
      )}
    </div>
  );
};

export default DriverDashboard;
