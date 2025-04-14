import React from "react";
import { StandingsData } from "../types/standings";

interface StandingsTableProps {
  standings: StandingsData;
}

const colors = {
  champions: "bg-gradient-to-r from-indigo-700 to-indigo-900",
  championsLeague: "bg-gradient-to-r from-emerald-600 to-emerald-700",
  europaLeague: "bg-gradient-to-r from-blue-500 to-blue-600",
  conferenceLeague: "bg-gradient-to-r from-cyan-500 to-cyan-600",
  relegation: "bg-gradient-to-r from-rose-600 to-rose-700",
  text: {
    light: "text-white",
    dark: "text-gray-800",
  },
  header: "bg-gradient-to-r from-slate-700 to-slate-800",
  hover: "hover:bg-opacity-95",
};

const StandingsTable: React.FC<StandingsTableProps> = ({ standings }) => {
  if (!standings || !standings.standings || standings.standings.length === 0) {
    return (
      <div className="text-center mt-8 p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-100">
        <p className="text-gray-500">No standings data available.</p>
      </div>
    );
  }

  const tableData = standings.standings[0]?.table || [];

  const getPositionClasses = (position: number, totalTeams: number) => {
    if (position === 1) {
      return `${colors.champions} ${colors.text.light}`;
    } else if (position <= 4) {
      return `${colors.championsLeague} ${colors.text.light}`;
    } else if (position <= 6) {
      return `${colors.europaLeague} ${colors.text.light}`;
    } else if (position === 7) {
      return `${colors.conferenceLeague} ${colors.text.light}`;
    } else if (position > totalTeams - 3) {
      return `${colors.relegation} ${colors.text.light}`;
    }
    return "";
  };

  return (
    <div className="mt-4 sm:mt-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
        <span className="border-b-4 border-indigo-600 pb-1 text-gray-800">
          {standings.competition.name} Standings
        </span>
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className={`${colors.header} ${colors.text.light}`}>
              <th className="py-2 sm:py-3.5 px-2 sm:px-4 text-left font-semibold tracking-wider text-xs sm:text-sm">
                Pos
              </th>
              <th className="py-2 sm:py-3.5 px-2 sm:px-4 text-left font-semibold tracking-wider text-xs sm:text-sm">
                Team
              </th>
              <th className="py-2 sm:py-3.5 px-1 sm:px-4 text-center font-semibold tracking-wider text-xs sm:text-sm">
                MP
              </th>
              <th className="hidden xs:table-cell py-2 sm:py-3.5 px-1 sm:px-4 text-center font-semibold tracking-wider text-xs sm:text-sm">
                W
              </th>
              <th className="hidden xs:table-cell py-2 sm:py-3.5 px-1 sm:px-4 text-center font-semibold tracking-wider text-xs sm:text-sm">
                D
              </th>
              <th className="hidden xs:table-cell py-2 sm:py-3.5 px-1 sm:px-4 text-center font-semibold tracking-wider text-xs sm:text-sm">
                L
              </th>
              <th className="hidden sm:table-cell py-2 sm:py-3.5 px-1 sm:px-4 text-center font-semibold tracking-wider text-xs sm:text-sm">
                GD
              </th>
              <th className="py-2 sm:py-3.5 px-2 sm:px-4 text-center font-semibold tracking-wider text-xs sm:text-sm">
                Pts
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tableData.map((item) => {
              const positionClasses = getPositionClasses(
                item.position,
                tableData.length
              );
              return (
                <tr
                  key={item.position}
                  className={`${
                    positionClasses || "hover:bg-gray-50"
                  } transition-all duration-200 ease-in-out`}
                >
                  <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium whitespace-nowrap text-xs sm:text-base">
                    {item.position}
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4">
                    <div className="flex items-center">
                      {item.team.crest && (
                        <div className="h-5 w-5 sm:h-7 sm:w-7 mr-2 sm:mr-3 flex-shrink-0 overflow-hidden rounded-full bg-gray-100 border border-gray-200">
                          <img
                            src={item.team.crest}
                            alt={`${item.team.name} crest`}
                            className="h-full w-full object-contain p-0.5"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        </div>
                      )}
                      <span className="font-medium whitespace-nowrap text-xs sm:text-base truncate max-w-[100px] sm:max-w-none">
                        {item.team.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-2 sm:py-3 px-1 sm:px-4 text-center text-xs sm:text-base">
                    {item.playedGames}
                  </td>
                  <td className="hidden xs:table-cell py-2 sm:py-3 px-1 sm:px-4 text-center text-xs sm:text-base">
                    {item.won}
                  </td>
                  <td className="hidden xs:table-cell py-2 sm:py-3 px-1 sm:px-4 text-center text-xs sm:text-base">
                    {item.draw}
                  </td>
                  <td className="hidden xs:table-cell py-2 sm:py-3 px-1 sm:px-4 text-center text-xs sm:text-base">
                    {item.lost}
                  </td>
                  <td className="hidden sm:table-cell py-2 sm:py-3 px-1 sm:px-4 text-center text-xs sm:text-base">
                    {item.goalDifference}
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-center font-bold text-xs sm:text-base">
                    {item.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 sm:mt-6 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-xs sm:text-sm">
        <div className="group relative">
          <div
            className={`px-2 sm:px-3 py-1 sm:py-2 rounded-md text-center ${colors.champions} ${colors.text.light} shadow-sm`}
          >
            Champions
          </div>
          <div className="absolute hidden group-hover:block bg-white p-2 rounded shadow-lg text-xs z-10 bottom-full mb-1 left-1/2 transform -translate-x-1/2 w-max">
            League champion
          </div>
        </div>
        <div className="group relative">
          <div
            className={`px-2 sm:px-3 py-1 sm:py-2 rounded-md text-center ${colors.championsLeague} ${colors.text.light} shadow-sm`}
          >
            Champions League
          </div>
          <div className="absolute hidden group-hover:block bg-white p-2 rounded shadow-lg text-xs z-10 bottom-full mb-1 left-1/2 transform -translate-x-1/2 w-max">
            Champions League qualification
          </div>
        </div>
        <div className="group relative">
          <div
            className={`px-2 sm:px-3 py-1 sm:py-2 rounded-md text-center ${colors.europaLeague} ${colors.text.light} shadow-sm`}
          >
            Europa League
          </div>
          <div className="absolute hidden group-hover:block bg-white p-2 rounded shadow-lg text-xs z-10 bottom-full mb-1 left-1/2 transform -translate-x-1/2 w-max">
            Europa League qualification
          </div>
        </div>
        <div className="group relative">
          <div
            className={`px-2 sm:px-3 py-1 sm:py-2 rounded-md text-center ${colors.conferenceLeague} ${colors.text.light} shadow-sm`}
          >
            Conference League
          </div>
          <div className="absolute hidden group-hover:block bg-white p-2 rounded shadow-lg text-xs z-10 bottom-full mb-1 left-1/2 transform -translate-x-1/2 w-max">
            Conference League qualification
          </div>
        </div>
        <div className="group relative">
          <div
            className={`px-2 sm:px-3 py-1 sm:py-2 rounded-md text-center ${colors.relegation} ${colors.text.light} shadow-sm`}
          >
            Relegation
          </div>
          <div className="absolute hidden group-hover:block bg-white p-2 rounded shadow-lg text-xs z-10 bottom-full mb-1 left-1/2 transform -translate-x-1/2 w-max">
            Relegation to lower division
          </div>
        </div>
      </div>

      <div className="mt-3 sm:mt-4 text-xs text-gray-500 text-center">
        Hover over legend items for more information
      </div>
    </div>
  );
};

export default StandingsTable;
