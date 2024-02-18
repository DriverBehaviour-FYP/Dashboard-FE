import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/api";

const fetchAllDriversSummary = async (startDate, endDate) => {
  try {
    const response = await axios.post(`${BASE_URL}/alldrivers/summary/`, {
      "start-date": startDate,
      "end-date": endDate,
    });
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
const fetchAllDriversMetadata = async (startDate, endDate) => {
  try {
    const response = await axios.post(`${BASE_URL}/alldrivers/metadata/`, {
      "start-date": startDate,
      "end-date": endDate,
    });
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

const fetchAllDriversScore = async (startDate, endDate) => {
  try {
    const response = await axios.post(`${BASE_URL}/driver/score`, {
      "start-date": startDate,
      "end-date": endDate,
    });
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
