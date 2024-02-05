import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CircularProgressComponent from "../component/CircularProgressComponent";
import MetaDataComponent from "../component/MetaDataComponent";
import MapComponent from "../component/MapComponent";
import {
  fetchTripSummary,
  fetchGPS,
  fetchTripMetadata,
} from "../services/tripServices";

const TripDashboard = () => {
  const { tripId } = useParams();
  const [summaryData, setSummaryData] = useState({});
  const [metadata, setMetadata] = useState({});
  const [gps, setGPS] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = parseInt(tripId); // Parse to integer
        if (isNaN(id)) {
          window.location.href = "/not-found";
          return;
        }

        const summaryResponse = await fetchTripSummary(id);
        const gpsResponse = await fetchGPS(id);
        const metadataResponse = await fetchTripMetadata(id);

        setSummaryData(summaryResponse);
        setGPS(gpsResponse);
        // console.log(gpsResponse);
        console.log(gpsResponse["gps"]);

        // const keys = Object.keys(gpsResponse);
        // console.log(keys);
        setMetadata(metadataResponse);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
        // window.location.href = "/not-found";
      }
    };

    fetchData();
  }, [tripId]);

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
            TRIP ID {tripId}
          </h1>
          <div className="row mt-3">
            <CircularProgressComponent
              summaryStatics={summaryData}
              topicName={"trip"}
            />
          </div>
          <div className="row mt-3">
            <MetaDataComponent metaData={metadata} topicName={"trip"} />
          </div>
          <div className="row mt-4 p-2 mb-5">
            <h3>Segment Analysis</h3>
            <div className="col-md-8 ">
              <MapComponent mapData={gps} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TripDashboard;
