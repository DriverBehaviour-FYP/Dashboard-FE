// import React, { useState, useEffect } from "react";

// import Scatter3DComponent from "../component/Scatter3DComponent";
import ScatterComponent from "../component/ScatterComponent";
import CircularProgressComponent from "../component/CircularProgressComponent";
import MetaDataComponent from "../component/MetaDataComponent";
// import SummaryComponent from "../component/SummaryComponent";
import driversData from "../data/all-driver-graph-data.json";
import driversSummaryStatics from "../data/all-driver-summary-statics.json";
import driversMetaData from "../data/all-driver-meta-data.json";

const dashboard = () => {
  return (
    <div className="container light-purpal-box">
      <div className="row mt-3">
        <div className="col-md-6 d-flex align-items-stretch">
          <CircularProgressComponent
            summaryStatics={driversSummaryStatics}
            topicName={"allDriver"}
          />
        </div>
        <div className="col-md-6 d-flex align-items-stretch">
          <MetaDataComponent
            metaData={driversMetaData}
            topicName={"allDriver"}
          />
        </div>
      </div>
      <div className="row pt-5  mb-3">
        <div className="col-md-2"></div>
        <div className="col-md-8 ">
          <ScatterComponent
            driverData={driversData}
            xAxisLabel={"Device Id"}
            xAxisName={"deviceid"}
          />
        </div>
        <div className="col-md-2"></div>
        {/* <div className="col-md-4">
          <SummaryComponent />
        </div> */}
      </div>
    </div>
  );
};

export default dashboard;
