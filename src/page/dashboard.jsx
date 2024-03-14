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
} from "../services/allDriverServices";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [activeTab, setActiveTab] = useState(0); // State to hold active tab index
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
        const summaryResponse = await fetchAllDriversSummary(
          selectedStartDate,
          selectedEndDate
        );
        const metadataResponse = await fetchAllDriversMetadata(
          selectedStartDate,
          selectedEndDate
        );
        const dwellTimeResponse = await fetchAllDriversDwellTime(
          selectedStartDate,
          selectedEndDate
        );
        const speedAtZoneResponse = await fetchAllDriverZoneWiseSpeed(
          selectedStartDate,
          selectedEndDate
        );
        const scoreResponse = await fetchAllDriversScore(
          selectedStartDate,
          selectedEndDate
        );

        setStartDate(metadataResponse["data-collection-start-date"]);
        setEndDate(metadataResponse["data-collection-end-date"]);

        setTabs([
          {
            label: "Overall",
            summaryData: summaryResponse,
            metadata: metadataResponse,
            scores: scoreResponse,
            clusterSummary: summaryResponse["all-cluster-summary"],
            allDriverDwellTimeData: dwellTimeResponse["direction-1"],
            allDriverSpeedAtZone: speedAtZoneResponse["direction-1"],
          },
          {
            label: "Direction 1",
            summaryData: summaryResponse,
            metadata: metadataResponse,
            scores: scoreResponse,
            clusterSummary: summaryResponse["all-cluster-summary"],
            allDriverDwellTimeData: dwellTimeResponse["direction-1"],
            allDriverSpeedAtZone: speedAtZoneResponse["direction-1"],
          },
          {
            label: "Direction 2",
            summaryData: summaryResponse,
            metadata: metadataResponse,
            scores: scoreResponse,
            clusterSummary: summaryResponse["all-cluster-summary"],
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
  }, [selectedStartDate, selectedEndDate]);

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
            handleDate={handleDate}
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
