import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SummaryComponent = () => {
  const [selectedOption, setSelectedOption] = useState("Option 1");
  const [data, setData] = useState({});
  const [selectedOptionData, setSelectedOptionData] = useState({});

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    setData({
      "Option 1": { k1: "v1", k2: "v2", k3: "v3", k4: "v4" },
      "Option 2": { k1: "v5", k2: "v6", k3: "v7", k4: "v8" },
      "Option 3": { k1: "v9", k2: "v10", k3: "v11", k4: "v12" },
    });
  }, []);

  useEffect(() => {
    setSelectedOptionData(data[selectedOption] || {});
  }, [data, selectedOption]);

  return (
    <div className="container white-box rounded-2 p-3">
      <div className="row">
        <div className="col">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Driver Behavior
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedOption}
                label="Select Driver Behavior"
                onChange={handleSelectChange}
              >
                {Object.keys(data).map((option, index) => (
                  <MenuItem value={option} key={index}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <h4>Summary Table</h4>
          {Object.keys(selectedOptionData).length > 0 ? (
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Column 1</th>
                  <th>Column 2</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(selectedOptionData).map((key, index) => (
                  <tr
                    key={index}
                    className={selectedOption ? "selected-row" : ""}
                  >
                    <td>{key}</td>
                    <td>{selectedOptionData[key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data available for the selected option.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryComponent;
