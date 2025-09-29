import API from "../api";
import type { ResponseProduct } from "./type";

export const getProducts = async () => {
  try {
    const response = await API.get("https://dummyjson.com/products");

    if (response.status === 200) {
      return response.data as ResponseProduct;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getDetail = async (id: string) => {
  try {
    const response = await API.get(`https://dummyjson.com/products/${id}`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const postCreate = async (payload: { title: string; price: number }) => {
  try {
    const response = await API.post(
      `https://dummyjson.com/products/add`,
      payload
    );
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const putEdit = async (
  id: string,
  payload: { title: string; price: number }
) => {
  try {
    const response = await API.put(
      `https://dummyjson.com/products/${id}`,
      payload
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const response = await API.delete(`https://dummyjson.com/products/${id}`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};
