import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CircularProgressComponent from "../component/CircularProgressComponent";
import MetaDataComponent from "../component/MetaDataComponent";
import MapComponent from "../component/MapComponent";
import { fetchTripSummary, fetchGPS } from "../services/tripServices";
import metadataFill from "../data/116-driver-meta-data.json";

const TripDashboard = () => {
  const { tripId } = useParams();
  const [summaryData, setSummaryData] = useState({});
  // const [metadata, setMetadata] = useState(metadataFill);
  const [gps, setGPS] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = parseInt(tripId); // Parse to integer
        if (isNaN(id)) {
          window.location.href = "/";
          return;
        }

        const summaryResponse = await fetchTripSummary(id);
        const gpsResponse = await fetchGPS(id);
        // const metadataResponse = await fetchTripMetadata(id);

        setSummaryData(summaryResponse);
        setGPS(gpsResponse);
        // setMetadata(metadataResponse);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
        window.location.href = "/";
      }
    };

    fetchData();
  }, [tripId]);

  return (
    <div className="container light-purpal-box">
      {isLoading ? (
        <div className="text-center mt-5">
          <h1>Loading...</h1>
          {/* You can add additional loader component or spinner here */}
        </div>
      ) : (
        <>
          <h1 className="text-center" style={{ color: "#800080" }}>
            Trip Id {tripId}
          </h1>
          <div className="row mt-3">
            <div className="col-md-6 d-flex align-items-stretch">
              <CircularProgressComponent
                summaryStatics={summaryData}
                topicName={"trip"}
              />
            </div>
            <div className="col-md-6 d-flex align-items-stretch">
              <MetaDataComponent metaData={metadataFill} topicName={"trip"} />
            </div>
          </div>
          <div className="row pt-5  mb-3">
            <div className="col-md-2"></div>
            <div className="col-md-8 ">
              <MapComponent mapData={gps} />
            </div>
            <div className="col-md-2"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default TripDashboard;
