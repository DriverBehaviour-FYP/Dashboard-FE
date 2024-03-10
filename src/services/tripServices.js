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

const fetchTripDwellTime = async (tripId, startDate) => {
  try {
    const response1 = await axios.get(`${BASE_URL}/trip/dwelltime/${tripId}`);
    const response2 = await axios.post(`${BASE_URL}/alldrivers/dwelltime/`, {
      "start-date": startDate,
      "end-date": startDate,
    });
    if (response1.data.success && response1.data.success) {
      const filteredData = [
        { tripId: tripId, dwellTimes: response1.data.data },
      ];
      let exists = false;
      for (const busStop of response1.data.data) {
        if (busStop.bus_stop_no === 201) {
          exists = true;
          break;
        }
      }
      if (exists) {
        const output = response2.data.data["direction-2"].filter(
          (item) => item.driverId === "all"
        );
        filteredData.push({
          tripId: "all",
          dwellTimes: output[0]["dwellTimes"],
        });
      } else {
        const output = response2.data.data["direction-1"].filter(
          (item) => item.driverId === "all"
        );
        filteredData.push({
          tripId: "all",
          dwellTimes: output[0]["dwellTimes"],
        });
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
const fetchTripZoneWiseSpeed = async (tripId, startDate) => {
  try {
    const response1 = await axios.get(`${BASE_URL}/trip/dwelltime/${tripId}`);
    const response2 = await axios.post(`${BASE_URL}/alldrivers/dwelltime/`, {
      "start-date": startDate,
      "end-date": startDate,
    });
    if (response1.data.success && response1.data.success) {
      const filteredData = [
        { tripId: tripId, dwellTimes: response1.data.data },
      ];
      let exists = false;
      for (const busStop of response1.data.data) {
        if (busStop.bus_stop_no === 201) {
          exists = true;
          break;
        }
      }
      if (exists) {
        const output = response2.data.data["direction-2"].filter(
          (item) => item.driverId === "all"
        );
        filteredData.push({
          tripId: "all",
          dwellTimes: output[0]["dwellTimes"],
        });
      } else {
        const output = response2.data.data["direction-1"].filter(
          (item) => item.driverId === "all"
        );
        filteredData.push({
          tripId: "all",
          dwellTimes: output[0]["dwellTimes"],
        });
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
  fetchTripSummary,
  fetchTripMetadata,
  fetchGPS,
  fetchTripDwellTime,
  fetchTripZoneWiseSpeed,
};
