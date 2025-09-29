import { useEffect, useState } from "react";

import { getPopular, getDetail, type Movie } from "../../services/movie";

export const usePopularMovie = () => {
  //State to save movie list data
  const [popularMovie, setPopularMovie] = useState<Movie[]>([]);

  //Effect to load the API
  useEffect(() => {
    //call getPopular API
    const fetchData = async () => {
      try {
        const response = await getPopular();

        if (response) {
          const basicMovies = response.results;
          const fullMovies = await Promise.all(
            basicMovies.map(async (basic) => {
              const detail = await getDetail(basic.id.toString());
              return detail;
            })
          );
          setPopularMovie(fullMovies);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  //Return data
  return { popularMovie };
};
