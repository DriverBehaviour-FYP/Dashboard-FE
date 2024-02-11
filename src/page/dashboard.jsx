import { useState, useEffect } from "react";
import ScatterComponent from "../component/ScatterComponent";
import CircularProgressComponent from "../component/CircularProgressComponent";
import MetaDataComponent from "../component/MetaDataComponent";
import LoaderComponent from "../component/LoaderComponent";
import {
  fetchAllDriversMetadata,
  fetchAllDriversSummary,
  fetchAllDriversScore,
} from "../services/allDriverServices";

const Dashboard = () => {
  const [summaryData, setSummaryData] = useState({});
  const [metadata, setMetadata] = useState({});
  const [scores, setScores] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loader

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryResponse = await fetchAllDriversSummary();
        const metadataResponse = await fetchAllDriversMetadata();
        const scoreResponse = await fetchAllDriversScore();

        setSummaryData(summaryResponse);
        setMetadata(metadataResponse);
        setScores(scoreResponse);
        setIsLoading(false); // Set to false when data fetching is completed
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
        window.location.href = "/not-found";
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container light-purpal-box">
      {isLoading ? ( // Show loader when isLoading is true
        <LoaderComponent />
      ) : (
        <>
          <br />
          <h1 style={{ color: "blue" }}>All Drivers</h1>
          <div className="row mt-3">
            <MetaDataComponent metaData={metadata} topicName={"allDriver"} />
          </div>
          <div className="row">
            {/* Column for CircularProgressComponent */}
            <div className="col-md-2">
              <CircularProgressComponent
                summaryStatics={summaryData}
                topicName={"allDriver"}
              />
            </div>
            <div className="col-md-1"></div>

            {/* Column for MapComponent */}
            <div className="col-md-9">
              <ScatterComponent
                driverData={scores}
                xAxisLabel={"Drivers"}
                xAxisName={"deviceid"}
              />
            </div>
          </div>
          <br />
        </>
      )}
    </div>
  );
};

export default Dashboard;
