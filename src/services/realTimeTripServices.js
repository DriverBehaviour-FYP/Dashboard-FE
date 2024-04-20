import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/api";

const fetchRealTimeTripSegments = async (segmentId) => {
  try {
    const response = await axios.get(`${BASE_URL}/trip/realtime/${segmentId}`);
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

export { fetchRealTimeTripSegments };
