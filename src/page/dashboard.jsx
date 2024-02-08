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
          <h1 className="text-center" style={{ color: "blue" }}>
            All Drivers
          </h1>
          <div className="row mt-3">
            <MetaDataComponent metaData={metadata} topicName={"allDriver"} />
          </div>
          <div className="row mt-3">
            <CircularProgressComponent
              summaryStatics={summaryData}
              topicName={"allDriver"}
            />
          </div>
          <div className="row mt-4 p-2 mb-2">
            <h3>Driver Analysis</h3>
            <div className="col-md-8 ">
              <ScatterComponent
                driverData={scores}
                xAxisLabel={"Drivers"}
                xAxisName={"deviceid"}
              />
            </div>
            {/* <div className="col-md-4">
          <SummaryComponent />
        </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
