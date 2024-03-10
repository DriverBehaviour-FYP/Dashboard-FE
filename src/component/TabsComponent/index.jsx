import { useState } from "react";
import PropTypes from "prop-types";
import { Tab, Nav } from "react-bootstrap";
// import ScatterComponent from "../ScatterComponent";
import LineGraphComponent from "../LineGraphComponent";

const TabsComponent = ({ tabs, type, label }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabSelect = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="container-fluid my-2">
      <Nav
        variant="tabs"
        className="justify-content-center"
        defaultActiveKey={0}
      >
        {tabs.map((tab, index) => (
          <Nav.Item key={index} className="w-50">
            <Nav.Link
              eventKey={index}
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
          <Tab.Pane key={index} eventKey={index} active={activeTab === index}>
            <br />
            {type === "row" && (
              <div className="row">
                <div className="col-6">
                  <LineGraphComponent
                    graphData={tab.driverDwellTimeData}
                    label={label}
                  />
                </div>
                <div className="col-6">
                  <LineGraphComponent
                    graphData={tab.driverDwellTimeData}
                    label={label}
                  />
                </div>
              </div>
            )}
            {type === "col" && (
              <div>
                <LineGraphComponent
                  graphData={tab.driverDwellTimeData}
                  label={label}
                />
                <br />
                <LineGraphComponent
                  graphData={tab.driverDwellTimeData}
                  label={label}
                />
              </div>
            )}
          </Tab.Pane>
        ))}
      </Tab.Content>
    </div>
  );
};

TabsComponent.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      driverDwellTimeData: PropTypes.arrayOf(
        PropTypes.shape({
          driverId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
          dwellTimes: PropTypes.arrayOf(
            PropTypes.shape({
              average_dwell_time: PropTypes.number.isRequired,
              bus_stop_no: PropTypes.number.isRequired,
            })
          ).isRequired,
        })
      ).isRequired,
      driverZoneData: PropTypes.arrayOf(
        PropTypes.shape({
          driverId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
          dwellTimes: PropTypes.arrayOf(
            PropTypes.shape({
              average_dwell_time: PropTypes.number.isRequired,
              bus_stop_no: PropTypes.number.isRequired,
            })
          ).isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TabsComponent;
