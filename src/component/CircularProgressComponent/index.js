import React from "react";
import CircularProgressBar from "./CircularProgress";
const CircularProgressComponent = () => {
  const dataSet = [
    { topic: "Avg Speed", value: 75.5 },
    { topic: "Avg Acc", value: 75.5 },
    { topic: "Std Speed", value: 85.5 },
    { topic: "Std Acc", value: 75.5 },
  ];
  return (
    <div className="container ash-box">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <h2 className="text-center">Summary Statics All Drivers</h2>
        </div>
        <div className="col-md-2"></div>
      </div>
      <div className="row">
        {dataSet &&
          dataSet.map((ele) => (
            <div className="col-md-3">
              <CircularProgressBar endValue={ele.value} />
              <h4 className="text-center">{ele.topic}</h4>
            </div>
          ))}
      </div>
    </div>
  );
};
export default CircularProgressComponent;
