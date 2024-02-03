import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/api";

const fetchTripSummary = async (tripId) => {
  try {
    const response = await axios.get(`${BASE_URL}/trip/summary/${tripId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};
const fetchTripMetadata = async (tripId) => {
  try {
    const response = await axios.get(`${BASE_URL}/trip/metadata/${tripId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

// const fetchTripScore = async (driverId) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/trip/score/${driverId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data: ", error);
//     throw error;
//   }
// };

export { fetchTripSummary, fetchTripMetadata };
