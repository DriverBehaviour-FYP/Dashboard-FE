import { useState } from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

const DateFilterComponent = ({ startDate, endDate, handleDate }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);

  const handleApplyClick = () => {
    handleDate(selectedStartDate, selectedEndDate);
  };

  return (
    <div className="row">
      <div className="col-md-4 pt-2">
        <label htmlFor="start-date" className="form-label">
          Start Date:
        </label>
        <input
          type="date"
          id="start-date"
          onChange={(e) => setSelectedStartDate(e.target.value)}
          value={selectedStartDate}
          min={startDate}
          max={selectedEndDate}
          className="form-control"
          style={{ width: "100%" }}
        />
      </div>
      <div className="col-md-4 pt-2">
        <label htmlFor="end-date" className="form-label">
          End Date:
        </label>
        <input
          type="date"
          id="end-date"
          onChange={(e) => setSelectedEndDate(e.target.value)}
          value={selectedEndDate}
          min={selectedStartDate}
          max={endDate}
          className="form-control"
          style={{ width: "100%" }}
        />
      </div>
      <div className="col-md-4 d-flex align-items-end justify-content-center pt-2">
        <Button
          onClick={handleApplyClick}
          variant="contained"
          color="primary"
          style={{ width: "80%" }}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};
DateFilterComponent.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  handleDate: PropTypes.func.isRequired,
};
export default DateFilterComponent;
