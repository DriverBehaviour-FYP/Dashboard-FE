import CircularProgressBar from "./CircularProgress";
const CircularProgressComponent = () => {
  const dataSet = [
    { topic: "Avg Speed", value: 75.5 },
    { topic: "Avg Acc", value: 75.5 },
    { topic: "Std Speed", value: 85.5 },
    { topic: "Std Acc", value: 75.5 },
  ];
  return (
    <div className="container white-box rounded-2">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <h3 className="text-center">Summary Statics</h3>
          <h6 className="text-center" style={{ color: "#800080" }}>
            All Drivers
          </h6>
        </div>
        <div className="col-md-2"></div>
      </div>
      <div className="row">
        {dataSet &&
          dataSet.map((ele, index) => (
            <div className="col-xl-3" key={index}>
              <CircularProgressBar endValue={ele.value} />
              <h6 className="text-center">{ele.topic}</h6>
            </div>
          ))}
      </div>
    </div>
  );
};
export default CircularProgressComponent;
