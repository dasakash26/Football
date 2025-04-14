import React from "react";

interface Competition {
  id: string;
  name: string;
}

interface CompetitionSelectorProps {
  onCompetitionChange: (competitionId: string) => void;
}

const CompetitionSelector: React.FC<CompetitionSelectorProps> = ({
  onCompetitionChange,
}) => {
  const competitions: Competition[] = [
    { id: "PL", name: "Premier League" },
    { id: "PD", name: "La Liga" },
    { id: "BL1", name: "Bundesliga" },
    { id: "SA", name: "Serie A" },
    { id: "FL1", name: "Ligue 1" },
    { id: "CL", name: "UEFA Champions League" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCompetitionChange(e.target.value);
  };

  return (
    <div className="mb-6">
      <label
        htmlFor="competition"
        className="block text-gray-800 text-sm font-medium mb-2"
      >
        Select Competition
      </label>
      <div className="relative">
        <select
          id="competition"
          onChange={handleChange}
          className="appearance-none bg-white border border-gray-300 rounded-lg w-full py-2.5 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-200"
          defaultValue=""
        >
          <option value="" disabled>
            Select a league...
          </option>
          {competitions.map((competition) => (
            <option key={competition.id} value={competition.id}>
              {competition.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-600">
          <svg
            className="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CompetitionSelector;
