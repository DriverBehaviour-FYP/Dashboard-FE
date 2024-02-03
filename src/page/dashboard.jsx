import { useState, useEffect } from "react";
import ScatterComponent from "../component/ScatterComponent";
import CircularProgressComponent from "../component/CircularProgressComponent";
import MetaDataComponent from "../component/MetaDataComponent";
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
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container light-purpal-box">
      {isLoading ? ( // Show loader when isLoading is true
        <div className="text-center mt-5">
          <h1>Loading...</h1>
          {/* You can add additional loader component or spinner here */}
        </div>
      ) : (
        <>
          <h1 className="text-center" style={{ color: "#800080" }}>
            All Drivers
          </h1>
          <div className="row mt-3">
            <div className="col-md-6 d-flex align-items-stretch">
              <CircularProgressComponent
                summaryStatics={summaryData}
                topicName={"allDriver"}
              />
            </div>
            <div className="col-md-6 d-flex align-items-stretch">
              <MetaDataComponent metaData={metadata} topicName={"allDriver"} />
            </div>
          </div>
          <div className="row pt-5  mb-3">
            <div className="col-md-2"></div>
            <div className="col-md-8 ">
              <ScatterComponent
                driverData={scores}
                xAxisLabel={"Drivers"}
                xAxisName={"deviceid"}
              />
            </div>
            <div className="col-md-2"></div>
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
