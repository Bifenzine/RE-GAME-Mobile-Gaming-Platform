import axios from "axios";
import config from "../config/config";

const RegameApi = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});

// Set default headers
RegameApi.defaults.headers.common["x-client-type"] = "mobile"; // or 'web', depending on the context

// get all games we will implement infinite scroll reload
export const getAllGames = () => RegameApi.get("/api/v1/games/all");

export default RegameApi;
