export interface TeamStanding {
  position: number;
  team: {
    name: string;
    crest?: string;
  };
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalDifference: number;
}

export interface StandingsData {
  competition: {
    name: string;
    emblem?: string;
  };
  standings: {
    table: TeamStanding[];
  }[];
}
