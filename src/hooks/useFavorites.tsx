import { useState, useEffect } from "react";
import type { Movie } from "../services/movie";

const FAVORITES_KEY = "movie-favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error("Error parsing favorites:", error);
        setFavorites([]);
      }
    }
  }, []);

  const addFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === movie.id)) return prev;
      const newFavs = [...prev, movie];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const removeFavorite = (movieId: number) => {
    setFavorites((prev) => {
      const newFavs = prev.filter((fav) => fav.id !== movieId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const isFavorite = (movieId: number) => {
    return favorites.some((fav) => fav.id === movieId);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};
