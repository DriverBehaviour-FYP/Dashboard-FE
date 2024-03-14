import { useState } from "react";
import PropTypes from "prop-types";
import { Tab, Nav } from "react-bootstrap";
// import ScatterComponent from "../ScatterComponent";
import LineGraphComponent from "../LineGraphComponent";

const TabsComponent = ({ tabs, label }) => {
  const [activeTab, setActiveTab] = useState(0);
  // tabs.map((tab, index) => {
  //   console.log(tab.data);
  //   console.log(tab.type);
  //   console.log(index);
  // });
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
            <LineGraphComponent
              graphData={tab.data}
              label={label}
              type={tab.type}
            />
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
      type: PropTypes.string.isRequired,

      data: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.shape({
            driverId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
              .isRequired,
            dwellTimes: PropTypes.arrayOf(
              PropTypes.shape({
                average_dwell_time: PropTypes.number.isRequired,
                bus_stop_no: PropTypes.number.isRequired,
              })
            ).isRequired,
          }),
          PropTypes.shape({
            driverId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
              .isRequired,
            speeds: PropTypes.arrayOf(
              PropTypes.shape({
                average_speed: PropTypes.number.isRequired,
                zone: PropTypes.number.isRequired,
              })
            ).isRequired,
          }),
        ])
      ).isRequired,
    })
  ).isRequired,
  label: PropTypes.string.isRequired,
};

export default TabsComponent;
