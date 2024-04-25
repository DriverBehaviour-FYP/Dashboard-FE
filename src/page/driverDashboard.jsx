import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ScatterComponent from "../component/ScatterComponent";
import CircularProgressComponent from "../component/CircularProgressComponent";
import MetaDataComponent from "../component/MetaDataComponent";
import LoaderComponent from "../component/LoaderComponent";
import DateFilterComponent from "../component/DateFilterComponent";
import PieChartComponent from "../component/PieChartComponent";
import TabsComponent from "../component/TabsComponent";
import SpinnerComponent from "../component/SpinnerComponent";
import { Tab, Nav } from "react-bootstrap";

import {
  fetchDriverSummary,
  fetchDriverMetadata,
  fetchTripScore,
  fetchDriverDwellTime,
  fetchDriverZoneWiseSpeed,
  fetchDriverSpeedPercentages,
  fetchTripList,
} from "../services/driverServices";
import { fetchAllDriversSummary } from "../services/allDriverServices";

const DriverDashboard = () => {
  const { driverId } = useParams();

  const [activeTab, setActiveTab] = useState(0); // State to hold active tab index
  const [isApply, setIsApply] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [tabs, setTabs] = useState([]);
  const [tripList, setTripList] = useState([]);
  const [selectedTripList, setSelecetedTripList] = useState([]);

  const handleTabSelect = (index) => {
    setActiveTab(index);
  };

  const handleData = (
    _selectedStartDate,
    _selectedEndDate,
    _selectedTripList
  ) => {
    setSelectedStartDate(_selectedStartDate);
    setSelectedEndDate(_selectedEndDate);
    setSelecetedTripList(_selectedTripList.map((str) => parseInt(str)));
    setIsApply(true);
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
          selectedEndDate,
          selectedTripList
        );
        const allSummaryResponse = await fetchAllDriversSummary(
          selectedStartDate,
          selectedEndDate,
          []
        );
        const metadataResponse = await fetchDriverMetadata(
          id,
          selectedStartDate,
          selectedEndDate,
          selectedTripList
        );
        const dwellTimeResponse = await fetchDriverDwellTime(
          id,
          selectedStartDate,
          selectedEndDate,
          selectedTripList
        );
        const speedAtZoneResponse = await fetchDriverZoneWiseSpeed(
          id,
          selectedStartDate,
          selectedEndDate,
          selectedTripList
        );
        const speedPercentagesResponse = await fetchDriverSpeedPercentages(
          id,
          selectedStartDate,
          selectedEndDate,
          selectedTripList
        );

        const scoreResponse = await fetchTripScore(
          id,
          selectedStartDate,
          selectedEndDate,
          selectedTripList
        );
        const tripListResponse = await fetchTripList(id);

        setStartDate(metadataResponse["data-collection-start-date"]);
        setEndDate(metadataResponse["data-collection-end-date"]);
        setTripList(tripListResponse);
        setTabs([
          {
            label: "Overall",
            summaryData: {
              acceleration: summaryResponse["direction-all"]["acceleration"],
              "de-acceleration":
                summaryResponse["direction-all"]["de-acceleration"],
              speed: summaryResponse["direction-all"]["speed"],
              "trip-time": summaryResponse["direction-all"]["trip-time"],
              "driver-id": summaryResponse["driver-id"],
            },
            metadata: {
              "data-collection-start-date":
                metadataResponse["data-collection-start-date"],
              "data-collection-end-date":
                metadataResponse["data-collection-end-date"],
              "data-collection-period":
                metadataResponse["data-collection-period"],
              "driver-id": metadataResponse["driver-id"],
              "no-of-trips": metadataResponse["direction-all"]["no-of-trips"],
              routes: metadataResponse["routes"],
            },
            scores: {
              scaledScores: scoreResponse["scaledScores"],
              score: scoreResponse["score"],
              tripid: tripListResponse,
            },
            clusterSummary: summaryResponse["direction-all"]["cluster-summary"],
            speedPercentages: speedPercentagesResponse["direction-all"],
            allClusterSummary:
              allSummaryResponse["direction-all"]["all-cluster-summary"],
          },
          {
            label: "Direction 1",
            summaryData: {
              acceleration: summaryResponse["direction-1"]["acceleration"],
              "de-acceleration":
                summaryResponse["direction-1"]["de-acceleration"],
              speed: summaryResponse["direction-1"]["speed"],
              "trip-time": summaryResponse["direction-1"]["trip-time"],
              "driver-id": summaryResponse["driver-id"],
            },
            metadata: {
              "data-collection-start-date":
                metadataResponse["data-collection-start-date"],
              "data-collection-end-date":
                metadataResponse["data-collection-end-date"],
              "data-collection-period":
                metadataResponse["data-collection-period"],
              "driver-id": metadataResponse["driver-id"],
              "no-of-trips": metadataResponse["direction-1"]["no-of-trips"],
              routes: metadataResponse["routes"],
            },
            scores: {
              scaledScores: scoreResponse["scaledScores"],
              score: scoreResponse["score"],
              tripid: tripListResponse,
            },
            clusterSummary: summaryResponse["direction-1"]["cluster-summary"],
            driverDwellTimeData: dwellTimeResponse["direction-1"],
            driverSpeedAtZone: speedAtZoneResponse["direction-1"],
            speedPercentages: speedPercentagesResponse["direction-1"],
            allClusterSummary:
              allSummaryResponse["direction-1"]["all-cluster-summary"],
          },
          {
            label: "Direction 2",
            summaryData: {
              acceleration: summaryResponse["direction-2"]["acceleration"],
              "de-acceleration":
                summaryResponse["direction-2"]["de-acceleration"],
              speed: summaryResponse["direction-2"]["speed"],
              "trip-time": summaryResponse["direction-2"]["trip-time"],
              "driver-id": summaryResponse["driver-id"],
            },
            metadata: {
              "data-collection-start-date":
                metadataResponse["data-collection-start-date"],
              "data-collection-end-date":
                metadataResponse["data-collection-end-date"],
              "data-collection-period":
                metadataResponse["data-collection-period"],
              "driver-id": metadataResponse["driver-id"],
              "no-of-trips": metadataResponse["direction-2"]["no-of-trips"],
              routes: metadataResponse["routes"],
            },
            scores: {
              scaledScores: scoreResponse["scaledScores"],
              score: scoreResponse["score"],
              tripid: tripListResponse,
            },
            clusterSummary: summaryResponse["direction-2"]["cluster-summary"],
            driverDwellTimeData: dwellTimeResponse["direction-2"],
            driverSpeedAtZone: speedAtZoneResponse["direction-2"],
            speedPercentages: speedPercentagesResponse["direction-2"],
            allClusterSummary:
              allSummaryResponse["direction-2"]["all-cluster-summary"],
          },
        ]);
        setIsLoading(false); // Set to false when data fetching is completed
        setIsApply(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
        window.location.href = "/";
      }
    };

    fetchData();
  }, [driverId, selectedStartDate, selectedEndDate, selectedTripList]);

  return (
    <div className="container light-purpal-box">
      {isApply && <SpinnerComponent />}

      {isLoading ? (
        <LoaderComponent />
      ) : (
        <>
          <br />
          <h1 style={{ color: "blue" }}>Driver Id {driverId}</h1>
          <DateFilterComponent
            startDate={startDate}
            endDate={endDate}
            handleData={handleData}
            list={tripList}
            type={"trips"}
          />
          <br />
          <div className="container-fluid my-2">
            <Nav
              variant="tabs"
              className="nav nav-tabs justify-content-center"
              activeKey={activeTab.toString()}
            >
              {tabs.map((tab, index) => (
                <Nav.Item key={index} className="nav-item w-25  text-center">
                  <Nav.Link
                    eventKey={index.toString()}
                    className={`nav-link ${
                      activeTab === index ? "active" : ""
                    }`}
                    onClick={() => handleTabSelect(index)}
                  >
                    {tab.label}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>{" "}
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
                        xAxisName={"tripid"}
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
                  {tab.label !== "Overall" && (
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
                  )}
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
