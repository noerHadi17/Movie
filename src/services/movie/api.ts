import API from "../api";
import type { Movie, ResponseData } from "./type";

export const getPopular = async () => {
  try {
    const response = await API.get(`movie/popular`);

    if (response.status === 200) {
      return response.data as ResponseData;
    }
  } catch (error: any) {
    console.error(error);
  }
};

export const getDetail = async (id: string): Promise<Movie> => {
  try {
    const response = await API.get(`movie/${id}`);

    if (response.status === 200) {
      return response.data as Movie;
    }
  } catch (error) {
    console.error(error);
  }
  throw new Error('Failed to fetch movie details');
};

export const getSearch = async (query: string) => {
  try {
    const response = await API.get(`search/movie?query=${encodeURIComponent(query)}`);

    if (response.status === 200) {
      return response.data as ResponseData;
    }
  } catch (error: any) {
    console.error(error);
  }
};

export const getTopRated = async () => {
  try {
    const response = await API.get(`movie/top_rated`);

    if (response.status === 200) {
      return response.data as ResponseData;
    }
  } catch (error: any) {
    console.error(error);
  }
};

export const getNowPlaying = async () => {
  try {
    const response = await API.get(`movie/now_playing`);

    if (response.status === 200) {
      return response.data as ResponseData;
    }
  } catch (error: any) {
    console.error(error);
  }
};
