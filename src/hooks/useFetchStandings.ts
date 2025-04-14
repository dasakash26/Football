import { useState, useEffect } from "react";
import { StandingsData } from "../types/standings";
const useFetchStandings = (competitionId: string) => {
  const [standings, setStandings] = useState<StandingsData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!competitionId) return;

    const fetchStandings = async () => {
      setLoading(true);
      setError(null);

      try {
        const API_KEY = import.meta.env.VITE_API_KEY;
        console.log("API_KEY", API_KEY);
        const response = await fetch(
          `/api/competitions/${competitionId}/standings`,
          {
            headers: {
              "X-Auth-Token": API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data (status: ${response.status})`);
        }

        const data = await response.json();
        setStandings(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching standings"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [competitionId]);

  return { standings, loading, error };
};

export default useFetchStandings;
