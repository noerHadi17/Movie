import { useEffect, useState } from "react";
import type { Movie } from "../../services/movie";
import { getDetail } from "../../services/movie";

export const useDetail = (id: string) => {
  //State to save movie list data
  const [movie, setMovie] = useState<Movie>();

  //Effect to load the API
  useEffect(() => {
    //call getPopular API
    const fetchData = async () => {
      try {
        const response = await getDetail(id);

        if (response) {
          setMovie(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  //Return data
  return { movie };
};
