import CircularProgressBar from "./CircularProgress";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

const CircularProgressComponent = ({ summaryStatics, topicName }) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 775 });
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
    <div className="row justify-content-between mx-1">
      {dataSet &&
        dataSet.map((ele, index) => (
          <div
            key={index}
            className={`${isSmallScreen ? "col-5" : ""} box white-box mb-3`} // Show 2 circles per row on small screens, and 3 circles per row otherwise
            style={{
              borderBottom: "5px solid blue",
              // margin: "20px",
              width: "200px",
            }}
          >
            <div className="d-flex flex-column align-items-center rounded-2 ">
              <h6 className="text-center">{ele.topic}</h6>
              <CircularProgressBar
                avg={ele.avg}
                min={ele.min}
                max={ele.max}
                unit={ele.unit}
                sup={ele.sup}
              />
            </div>
          </div>
        ))}
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
