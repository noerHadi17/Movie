import { useEffect, useState } from "react";
import { getSearch, getDetail, type Movie } from "../../services/movie";

interface UseSearchProps {
  query: string;
}

export const useSearch = ({ query }: UseSearchProps) => {
  const [searchMovies, setSearchMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setSearchMovies([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getSearch(query);

        if (response) {
          const basicMovies = response.results;
          const fullMovies = await Promise.all(
            basicMovies.map(async (basic) => {
              const detail = await getDetail(basic.id.toString());
              return detail;
            })
          );
          setSearchMovies(fullMovies);
        }
      } catch (error) {
        console.error(error);
        setSearchMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return { searchMovies, loading };
};
