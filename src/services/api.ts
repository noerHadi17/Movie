import axios from "axios";

let bearerToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyY2Y3YzMxMmVhYzRjMTE4NzFmOGY0N2NmN2JjOWRmNSIsIm5iZiI6MTU3OTAwODU3MC41NTksInN1YiI6IjVlMWRjMjNhYTI0YzUwMDAxMzBiZTZjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.23p3_LsFv9KwwKKgSvw0oGzJSTFrhSpgwtL6Q13U9P8";

const API = axios.create();

export const setAxiosConfig = (_accessToken?: string) => {
  // bearerToken = token;
};

API.interceptors.request.use((axiosConfig) => {
  axiosConfig.baseURL = import.meta.env.VITE_BASE_URL;
  axiosConfig.headers.Authorization = `Bearer ${bearerToken}`;

  return axiosConfig;
});

export default API;
