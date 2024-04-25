import { useState, useEffect } from "react";
import MapComponent from "../component/MapComponent";
import LoaderComponent from "../component/LoaderComponent";
import { Button } from "@mui/material";

import { fetchRealTimeTripSegments } from "../services/realTimeTripServices";

const RealTimeDashboard = () => {
  const [gps, setGPS] = useState({});
  const [minSegmentId, setMinSegmentId] = useState(0);
  const [maxSegmentId, setMaxSegmentId] = useState(0);
  const [segmentId, setSegmentId] = useState(0);
  const [filteredGPS, setFilteredGPS] = useState([]);
  const [spliPoints, setSpliPoints] = useState([]);
  const [filterSpliPoints, setfilterSpliPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState("");

  useEffect(() => {
    console.log(111);
    setIsLoading(false);
  }, []);

  const handleIncrement = () => {
    if (maxSegmentId > segmentId) {
      // Incrementing the segment ID passed to MapComponent
      const newSegmentId = segmentId + 1;
      setSegmentId(newSegmentId);
      if (gps.gps) {
        const filteredData = gps.gps.filter(
          (point) =>
            point.segment_id >= minSegmentId && point.segment_id <= newSegmentId
        );
        setFilteredGPS(filteredData);
      }
      if (spliPoints.length > filterSpliPoints.length + 1) {
        // Adding the next filterSpliPoints
        setfilterSpliPoints((prevSpliPoints) => [
          ...prevSpliPoints,
          spliPoints[filterSpliPoints.length + 1],
        ]);
      }
    }
  };

  const handleDecrement = () => {
    if (minSegmentId < segmentId) {
      // Decrementing the segment ID passed to MapComponent
      const newSegmentId = segmentId - 1;
      setSegmentId(newSegmentId);
      if (gps.gps) {
        const filteredData = gps.gps.filter(
          (point) =>
            point.segment_id >= minSegmentId && point.segment_id <= newSegmentId
        );
        setFilteredGPS(filteredData);
      }
      if (filterSpliPoints.length > 1) {
        // Removing the last filterSpliPoints
        setfilterSpliPoints((prevSpliPoints) => prevSpliPoints.slice(0, -1));
      }
    }
  };
  const handleChangeTripId = (e) => {
    setSelectedTripId(e.target.value);
  };
  const fetchData = async (tempSegmentId) => {
    try {
      const gpsResponse = await fetchRealTimeTripSegments(tempSegmentId);
      console.log(gpsResponse);
      const segmentIds = gpsResponse.gps.map((point) => point.segment_id);
      const minId = Math.min(...segmentIds);
      const maxId = Math.max(...segmentIds);
      setMinSegmentId(minId);
      setMaxSegmentId(maxId);
      setGPS(gpsResponse);
      setSegmentId(maxId);
      const filteredData = gpsResponse.gps.filter(
        (point) => point.segment_id == minId
      );
      setFilteredGPS(filteredData);
      setSpliPoints(gpsResponse.split_points);
      setfilterSpliPoints([gpsResponse.split_points]);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setIsLoading(false);
      // window.location.href = "/not-found";
    }
  };

  const handleApplyClick = () => {
    let tempSegmentId = 31825;
    
    fetchData(tempSegmentId);
    tempSegmentId++;
    setIsFetched(true)
    const intervalId = setInterval(() => {
      fetchData(tempSegmentId);
      tempSegmentId++;
      if (tempSegmentId === 31842) {
        clearInterval(intervalId); // Stop the interval
      }
    }, 5000);
  };
  return (
    <div className="container light-purpal-box" style={{
      height: "90vh",
    }}>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <>
          <br />
          <h1 style={{ color: "blue" }}>Real Time Trips</h1>
          <div className="row">
            <div className="col-md-4 pt-2">
              <label htmlFor="selectTripId" className="form-label">
                Select Trip:
              </label>
              <br />
              <select
                id="selectTripId"
                className="form-control"
                value={selectedTripId}
                onChange={handleChangeTripId}
              >
                <option value="">Select...</option>
                <option value="500">500</option>
                <option value="601">601</option>
                <option value="701">701</option>
              </select>
            </div>
            <div className="col-md-4 pt-2"></div>
            <div className="col-md-4 d-flex align-items-end justify-content-center pt-2">
              <Button
                onClick={handleApplyClick}
                variant="contained"
                color="primary"
                style={{ width: "80%" }}
                disabled={selectedTripId == ""}
              >
                Apply
              </Button>
            </div>
          </div>
          <div className="row">
            {isFetched && filterSpliPoints.length !== 0 && filteredGPS.length !== 0 ? (
              <MapComponent
                mapData={filteredGPS}
                splitPoint={filterSpliPoints}
              />
            ) : (
              <div></div>
            )}
          </div>
          <br />
          {/* <div className="row mt-10">
            <div className="col-md-5">
              <Button
                onClick={handleDecrement}
                variant="contained"
                color="primary"
                style={{ width: "100%" }}
              >
                Decrement
              </Button>
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-5">
              <Button
                onClick={handleIncrement}
                variant="contained"
                color="primary"
                style={{ width: "100%" }}
              >
                Increment
              </Button>
            </div>
          </div> */}
          <br />
        </>
      )}
    </div>
  );
};

export default RealTimeDashboard;
