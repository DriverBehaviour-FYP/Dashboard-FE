import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MapComponent from "../component/MapComponent";
import LoaderComponent from "../component/LoaderComponent";
import { Button } from "@mui/material";

import { fetchGPS } from "../services/tripServices";

const RealTimeDashboard = () => {
  const { tripId } = useParams();
  const [gps, setGPS] = useState({});
  const [minSegmentId, setMinSegmentId] = useState(0);
  const [maxSegmentId, setMaxSegmentId] = useState(0);
  const [segmentId, setSegmentId] = useState(0);
  const [filteredGPS, setFilteredGPS] = useState([]);
  const [spliPoints, setSpliPoints] = useState([]);
  const [filterSpliPoints, setfilterSpliPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = parseInt(tripId); // Parse to integer
        if (isNaN(id)) {
          window.location.href = "/not-found";
          return;
        }

        const gpsResponse = await fetchGPS(id);

        const segmentIds = gpsResponse.gps.map((point) => point.segment_id);
        const minId = Math.min(...segmentIds);
        const maxId = Math.max(...segmentIds);
        setMinSegmentId(minId);
        setMaxSegmentId(maxId);
        setGPS(gpsResponse);
        setSegmentId(minId);
        const filteredData = gpsResponse.gps.filter(
          (point) => point.segment_id == minId
        );
        setFilteredGPS(filteredData);
        setSpliPoints(gpsResponse.split_points);
        setfilterSpliPoints([
          gpsResponse.split_points[0],
          gpsResponse.split_points[1],
        ]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
        window.location.href = "/not-found";
      }
    };

    fetchData();
  }, [tripId]);

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

  return (
    <div className="container light-purpal-box">
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <>
          <br />
          <h1 style={{ color: "blue" }}>Trip Id {tripId}</h1>

          <div className="row">
            <MapComponent mapData={filteredGPS} splitPoint={filterSpliPoints} />
          </div>
          <br />
          <div className="row mt-10">
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
          </div>
          <br />
        </>
      )}
    </div>
  );
};

export default RealTimeDashboard;
