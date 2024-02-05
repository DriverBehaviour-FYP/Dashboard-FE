import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ScatterComponent from "../component/ScatterComponent";
import CircularProgressComponent from "../component/CircularProgressComponent";
import MetaDataComponent from "../component/MetaDataComponent";
import {
  fetchDriverSummary,
  fetchDriverMetadata,
  fetchTripScore,
} from "../services/driverServices";

const DriverDashboard = () => {
  const { driverId } = useParams();
  const [summaryData, setSummaryData] = useState({});
  const [metadata, setMetadata] = useState({});
  const [scores, setScores] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = parseInt(driverId); // Parse to integer
        if (isNaN(id)) {
          window.location.href = "/not-found";
          return;
        }

        const summaryResponse = await fetchDriverSummary(id);
        const metadataResponse = await fetchDriverMetadata(id);
        const scoreResponse = await fetchTripScore(id);

        setSummaryData(summaryResponse);
        setMetadata(metadataResponse);
        setScores(scoreResponse);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
        window.location.href = "/";
      }
    };

    fetchData();
  }, [driverId]);

  return (
    <div className="container light-purpal-box">
      {isLoading ? (
        <div
          className="text-center mt-5"
          style={{
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="spinner-grow text-primary" role="status"></div>
          <div className="spinner-grow text-secondary" role="status"></div>
          <div className="spinner-grow text-success" role="status"></div>
          <div className="spinner-grow text-danger" role="status"></div>
          <div className="spinner-grow text-warning" role="status"></div>
          <div className="spinner-grow text-info" role="status"></div>
          <div className="spinner-grow text-light" role="status"></div>
          <div className="spinner-grow text-dark" role="status"></div>
        </div>
      ) : (
        <>
          <h1 className="text-center" style={{ color: "blue" }}>
            Driver Id {driverId}
          </h1>

          <div className="row mt-3">
            <MetaDataComponent metaData={metadata} topicName={"driver"} />
          </div>
          <div className="row mt-3">
            <CircularProgressComponent
              summaryStatics={summaryData}
              topicName={"driver"}
            />
          </div>
          <div className="row mt-4 p-2 mb-2">
            <h3>Trip Analysis</h3>
            <div className="col-md-8 ">
              <ScatterComponent
                driverData={scores}
                xAxisLabel={"Trips"}
                xAxisName={"trip_id"}
                driverId={parseInt(driverId)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DriverDashboard;
