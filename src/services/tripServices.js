import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/api";

const fetchTripSummary = async (tripId) => {
  try {
    const response = await axios.get(`${BASE_URL}/trip/summary/${tripId}`);
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
const fetchTripMetadata = async (tripId) => {
  try {
    const response = await axios.get(`${BASE_URL}/trip/metadata/${tripId}`);
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

const fetchGPS = async (tripId) => {
  try {
    const response = await axios.get(`${BASE_URL}/trip/gps/${tripId}`);
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

export { fetchTripSummary, fetchTripMetadata, fetchGPS };
