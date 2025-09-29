import { useEffect, useState } from "react";

import { getNowPlaying, getDetail, type Movie } from "../../services/movie";

export const useNowPlayingMovie = () => {
  const [nowPlayingMovie, setNowPlayingMovie] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNowPlaying();

        if (response) {
          const basicMovies = response.results;
          const fullMovies = await Promise.all(
            basicMovies.map(async (basic) => {
              const detail = await getDetail(basic.id.toString());
              return detail;
            })
          );
          setNowPlayingMovie(fullMovies);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return { nowPlayingMovie };
};
