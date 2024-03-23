import { useState, useEffect } from "react";
import { Tab, Nav } from "react-bootstrap";
import ScatterComponent from "../component/ScatterComponent";
import CircularProgressComponent from "../component/CircularProgressComponent";
import MetaDataComponent from "../component/MetaDataComponent";
import LoaderComponent from "../component/LoaderComponent";
import DateFilterComponent from "../component/DateFilterComponent";
import TabsComponent from "../component/TabsComponent";
import PieChartComponent from "../component/PieChartComponent";

import {
  fetchAllDriversMetadata,
  fetchAllDriversSummary,
  fetchAllDriversScore,
  fetchAllDriversDwellTime,
  fetchAllDriverZoneWiseSpeed,
  fetchDriverList,
} from "../services/allDriverServices";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [activeTab, setActiveTab] = useState(0); // State to hold active tab index
  const [tabs, setTabs] = useState([]);
  const [driverList, setDriverList] = useState([]);
  const [selectedDriverList, setSelecetedDriverList] = useState([]);

  const handleTabSelect = (index) => {
    setActiveTab(index);
  };

  const handleData = (
    _selectedStartDate,
    _selectedEndDate,
    _selectedDriverList
  ) => {
    setSelectedStartDate(_selectedStartDate);
    setSelectedEndDate(_selectedEndDate);
    setSelecetedDriverList(_selectedDriverList);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryResponse = await fetchAllDriversSummary(
          selectedStartDate,
          selectedEndDate,
          selectedDriverList
        );
        const metadataResponse = await fetchAllDriversMetadata(
          selectedStartDate,
          selectedEndDate,
          selectedDriverList
        );
        const dwellTimeResponse = await fetchAllDriversDwellTime(
          selectedStartDate,
          selectedEndDate,
          selectedDriverList
        );
        const speedAtZoneResponse = await fetchAllDriverZoneWiseSpeed(
          selectedStartDate,
          selectedEndDate,
          selectedDriverList
        );
        const scoreResponse = await fetchAllDriversScore(
          selectedStartDate,
          selectedEndDate,
          selectedDriverList
        );

        const driverListResponse = await fetchDriverList();
        setStartDate(metadataResponse["data-collection-start-date"]);
        setEndDate(metadataResponse["data-collection-end-date"]);
        setDriverList(driverListResponse);
        setTabs([
          {
            label: "Overall",
            summaryData: {
              acceleration: summaryResponse["direction-all"]["acceleration"],
              "de-acceleration":
                summaryResponse["direction-all"]["de-acceleration"],
              speed: summaryResponse["direction-all"]["speed"],
              "trip-time": summaryResponse["direction-all"]["trip-time"],
            },
            metadata: {
              "data-collection-start-date":
                metadataResponse["data-collection-start-date"],
              "data-collection-end-date":
                metadataResponse["data-collection-end-date"],
              "data-collection-period":
                metadataResponse["data-collection-period"],
              "no-of-bus-stops":
                metadataResponse["direction-all"]["no-of-bus-stops"],
              "no-of-drivers": metadataResponse["no-of-drivers"],
              "no-of-trips": metadataResponse["direction-all"]["no-of-trips"],
              routes: metadataResponse["routes"],
            },
            scores: {
              scaledScores: scoreResponse["direction-all"]["scaledScores"],
              score: scoreResponse["direction-all"]["score"],
              deviceid: driverListResponse,
            },
            clusterSummary:
              summaryResponse["direction-all"]["all-cluster-summary"],
          },
          {
            label: "Direction 1",
            summaryData: {
              acceleration: summaryResponse["direction-1"]["acceleration"],
              "de-acceleration":
                summaryResponse["direction-1"]["de-acceleration"],
              speed: summaryResponse["direction-1"]["speed"],
              "trip-time": summaryResponse["direction-1"]["trip-time"],
            },
            metadata: {
              "data-collection-start-date":
                metadataResponse["data-collection-start-date"],
              "data-collection-end-date":
                metadataResponse["data-collection-end-date"],
              "data-collection-period":
                metadataResponse["data-collection-period"],
              "no-of-bus-stops":
                metadataResponse["direction-1"]["no-of-bus-stops"],
              "no-of-drivers": metadataResponse["no-of-drivers"],
              "no-of-trips": metadataResponse["direction-1"]["no-of-trips"],
              routes: metadataResponse["routes"],
            },
            scores: {
              scaledScores: scoreResponse["direction-1"]["scaledScores"],
              score: scoreResponse["direction-1"]["score"],
              deviceid: driverListResponse,
            },
            clusterSummary:
              summaryResponse["direction-1"]["all-cluster-summary"],
            allDriverDwellTimeData: dwellTimeResponse["direction-1"],
            allDriverSpeedAtZone: speedAtZoneResponse["direction-1"],
          },
          {
            label: "Direction 2",
            summaryData: {
              acceleration: summaryResponse["direction-2"]["acceleration"],
              "de-acceleration":
                summaryResponse["direction-2"]["de-acceleration"],
              speed: summaryResponse["direction-2"]["speed"],
              "trip-time": summaryResponse["direction-2"]["trip-time"],
            },
            metadata: {
              "data-collection-start-date":
                metadataResponse["data-collection-start-date"],
              "data-collection-end-date":
                metadataResponse["data-collection-end-date"],
              "data-collection-period":
                metadataResponse["data-collection-period"],
              "no-of-bus-stops":
                metadataResponse["direction-2"]["no-of-bus-stops"],
              "no-of-drivers": metadataResponse["no-of-drivers"],
              "no-of-trips": metadataResponse["direction-2"]["no-of-trips"],
              routes: metadataResponse["routes"],
            },
            scores: {
              scaledScores: scoreResponse["direction-2"]["scaledScores"],
              score: scoreResponse["direction-2"]["score"],
              deviceid: driverListResponse,
            },
            clusterSummary:
              summaryResponse["direction-2"]["all-cluster-summary"],
            allDriverDwellTimeData: dwellTimeResponse["direction-2"],
            allDriverSpeedAtZone: speedAtZoneResponse["direction-2"],
          },
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
        window.location.href = "/not-found";
      }
    };

    fetchData();
  }, [selectedStartDate, selectedEndDate, selectedDriverList]);

  return (
    <div className="container light-purpal-box">
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <>
          <br />
          <h1 style={{ color: "blue" }}>All Drivers</h1>
          <DateFilterComponent
            startDate={startDate}
            endDate={endDate}
            handleData={handleData}
            list={driverList}
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
            </Nav>
            <Tab.Content>
              {tabs.map((tab, index) => (
                <Tab.Pane
                  key={index}
                  eventKey={index.toString()} // eventKey should be string
                  active={activeTab === index}
                >
                  <div className="row mt-3">
                    <MetaDataComponent
                      metaData={tab.metadata}
                      topicName={"allDriver"}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-2 ">
                      <CircularProgressComponent
                        summaryStatics={tab.summaryData}
                        topicName={"allDriver"}
                      />
                      {tab.label !== "Overall" && (
                        <PieChartComponent
                          values={[
                            tab.clusterSummary["aggressive"],
                            tab.clusterSummary["normal"],
                            tab.clusterSummary["safe"],
                          ]}
                          title={"Behavior Of All Drivers"}
                          labels={["Aggressive", "Normal", "Safe"]}
                          colors={["red", "blue", "green"]}
                          type={"Driver Behavior"}
                        />
                      )}
                    </div>

                    {tab.label !== "Overall" && (
                      <div className="col-md-10">
                        <ScatterComponent
                          driverData={tab.scores}
                          xAxisLabel={"Drivers"}
                          xAxisName={"deviceid"}
                        />
                        <TabsComponent
                          tabs={[
                            {
                              label: "Driver Speed At Zone",
                              data: tab.allDriverSpeedAtZone,
                              type: "speed",
                            },
                            {
                              label: "Driver DwellTime",
                              data: tab.allDriverDwellTimeData,
                              type: "dwellTime",
                            },
                          ]}
                          label="Driver"
                        />
                      </div>
                    )}
                    {tab.label === "Overall" && (
                      <>
                        <div className="col-md-7">
                          <ScatterComponent
                            driverData={tab.scores}
                            xAxisLabel={"Drivers"}
                            xAxisName={"deviceid"}
                          />
                        </div>
                        <div className="col-md-3">
                          <PieChartComponent
                            values={[
                              tab.clusterSummary["aggressive"],
                              tab.clusterSummary["normal"],
                              tab.clusterSummary["safe"],
                            ]}
                            title={"Behavior Of All Drivers"}
                            labels={["Aggressive", "Normal", "Safe"]}
                            colors={["red", "blue", "green"]}
                            type={"Driver Behavior"}
                          />
                        </div>
                      </>
                    )}
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

export default Dashboard;
