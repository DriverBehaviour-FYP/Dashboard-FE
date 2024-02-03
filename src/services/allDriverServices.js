import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/api";

const fetchAllDriversSummary = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/alldrivers/summary/`);
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
const fetchAllDriversMetadata = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/alldrivers/metadata/`);
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

const fetchAllDriversScore = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/driver/score`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export {
  fetchAllDriversSummary,
  fetchAllDriversMetadata,
  fetchAllDriversScore,
};
