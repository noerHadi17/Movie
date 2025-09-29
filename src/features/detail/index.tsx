import { useQuery } from "../../hooks/useQuery";
import { useDetail } from "../../hooks/movie/useDetail";
import { useFavorites } from "../../hooks/useFavorites";
import { Heart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const DetailScreen = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const id = query.get("id") as string;
  const { movie } = useDetail(id);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  if (!movie) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const favorite = isFavorite(movie.id);

  const handleFavorite = () => {
    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
          alt={movie.title}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute top-4 left-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-md hover:bg-opacity-70"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        </div>
        <div className="absolute bottom-4 left-4 flex items-end space-x-6">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="w-32 h-48 object-cover rounded-lg shadow-lg"
          />
          <div>
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <p className="text-lg mb-2">{movie.release_date} • {movie.genres.map(g => g.name).join(", ")}</p>
            <p className="text-yellow-400">⭐ {movie.vote_average.toFixed(1)}/10</p>
          </div>
        </div>
        <button
          onClick={handleFavorite}
          className={`absolute top-4 right-4 p-3 rounded-full ${
            favorite ? "bg-red-500 text-white" : "bg-gray-800 text-gray-300"
          } hover:bg-red-500 hover:text-white`}
        >
          <Heart size={24} fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="px-6 py-8">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <h3 className="font-semibold">Runtime</h3>
            <p className="text-gray-400">{movie.runtime} minutes</p>
          </div>
          <div>
            <h3 className="font-semibold">Language</h3>
            <p className="text-gray-400">{movie.original_language.toUpperCase()}</p>
          </div>
          <div>
            <h3 className="font-semibold">Budget</h3>
            <p className="text-gray-400">${movie.budget.toLocaleString()}</p>
          </div>
          <div>
            <h3 className="font-semibold">Revenue</h3>
            <p className="text-gray-400">${movie.revenue.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailScreen;
