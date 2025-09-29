import { useEffect, useState } from "react";

import { getTopRated, getDetail, type Movie } from "../../services/movie";

export const useTopRatedMovie = () => {
  const [topRatedMovie, setTopRatedMovie] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTopRated();

        if (response) {
          const basicMovies = response.results;
          const fullMovies = await Promise.all(
            basicMovies.map(async (basic) => {
              const detail = await getDetail(basic.id.toString());
              return detail;
            })
          );
          setTopRatedMovie(fullMovies);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return { topRatedMovie };
};
