import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

const MetaDataComponent = ({ metaData, topicName }) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 775 });

  // Sample metadata
  const topic = {
    allDriver: {
      // "data-collection-start-date": "Start Date (Data Collection)",
      // "data-collection-end-date": "End Date (Data Collection)",
      "data-collection-period": "Period (Data Collection)",
      "no-of-bus-stops": "No Of Bus Stops",
      "no-of-drivers": "No Of Bus Drivers",
      "no-of-trips": "No Of Trips",
    },
    driver: {
      "data-collection-start-date": "Start Date (Data Collection)",
      "data-collection-end-date": "End Date (Data Collection)",
      "data-collection-period": "Period (Data Collection)",
      // driver_id: "Driver Id",
      "no-of-trips": "No Of Trips",
    },
    trip: {
      date: "Date",
      "start-time": "Start Time",
      "end-time": "End Time",
      duration: "Duration",
      "no-segments": "No Of Segments",
      // trip_id: "Trip Id",
    },
  };
  const metaDataDict = [];
  Object.entries(topic[topicName]).forEach(([key, value]) => {
    metaDataDict.push({
      title: value,
      value: metaData[key],
    });
  });

  return (
    <div className="rounded-2">
      <div className="row mt-3 justify-content-between">
        {metaDataDict.map((meta, index) => (
          <div
            key={index}
            className={`${isSmallScreen ? "col-6" : "col"}  mb-4`}
          >
            <div
              className="box rounded-2 pb-2 card h-100"
              style={{ borderBottom: "5px solid blue" }}
            >
              <div className="card-body p-2">
                <p className="card-title text-left font-weight-bold">
                  {meta.title}
                </p>
                <div className="row">
                  <div className="col">
                    <h3 className="card-text text-center">{meta.value}</h3>
                  </div>
                  {meta.title === "Period (Data Collection)" && (
                    <div className="col pt-2">
                      <p>Days</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const FirstDataType = PropTypes.shape({
  "data-collection-start-date": PropTypes.string.isRequired,
  "data-collection-end-date": PropTypes.string.isRequired,
  "data-collection-period": PropTypes.number.isRequired,
  "no-of-bus-stops": PropTypes.number.isRequired,
  "no-of-drivers": PropTypes.number.isRequired,
  "no-of-trips": PropTypes.number.isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      "terminal-1": PropTypes.string.isRequired,
      "terminal-2": PropTypes.string.isRequired,
    })
  ).isRequired,
  success: PropTypes.bool.isRequired,
});
const SecondDataType = PropTypes.shape({
  "data-collection-start-date": PropTypes.string.isRequired,
  "data-collection-end-date": PropTypes.string.isRequired,
  "data-collection-period": PropTypes.number.isRequired,
  "driver-id": PropTypes.number.isRequired,
  "no-of-trips": PropTypes.number.isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      "terminal-1": PropTypes.string.isRequired,
      "terminal-2": PropTypes.string.isRequired,
    })
  ).isRequired,
  success: PropTypes.bool.isRequired,
});
const TheadDataType = PropTypes.shape({
  date: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  "end-time": PropTypes.string.isRequired,
  "no-segments": PropTypes.number.isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      "terminal-1": PropTypes.string.isRequired,
      "terminal-2": PropTypes.string.isRequired,
    })
  ).isRequired,
  "start-time": PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired,
  "trip-id": PropTypes.number.isRequired,
});

MetaDataComponent.propTypes = {
  metaData: PropTypes.oneOfType([FirstDataType, SecondDataType, TheadDataType])
    .isRequired,
  topicName: PropTypes.string.isRequired,
};
export default MetaDataComponent;
