import { useState } from "react";
import "./App.css";
import CompetitionSelector from "./components/CompetitionSelector";
import useFetchStandings from "./hooks/useFetchStandings";
import StandingsTable from "./components/StandingsTable";

function App() {
  const [selectedCompetition, setSelectedCompetition] = useState<string>("");
  const { standings, loading, error } = useFetchStandings(selectedCompetition);

  const handleCompetitionChange = (competitionId: string) => {
    setSelectedCompetition(competitionId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Football League Standings
      </h1>

      <CompetitionSelector onCompetitionChange={handleCompetitionChange} />

      {loading && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && standings && (
        <StandingsTable standings={standings} />
      )}
    </div>
  );
}

export default App;
