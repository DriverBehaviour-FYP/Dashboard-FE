import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CircularProgressComponent from "../component/CircularProgressComponent";
import MetaDataComponent from "../component/MetaDataComponent";
import MapComponent from "../component/MapComponent";
import LoaderComponent from "../component/LoaderComponent";
import PieChartComponent from "../component/PieChartComponent";
import LineGraphComponent from "../component/LineGraphComponent";

import {
  fetchTripSummary,
  fetchGPS,
  fetchTripMetadata,
  fetchTripDwellTime,
  fetchTripZoneWiseSpeed,
} from "../services/tripServices";

const TripDashboard = () => {
  const { tripId } = useParams();
  const [summaryData, setSummaryData] = useState({});
  const [metadata, setMetadata] = useState({});
  const [gps, setGPS] = useState({});
  const [clusterSummary, setClusterSummary] = useState({});
  const [dwellTimeTripData, setDwellTimeTripData] = useState([]);
  const [tripSpeedAtZone, setTripSpeedAtZone] = useState({});

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
        const dwellTimeResponse = await fetchTripDwellTime(
          id,
          metadataResponse["date"]
        );
        const speedAtZoneResponse = await fetchTripZoneWiseSpeed(
          id,
          metadataResponse["date"]
        );
        setDwellTimeTripData(dwellTimeResponse);
        setTripSpeedAtZone(speedAtZoneResponse);
        setSummaryData(summaryResponse);
        setGPS(gpsResponse);
        setClusterSummary(summaryResponse["cluster-summary"]);
        setMetadata(metadataResponse);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
        window.location.href = "/not-found";
      }
    };

    fetchData();
  }, [tripId]);

  return (
    <div className="container light-purpal-box">
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <>
          <br />
          <h1 style={{ color: "blue" }}>Trip Id {tripId}</h1>
          <div className="row mt-3">
            <MetaDataComponent metaData={metadata} topicName={"trip"} />
          </div>
          <div className="row">
            {/* Column for CircularProgressComponent */}
            <div className="col-md-2">
              <CircularProgressComponent
                summaryStatics={summaryData}
                topicName={"trip"}
              />
            </div>

            {/* Column for MapComponent */}
            <div className="col-md-7">
              <MapComponent
                mapData={gps.gps}
                splitPoint={gps["split_points"]}
              />
            </div>
            <div className="col-md-3">
              <PieChartComponent
                values={[
                  clusterSummary["aggressive"],
                  clusterSummary["normal"],
                  clusterSummary["safe"],
                ]}
                title={`Behavior Of Trip ${tripId}`}
                labels={["Aggressive", "Normal", "Safe"]}
                colors={["red", "blue", "green"]}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-6">
              <LineGraphComponent
                graphData={dwellTimeTripData}
                label={"Trip"}
                type={"dwellTime"}
              />
            </div>
            <div className="col-6">
              <LineGraphComponent
                graphData={tripSpeedAtZone}
                label={"Trip"}
                type={"speed"}
              />
            </div>
          </div>
          <br />
        </>
      )}
    </div>
  );
};

export default TripDashboard;
