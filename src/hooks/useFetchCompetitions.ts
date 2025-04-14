import { useState, useEffect } from "react";

export interface Competition {
  id: string;
  name: string;
}

const useFetchCompetitions = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompetitions = async () => {
      setLoading(true);
      setError(null);

      try {
        const API_KEY = import.meta.env.VITE_API_KEY;
        const response = await fetch(`/api/competitions`, {
          headers: {
            "X-Auth-Token": API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch competitions (status: ${response.status})`
          );
        }

        const data = await response.json();
        setCompetitions(data.competitions || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching competitions"
        );
        setCompetitions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  return { competitions, loading, error };
};

export default useFetchCompetitions;
