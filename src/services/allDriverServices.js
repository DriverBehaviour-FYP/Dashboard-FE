import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/api";

const fetchAllDriversSummary = async (
  startDate,
  endDate,
  selectedDriverList
) => {
  try {
    const response = await axios.post(`${BASE_URL}/alldrivers/summary/`, {
      "start-date": startDate,
      "end-date": endDate,
      drivers: selectedDriverList,
    });
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};
const fetchAllDriversMetadata = async (
  startDate,
  endDate,
  selectedDriverList
) => {
  try {
    const response = await axios.post(`${BASE_URL}/alldrivers/metadata/`, {
      "start-date": startDate,
      "end-date": endDate,
      drivers: selectedDriverList,
    });
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

const fetchAllDriversScore = async (startDate, endDate, selectedDriverList) => {
  try {
    const response = await axios.post(`${BASE_URL}/driver/score`, {
      "start-date": startDate,
      "end-date": endDate,
      drivers: selectedDriverList,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

const fetchAllDriversDwellTime = async (
  startDate,
  endDate,
  selectedDriverList
) => {
  try {
    const response = await axios.post(`${BASE_URL}/alldrivers/dwelltime/`, {
      "start-date": startDate,
      "end-date": endDate,
      drivers: selectedDriverList,
    });
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error("Error fetching data: 1", error);
    throw error;
  }
};

const fetchAllDriverZoneWiseSpeed = async (
  startDate,
  endDate,
  selectedDriverList
) => {
  try {
    const response = await axios.post(`${BASE_URL}/alldrivers/speedatzones/`, {
      "start-date": startDate,
      "end-date": endDate,
      drivers: selectedDriverList,
    });
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error("Error fetching data: 1", error);
    throw error;
  }
};

const fetchDriverList = async () => {
  const startDate = "";
  const endDate = "";

  try {
    const response = await axios.post(`${BASE_URL}/alldrivers/ids/`, {
      "start-date": startDate,
      "end-date": endDate,
    });
    if (response.data.success) {
      return response.data.drivers;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};
export {
  fetchAllDriversSummary,
  fetchAllDriversMetadata,
  fetchAllDriversScore,
  fetchAllDriversDwellTime,
  fetchAllDriverZoneWiseSpeed,
  fetchDriverList,
};
