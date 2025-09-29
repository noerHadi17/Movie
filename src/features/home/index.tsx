import { useNavigate } from "react-router";
import { usePopularMovie } from "../../hooks/movie/usePopular";
import { useTopRatedMovie } from "../../hooks/movie/useTopRated";
import { useNowPlayingMovie } from "../../hooks/movie/useNowPlaying";
import MovieComponent from "../../components/movie";
import type { Movie } from "../../services/movie";

const HomeScreen = () => {
  const navigate = useNavigate();
  const { popularMovie } = usePopularMovie();
  const { topRatedMovie } = useTopRatedMovie();
  const { nowPlayingMovie } = useNowPlayingMovie();

  const featuredMovie = popularMovie[0];

  const MovieRow = ({ title, movies }: { title: string; movies: Movie[] }) => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {movies.map((movie) => (
          <MovieComponent key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full pt-20 pb-10 bg-gray-900 text-white min-h-screen overflow-hidden">
      {/* Hero Banner */}
      {featuredMovie && (
        <div 
          className="relative h-96 bg-cover bg-center flex items-end p-10 text-white"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent, rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`
          }}
        >
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">{featuredMovie.title}</h1>
            <p className="text-lg mb-6 line-clamp-3">{featuredMovie.overview}</p>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate(`/detail?id=${featuredMovie.id}`)}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md font-semibold"
              >
                Play
              </button>
              <button 
                onClick={() => navigate(`/detail?id=${featuredMovie.id}`)}
                className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded-md font-semibold"
              >
                More Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Movie Rows */}
      <div className="px-6 md:px-10">
        <MovieRow title="Popular on Iclixx" movies={popularMovie.slice(1)} />
        <MovieRow title="Top Rated" movies={topRatedMovie} />
        <MovieRow title="Now Playing" movies={nowPlayingMovie} />
      </div>
    </div>
  );
};

export default HomeScreen;
