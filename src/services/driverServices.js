import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/api";

const fetchDriverSummary = async (driverId, startDate, endDate) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/driver/summary/${driverId}`,
      {
        "start-date": startDate,
        "end-date": endDate,
      }
    );
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};
const fetchDriverMetadata = async (driverId, startDate, endDate) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/driver/metadata/${driverId}`,
      {
        "start-date": startDate,
        "end-date": endDate,
      }
    );
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

const fetchTripScore = async (driverId, startDate, endDate) => {
  try {
    const response = await axios.post(`${BASE_URL}/trip/score/${driverId}`, {
      "start-date": startDate,
      "end-date": endDate,
    });
    // if (response.data.success) {
    return response.data;
    // } else {
    // throw new Error();
    // }
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};
const fetchDriverDwellTime = async (driverId, startDate, endDate) => {
  try {
    const response = await axios.post(`${BASE_URL}/alldrivers/dwelltime`, {
      "start-date": startDate,
      "end-date": endDate,
    });
    if (response.data.success) {
      const filteredData = {};
      for (const direction in response.data) {
        filteredData[direction] = response.data[direction].filter(
          (item) => item.driverId === driverId || item.driverId === "all"
        );
      }
      return filteredData;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export {
  fetchDriverSummary,
  fetchDriverMetadata,
  fetchTripScore,
  fetchDriverDwellTime,
};
