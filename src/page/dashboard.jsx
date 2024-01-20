// import React, { useState, useEffect } from "react";

// import Scatter3DComponent from "../component/Scatter3DComponent";
import ScatterComponent from "../component/ScatterComponent";
import CircularProgressComponent from "../component/CircularProgressComponent";
import MetaDataComponent from "../component/MetaDataComponent";
import SummaryComponent from "../component/SummaryComponent";

const dashboard = () => {
  return (
    <div className="container light-purpal-box">
      <div className="row mt-3">
        <div className="col-md-6 d-flex align-items-stretch">
          <CircularProgressComponent />
        </div>
        <div className="col-md-6 d-flex align-items-stretch">
          <MetaDataComponent />
        </div>
      </div>
      <div className="row pt-5  mb-3">
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
