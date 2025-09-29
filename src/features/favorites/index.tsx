import { useFavorites } from "../../hooks/useFavorites";
import MovieComponent from "../../components/movie";

const FavoritesScreen = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="w-full px-10 py-10">
      <h1 className="text-2xl font-bold mb-5">My Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorites yet. Add some movies!</p>
      ) : (
        <div className="flex gap-3 overflow-x-auto overflow-visible px-10">
          {favorites.map((movie) => (
            <div key={movie.id} className="relative">
              <MovieComponent movie={movie} />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(movie.id);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesScreen;
