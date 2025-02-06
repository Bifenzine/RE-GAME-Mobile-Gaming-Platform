// useGames.js
import { useState, useEffect } from "react";
import { getAllGames } from "@/DataFetching/DataFetching";

const useGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchGames = async (pageNumber = 1) => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAllGames(pageNumber);

      // Extract the data from the response
      const {
        games: newGames,
        hasMore: hasMorePages,
        totalPages: total,
        currentPage: page,
      } = response.data;

      // Filter out null games
      const validGames = newGames.filter(
        (game) =>
          game && game.game_name && game.image_url && game.emulator_iframe
      );

      if (pageNumber === 1) {
        setGames(validGames);
      } else {
        setGames((prev) => [...prev, ...validGames]);
      }

      setHasMore(hasMorePages);
      setTotalPages(total);
      setCurrentPage(page);
    } catch (err) {
      setError("Failed to load games. Please try again later.");
      console.error("Error fetching games:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const refresh = () => {
    setCurrentPage(1);
    setGames([]);
    fetchGames(1);
  };

  useEffect(() => {
    fetchGames(currentPage);
  }, [currentPage]);

  return {
    games,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    currentPage,
    totalPages,
  };
};

export default useGames;
