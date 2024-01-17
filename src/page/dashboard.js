// import React, { useState, useEffect } from "react";

import ScatterComponent from "./../component/ScatterComponent";
import CircularProgressComponent from "./../component/CircularProgressComponent";
import MetaDataComponent from "./../component/MetaDataComponent";

const dashboard = ({ endValue }) => {
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
      <div className="row">
        <ScatterComponent />
      </div>
    </div>
  );
};

export default dashboard;
