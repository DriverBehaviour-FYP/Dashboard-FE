import PropTypes from "prop-types";

const MetaDataComponent = ({ metaData, topicName }) => {
  // Sample metadata
  const topic = {
    allDriver: {
      "data-collection-start-date": "Start Date",
      "data-collection-end-date": "End Date",
      "data-collection-period": "Period",
      no_of_bus_stops: "No Of Bus Stops",
      no_of_drivers: "No Of Bus Drivers",
      no_of_trips: "No Of Trips",
    },
    driver: {
      "data-collection-end-date": "End Date",
      "data-collection-start-date": "Start Date",
      "data-collection-period": "Period",
      driver_id: "Driver Id",
      no_of_trips: "No Of Trips",
    },
    trip: {
      date: "Date",
      duration: "Duration",
      "end-time": "End Time",
      "no-segments": "No Of Segments",
      "start-time": "Start Time",
      trip_id: "Trip Id",
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
    <div className="container white-box rounded-2">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <h3 className="text-center">Meta Data</h3>
        </div>
        <div className="col-md-2"></div>
      </div>
      <div className="row mt-3">
        {metaDataDict.map((meta, index) => (
          <div key={index} className="col-md-6 col-lg-3 mb-4 pt-2">
            <div className="box rounded-2 p-2 card h-100">
              <div className="card-body p-2">
                <h3 className="card-text text-center">{meta.value}</h3>
                <p className="card-title text-center">{meta.title}</p>
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
  no_of_bus_stops: PropTypes.number.isRequired,
  no_of_drivers: PropTypes.number.isRequired,
  no_of_trips: PropTypes.number.isRequired,
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
  driver_id: PropTypes.number.isRequired,
  no_of_trips: PropTypes.number.isRequired,
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
  trip_id: PropTypes.number.isRequired,
});

MetaDataComponent.propTypes = {
  metaData: PropTypes.oneOfType([FirstDataType, SecondDataType, TheadDataType])
    .isRequired,
  topicName: PropTypes.string.isRequired,
};
export default MetaDataComponent;
