import { useEffect, useState } from "react";

import type { Product } from "../../services/product";
import { getProducts } from "../../services/product/api";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchData = async () => {
    try {
      const response = await getProducts();

      if (response) {
        setProducts(response?.products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { products, fetchData };
};
