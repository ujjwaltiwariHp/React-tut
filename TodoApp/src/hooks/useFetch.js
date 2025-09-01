import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;

    const run = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get(url, options);
        if (alive) setData(res.data);
      } catch (err) {
        if (alive) setError(err.response?.data || err.message);
      } finally {
        if (alive) setLoading(false);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, [url, options]);

  return { data, loading, error };
}
