export interface IMember {
  tag: string;
  name: string;
  role: string;
  lastSeen: string;
  expLevel: number;
  trophies: number;
  arena: {
    id: number;
    name: string;
  };
  clanRank: number;
  previousClanRank: number;
  donations: number;
  donationsReceived: number;
  clanChestPoints: number;
}

export interface IMemberWithRaceFame extends IMember {
  currentRaceFame: number | string;
  currentRaceDecksUsed: number | string;
  currentRaceDecksUsedToday: number | string;
  currentRaceBoatAttacks: number | string;
  lastRaceFame: number | string;
  lastRaceDecksUsed: number | string;
  lastRaceBoatAttacks: number | string;
  previousRaceFame: number | string;
  previousRaceDecksUsed: number | string;
  previousRaceBoatAttacks: number | string;
}

export interface IParticipants {
  tag: string;
  name: string;
  fame: number;
  repairPoints: number;
  boatAttacks: number;
  decksUsed: number;
  decksUsedToday: number;
}

export interface IStandings {
  rank: number;
  trophyChange: number;
  clan: {
    tag: string;
    name: string;
    badgeId: number;
    fame: number;
    finishTime: string;
    periodPoints: number;
    clanScore: number;
    participants: [IParticipants];
  };
}

export interface IRaceLog {
  seasonId: number;
  sectionIndex: number;
  createdDate: string;
  standings: [IStandings];
}

export interface IClanCurrentRace {
  tag: string;
  name: string;
  badgeId: number;
  fame: number;
  clanScore: number;
  participants: [IParticipants];
}

export interface IOptions {
  clanTag: string;
  awayMaxDays: number;
  awayDangerDays: number;
  warWeekFame: number;
}

export interface IClanInfo {
  clanTag: string;
  clanName: string;
  clanTotalMembers: number;
  clanRacePosition: number;
  clanRaceFame: number;
  clanRaceType: string;
}

export interface ITopValues {
  donationsGiven: number;
  donationsReceived: number;
  currentRaceTopFame: number;
  currentRaceTopDecksUsed: number;
  currentRaceTopBoatAttacks: number;
  lastRaceTopFame: number;
  lastRaceTopDecksUsed: number;
  lastRaceTopBoatAttacks: number;
  previousRaceTopFame: number;
  previousRaceTopDecksUsed: number;
  previousRaceTopBoatAttacks: number;
}
