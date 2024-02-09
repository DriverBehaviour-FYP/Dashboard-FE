import CircularProgressBar from "./CircularProgress";
import PropTypes from "prop-types";

const CircularProgressComponent = ({ summaryStatics, topicName }) => {
  const topic = {
    allDriver: {
      "trip-time": "Trip Time",
      speed: "Speed",
      "de-acceleration": "Deacceleration",
      acceleration: "Acceleration",
    },
    driver: {
      "trip-time": "Trip Time",
      speed: "Speed",
      "de-acceleration": "Deacceleration",
      acceleration: "Acceleration",
    },
    trip: {
      speed: "Speed",
      "de-acceleration": "Deacceleration",
      acceleration: "Acceleration",
    },
  };
  const unitList = {
    "trip-time": { unit: "min", sup: "" },
    speed: { unit: "ms", sup: "-1" },
    "de-acceleration": { unit: "ms", sup: "-2" },
    acceleration: { unit: "ms", sup: "-2" },
  };
  const dataSet = [];
  Object.entries(topic[topicName]).forEach(([key, value]) => {
    dataSet.push({
      topic: value,
      avg: summaryStatics[key]["avg"],
      max: summaryStatics[key]["max"],
      // min: summaryStatics[key]["min"],
      min: 0,
      unit: unitList[key]["unit"],
      sup: unitList[key]["sup"],
    });
  });

  return (
    <div className="">
      <div className="row">
        <div className="col">
          {/* <h3 className="text-left">Summary Statics</h3> */}
        </div>
        {/* <div className="col-md-2"></div> */}
      </div>
      <div className="col">
        {dataSet &&
          dataSet.map((ele, index) => (
            <div
              className="d-flex flex-column align-items-center mb-4 box rounded-2 pb-2 card h-100"
              key={index}
              style={{ borderBottom: "5px solid blue" }}
            >
              <h6 className="text-center">{ele.topic}</h6>
              <CircularProgressBar
                avg={ele.avg}
                min={ele.min}
                max={ele.max}
                unit={ele.unit}
                sup={ele.sup}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
const FirstDataType = PropTypes.shape({
  acceleration: PropTypes.shape({
    avg: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    // min: PropTypes.number.isRequired,
  }).isRequired,
  "de-acceleration": PropTypes.shape({
    avg: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    // min: PropTypes.number.isRequired,
  }).isRequired,
  "driver-id": PropTypes.number.isRequired,
  speed: PropTypes.shape({
    avg: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    // min: PropTypes.number.isRequired,
  }).isRequired,
  success: PropTypes.bool.isRequired,
  "trip-time": PropTypes.shape({
    avg: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
  }).isRequired,
});
const SecondDataType = PropTypes.shape({
  acceleration: PropTypes.shape({
    avg: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    // min: PropTypes.number.isRequired,
  }).isRequired,
  "de-acceleration": PropTypes.shape({
    avg: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    // min: PropTypes.number.isRequired,
  }).isRequired,
  speed: PropTypes.shape({
    avg: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    // min: PropTypes.number.isRequired,
  }).isRequired,
  success: PropTypes.bool.isRequired,
  "trip-time": PropTypes.shape({
    avg: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
  }).isRequired,
});
const TheadDataType = PropTypes.shape({
  acceleration: PropTypes.shape({
    avg: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
  }).isRequired,
  "de-acceleration": PropTypes.shape({
    avg: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
  }).isRequired,
  speed: PropTypes.shape({
    avg: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
  }).isRequired,
  success: PropTypes.bool.isRequired,
});
CircularProgressComponent.propTypes = {
  summaryStatics: PropTypes.oneOfType([
    FirstDataType,
    SecondDataType,
    TheadDataType,
  ]).isRequired,
  topicName: PropTypes.string.isRequired,
};
export default CircularProgressComponent;
