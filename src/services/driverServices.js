import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/api";

const fetchDriverSummary = async (driverId) => {
  try {
    const response = await axios.get(`${BASE_URL}/driver/summary/${driverId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};
const fetchDriverMetadata = async (driverId) => {
  try {
    const response = await axios.get(`${BASE_URL}/driver/metadata/${driverId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

const fetchTripScore = async (driverId) => {
  try {
    const response = await axios.get(`${BASE_URL}/trip/score/${driverId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export { fetchDriverSummary, fetchDriverMetadata, fetchTripScore };
