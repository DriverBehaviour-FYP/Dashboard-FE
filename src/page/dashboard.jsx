// import React, { useState, useEffect } from "react";

// import Scatter3DComponent from "../component/Scatter3DComponent";
import ScatterComponent from "../component/ScatterComponent";
import CircularProgressComponent from "../component/CircularProgressComponent";
import MetaDataComponent from "../component/MetaDataComponent";
import SummaryComponent from "../component/SummaryComponent";

const dashboard = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <CircularProgressComponent />
        </div>
        <div className="col-md-6">
          <MetaDataComponent />
        </div>
      </div>
      <div className="row pt-5">
        <div className="col-md-6 ">
          <ScatterComponent />
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-4">
          <SummaryComponent />
        </div>
      </div>
    </div>
  );
};

export default dashboard;
