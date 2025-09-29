import {  useState } from "react";
import { getDetail, type Product } from "../../services/product";

export const useDetail = () => {
  const [product, setProduct] = useState<Product>();

  const fetchData = async (id: string) => {
    try {
      const response = await getDetail(id);

      if (response) {
        setProduct(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { product, fetchData };
};
