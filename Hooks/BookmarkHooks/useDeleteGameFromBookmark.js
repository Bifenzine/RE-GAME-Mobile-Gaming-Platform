import { useState } from "react";
import axios from "axios";
import config from "../../config/config";

const useDeletGameFromBookmark = () => {
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteGameFromBookmark = async (gameId) => {
    setIsLoading(true);
    try {
      // Make a request to delete the post from the bookmark
      await axios.delete(`${config.apiUrl}/api/bookmarks/delete/${gameId}`, {
        withCredentials: true, // Send cookies with the request
        Headers: { "x-client-type": "web" },
      });
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { isloading, error, deleteGameFromBookmark };
};

export default useDeletGameFromBookmark;
