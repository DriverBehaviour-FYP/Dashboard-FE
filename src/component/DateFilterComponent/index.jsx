import { useState } from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const DateFilterComponent = ({
  startDate,
  endDate,
  handleDate,
  handleDrivers,
  list,
}) => {
  console.log(list);
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleApplyClick = () => {
    handleDate(selectedStartDate, selectedEndDate);
    handleDrivers(selectedItems);
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
          <Form.Label>Select multiple items:</Form.Label>
          <Form.Select multiple onChange={handleSelectionChange}>
            {list.map((element, index) => (
              <option value={element} key={index}>
                {element}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="col-md-4 pt-2">
          <h2>Selected Items:</h2>
          <ul className="list-group">
            {selectedItems.map((item) => (
              <li
                key={item}
                className="list-group-item d-flex justify-content-between align-items-center"
                onClick={() => handleRemoveItem(item)}
              >
                {item}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveItem(item);
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

DateFilterComponent.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleDate: PropTypes.func.isRequired,
  handleDrivers: PropTypes.func.isRequired,
};

export default DateFilterComponent;
