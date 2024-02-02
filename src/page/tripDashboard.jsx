// import React, { useState, useEffect } from "react";

// import Scatter3DComponent from "../component/Scatter3DComponent";
import CircularProgressComponent from "../component/CircularProgressComponent";
import MetaDataComponent from "../component/MetaDataComponent";
// import SummaryComponent from "../component/SummaryComponent";
// import driverData from "../data/116-driver-graph-data.json";
import driverMetaData from "../data/116-driver-meta-data.json";
import MapComponent from "../component/MapComponent";
import driverSummaryStatics from "../data/116-driver-summary-statics.json";

const TripDashboard = () => {
  return (
    <div className="container light-purpal-box">
      <h1 className="text-center" style={{ color: "#800080" }}>
        Trip Id 116
      </h1>
      <div className="row mt-3">
        <div className="col-md-6 d-flex align-items-stretch">
          <CircularProgressComponent
            summaryStatics={driverSummaryStatics}
            topicName={"driver"}
          />
        </div>
        <div className="col-md-6 d-flex align-items-stretch">
          <MetaDataComponent metaData={driverMetaData} topicName={"driver"} />
        </div>
      </div>
      <div className="row pt-5  mb-3">
        <div className="col-md-2"></div>

        <div className="col-md-8 ">
          <MapComponent />
        </div>
        <div className="col-md-2"></div>
        {/* <div className="col-md-4">
          <SummaryComponent />
        </div> */}
      </div>
    </div>
  );
};

export default TripDashboard;
