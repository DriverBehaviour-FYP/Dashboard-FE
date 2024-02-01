// import React, { useState, useEffect } from "react";
import "./index.css";
import PropTypes from "prop-types";

const CircularProgressBar = ({ avg, max, min }) => {
  const decimalNumber = (avg / (max - min)) * 360;
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
        <div className="progress-value">{avg.toFixed(4)}</div>
      </div>
    </div>
  );
};
CircularProgressBar.propTypes = {
  avg: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
};
export default CircularProgressBar;
