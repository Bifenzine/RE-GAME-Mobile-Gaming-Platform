import { useState, useEffect } from "react";
import { getGameByConsoles } from "@/DataFetching/DataFetching";

const useConsoles = (consoleId = null) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const LIMIT = 10;

  const fetchGamesByConsole = async (pageNumber = 1) => {
    if (!consoleId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await getGameByConsoles(consoleId);
      const newGames = response.data;

      if (pageNumber === 1) {
        setGames(newGames);
      } else {
        setGames((prev) => [...prev, ...newGames]);
      }

      setHasMore(newGames.length === LIMIT);
    } catch (err) {
      setError("Failed to load console games. Please try again later.");
      console.error("Error fetching console games:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const refresh = () => {
    setPage(1);
    setGames([]);
    fetchGamesByConsole(1);
  };

  useEffect(() => {
    if (consoleId) {
      fetchGamesByConsole(page);
    }
  }, [page, consoleId]);

  return {
    games,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
};

export default useConsoles;
