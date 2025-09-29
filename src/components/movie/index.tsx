import { useNavigate } from "react-router";
import type { Movie } from "../../services/movie";
import { useFavorites } from "../../hooks/useFavorites";
import { Heart } from "lucide-react";

interface Props {
  movie: Movie;
}

const MovieComponent = ({ movie }: Props) => {
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { poster_path, original_title, id, runtime } = movie;
  const favorite = isFavorite(id);

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div
      className="w-48 flex-shrink-0 cursor-pointer relative"
      onClick={() =>
        navigate(`/detail?id=${id}`, {
          state: {
            name: original_title,
          },
        })
      }
    >
      <img
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        alt={original_title}
        className="rounded-lg w-full h-64 object-cover"
      />
      {runtime && (
        <div className="absolute bottom-2 left-2 bg-gradient-to-r from-black/50 to-transparent text-white text-xs px-2 py-1 rounded shadow-lg">
          {formatRuntime(runtime)}
        </div>
      )}
      <div className="flex flex-col p-2 bg-gray-800">
        <h1 className="text-sm font-semibold truncate text-white">{original_title}</h1>
      </div>
      <button
        onClick={handleFavorite}
        className={`absolute top-2 right-2 p-1 rounded-full ${
          favorite ? "bg-red-500 text-white" : "bg-gray-800 text-gray-300"
        } hover:bg-red-500 hover:text-white`}
      >
        <Heart size={16} fill={favorite ? "currentColor" : "none"} />
      </button>
    </div>
  );
};

export default MovieComponent;
