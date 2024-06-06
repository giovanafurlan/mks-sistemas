const axios = require("axios");

export const getProducts = async () => {
  try {
    const response = await axios.get("/api/getProducts");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products data");
  }
};
