export type TeamCode = "MA" | "BR";

export type Team = {
  code: TeamCode;
  logoSrc: string;
  logoAlt: string;
};

export type MatchScore = Record<TeamCode, number>;

export type MatchEventType = "goal" | "yellow";

export type MatchEventData = {
  id: string;
  teamCode: TeamCode;
  type: MatchEventType;
  minute: string;
};

export const teams: Team[] = [
  {
    code: "MA",
    logoAlt: "Moroccan flag",
    logoSrc:
      "https://images.fotmob.com/image_resources/logo/teamlogo/6262_small.png",
  },
  {
    code: "BR",
    logoAlt: "Brazilian flag",
    logoSrc:
      "https://images.fotmob.com/image_resources/logo/teamlogo/8256_small.png",
  },
];
export const initialScore: MatchScore = {
  MA: 1,
  BR: 0,
};

export const initialEvents: MatchEventData[] = [
  {
    id: "MA-goal-25",
    teamCode: "MA",
    type: "goal",
    minute: "25",
  },
];

export type MatchStatEvent = {
  id: string;
  teamCode: TeamCode;
  type: MatchEventType;
  minute: string;
  player: string;
};

export type MatchStatsData = {
  minute: string;
  possession: Record<TeamCode, number>;
  events: MatchStatEvent[];
};

export const matchStats: MatchStatsData = {
  minute: "82",
  possession: {
    MA: 55,
    BR: 45,
  },
  events: [
    {
      id: "ma-goal-saibari",
      teamCode: "MA",
      type: "goal",
      minute: "21",
      player: "Saibari",
    },
    {
      id: "br-goal-vinicius",
      teamCode: "BR",
      type: "goal",
      minute: "32",
      player: "Vinicius",
    },
    {
      id: "br-yellow-casemiro",
      teamCode: "BR",
      type: "yellow",
      minute: "37",
      player: "Casemiro",
    },
    {
      id: "br-yellow-ibanez",
      teamCode: "BR",
      type: "yellow",
      minute: "43",
      player: "Ibañez",
    },
  ],
};
