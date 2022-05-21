import { IOptions, ITopValues } from "./types";

export const serverOptions = {
  proxyUrl: "https://crproxy.herokuapp.com",
};

export const defaultOptions: IOptions = {
  clanTag: "",
  awayMaxDays: "7",
  awayDangerDays: "3",
  warWeekFame: "900",
};
export const defaultFilter = "clanRank";

export const defaultTopValues: ITopValues = {
  currentRaceTopFame: 0,
  currentRaceTopBoatAttacks: 0,
  currentRaceTopDecksUsed: 0,
  lastRaceTopFame: 0,
  lastRaceTopBoatAttacks: 0,
  lastRaceTopDecksUsed: 0,
  previousRaceTopFame: 0,
  previousRaceTopBoatAttacks: 0,
  previousRaceTopDecksUsed: 0,
  donationsGiven: 0,
  donationsReceived: 0,
};
