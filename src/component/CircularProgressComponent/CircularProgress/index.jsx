// import React, { useState, useEffect } from "react";
import "./index.css";
import PropTypes from "prop-types";

const CircularProgressBar = ({ endValue }) => {
  const decimalNumber = (endValue / 100) * 360;
  const rotationDegree = Math.floor(decimalNumber);
  const leftDegree = rotationDegree > 180 ? rotationDegree - 180 : 0;
  const rightDegree = rotationDegree > 180 ? 180 : rotationDegree;

  return (
    <div>
      <div className="progress green">
        <span className="progress-left">
          <span className={`progress-bar progress-left-${leftDegree}`}></span>
        </span>
        <span className="progress-right ">
          <span className={`progress-bar progress-right-${rightDegree}`}></span>
        </span>
        <div className="progress-value">{endValue}%</div>
      </div>
    </div>
  );
};
CircularProgressBar.propTypes = {
  endValue: PropTypes.number.isRequired,
};
export default CircularProgressBar;
