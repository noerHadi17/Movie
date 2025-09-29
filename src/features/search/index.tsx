import { useQuery } from "../../hooks/useQuery";
import { useSearch } from "../../hooks/movie/useSearch";
import MovieComponent from "../../components/movie";

const SearchScreen = () => {
  const query = useQuery();
  const searchQuery = query.get("q") || "";
  const { searchMovies, loading } = useSearch({ query: searchQuery });

  return (
    <div className="w-full px-10 py-10">
      <h1 className="text-2xl font-bold mb-5">
        Search Results for "{searchQuery}"
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : searchMovies.length === 0 ? (
        <p className="text-gray-500">No results found.</p>
      ) : (
        <div className="flex gap-3 overflow-x-auto overflow-visible px-10">
          {searchMovies.map((movie) => (
            <MovieComponent key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchScreen;
