import { IOptions, ITopValues } from "./types";

export const serverOptions = {
  proxyUrl: "https://crproxy.herokuapp.com",
};

export const defaultOptions: IOptions = {
  clanTag: "",
  awayMaxDays: 7,
  awayDangerDays: 3,
  warWeekFame: 900,
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

export const getArenaImage = (arenaId: number) => {
  let arenaImage = "";
  switch (arenaId) {
    case 54000021:
      arenaImage = "/arena/arena24.png";
      break;
    case 54000020:
      arenaImage = "/arena/arena23.png";
      break;
    case 54000019:
      arenaImage = "/arena/arena22.png";
      break;
    case 54000018:
      arenaImage = "/arena/arena21.png";
      break;
    case 54000017:
      arenaImage = "/arena/arena20.png";
      break;
    case 54000016:
      arenaImage = "/arena/arena19.png";
      break;
    case 54000015:
      arenaImage = "/arena/arena18.png";
      break;
    case 54000014:
      arenaImage = "/arena/arena17.png";
      break;
    case 54000013:
      arenaImage = "/arena/arena16.png";
      break;
    case 54000012:
      arenaImage = "/arena/arena15.png";
      break;

    default:
      arenaImage = "/trophy.webp";
      break;
  }
  return arenaImage;
};
