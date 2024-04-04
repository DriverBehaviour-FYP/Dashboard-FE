import { useState } from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const DateFilterComponent = ({
  startDate,
  endDate,
  handleData,
  list,
  type,
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleApplyClick = () => {
    handleData(selectedStartDate, selectedEndDate, selectedItems);
  };

  const handleSelectionChange = (e) => {
    const selectedOption = e.target.value;
    if (!selectedItems.includes(selectedOption)) {
      setSelectedItems([...selectedItems, selectedOption]);
    }
  };

  const handleRemoveItem = (itemToRemove) => {
    setSelectedItems(selectedItems.filter((item) => item !== itemToRemove));
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
      <div className="row">
        <div className="col-md-4 pt-2">
          <Form.Label>Select multiple {type}:</Form.Label>
          <Form.Select multiple onChange={handleSelectionChange}>
            {list.map((element, index) => (
              <option value={element} key={index}>
                {element}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="col-md-5 pt-5">
          {/* {selectedItems.length == 0 && <h3>Selected {type}:</h3>} */}
          <div className="d-flex flex-wrap">
            {selectedItems.map((item) => (
              <div key={item} className="me-2 mb-2">
                <span className="badge bg-primary me-2">
                  {item}{" "}
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveItem(item);
                    }}
                    className="btn-close"
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "white",
                      padding: "5px",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    &times;
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

DateFilterComponent.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleData: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default DateFilterComponent;
