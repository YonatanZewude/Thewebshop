import axios from "axios";

export async function getProductById(id: number) {
  try {
    const response = await axios.get(`./src/test.json?id=${id}`);
    console.log("Product details:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
}
