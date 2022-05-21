import { differenceInDays, formatDistanceToNowStrict } from "date-fns";
import { serverOptions } from "./options";

import type {
  IClanCurrentRace,
  IMember,
  IMemberWithRaceFame,
  IParticipants,
  IRaceLog,
  IStandings,
} from "./types";

export const cleanTag = (clanTag: string) => clanTag.replace("#", "");

export const parseTag = (clanTag: string) => {
  return clanTag.startsWith("#") ? clanTag : `#${clanTag}`;
};

export const fetchClanMembers = async (_url: string, clanTag: string) => {
  if (!clanTag) return;
  const url = `${serverOptions.proxyUrl}/clans/%23${cleanTag(clanTag)}${_url}`;
  const response = await fetch(url);
  const { data } = await response.json();
  if (data?.reason) throw Error(data.reason);
  const members: IMember[] = data?.items;
  return members;
};

export const fetchClanRaceLog = async (_url: string, clanTag: string) => {
  if (!clanTag) return;
  const url = `${serverOptions.proxyUrl}/clans/%23${cleanTag(clanTag)}${_url}`;
  const response = await fetch(url);
  const { data } = await response.json();
  if (data.reason) throw Error(data.reason);
  const raceLog: IRaceLog[] = data?.items;
  return raceLog;
};

export const fetchClanCurrentRace = async (_url: string, clanTag: string) => {
  const url = `${serverOptions.proxyUrl}/clans/%23${cleanTag(clanTag)}${_url}`;
  const response = await fetch(url);
  const { data } = await response.json();
  if (data.reason) throw Error(data.reason);
  const currentRace: IClanCurrentRace = data?.clan;
  return currentRace;
};

const parseClanMembersWithRaceFame = (
  members: IMember[],
  currentRaceParticipants: IParticipants[],
  lastRaceParticipants: IParticipants[],
  previousRaceParticipants: IParticipants[]
) => {
  return members.map((member) => {
    const { tag } = member;

    const calcCurrentRace = currentRaceParticipants.filter(
      (participant) => participant.tag === tag
    );
    const currentRaceFame = calcCurrentRace[0] ? calcCurrentRace[0]?.fame : "-";
    const currentRaceDecksUsed = calcCurrentRace[0]
      ? calcCurrentRace[0]?.decksUsed
      : "-";
    const currentRaceDecksUsedToday = calcCurrentRace[0]
      ? calcCurrentRace[0]?.decksUsedToday
      : "-";
    const currentRaceBoatAttacks = calcCurrentRace[0]
      ? calcCurrentRace[0]?.boatAttacks
      : "-";

    const currentRace = {
      currentRaceFame,
      currentRaceDecksUsed,
      currentRaceDecksUsedToday,
      currentRaceBoatAttacks,
    };

    const calcLastRace = lastRaceParticipants.filter(
      (participant) => participant.tag === tag
    );
    const lastRaceFame = calcLastRace[0] ? calcLastRace[0]?.fame : "-";
    const lastRaceDecksUsed = calcLastRace[0]
      ? calcLastRace[0]?.decksUsed
      : "-";
    const lastRaceBoatAttacks = calcLastRace[0]
      ? calcLastRace[0]?.boatAttacks
      : "-";

    const lastRace = {
      lastRaceFame,
      lastRaceDecksUsed,
      lastRaceBoatAttacks,
    };

    const calcPreviousRace = previousRaceParticipants.filter(
      (participant) => participant.tag === tag
    );
    const previousRaceFame = calcPreviousRace[0]
      ? calcPreviousRace[0]?.fame
      : "-";
    const previousRaceDecksUsed = calcPreviousRace[0]
      ? calcPreviousRace[0]?.decksUsed
      : "-";
    const previousRaceBoatAttacks = calcPreviousRace[0]
      ? calcPreviousRace[0]?.boatAttacks
      : "-";
    const previousRace = {
      previousRaceFame,
      previousRaceDecksUsed,
      previousRaceBoatAttacks,
    };

    return {
      ...member,
      ...currentRace,
      ...lastRace,
      ...previousRace,
    };
  });
};

export const parseClanMembersRaceFame = async (
  clanTag: string,
  members: IMember[],
  raceLog: IRaceLog[],
  currentRace: IClanCurrentRace
) => {
  const getClanStatsOfRace = (race: IRaceLog) => {
    return race.standings.filter((standing) => {
      const { clan } = standing;
      return clan.tag === clanTag;
    })[0];
  };

  const lastRace: IStandings = getClanStatsOfRace(raceLog[0]);
  const previousRace: IStandings = getClanStatsOfRace(raceLog[1]);

  const currentRaceParticipants: IParticipants[] = currentRace?.participants;
  const lastRaceParticipants: IParticipants[] = lastRace?.clan.participants;
  const previousRaceParticipants: IParticipants[] =
    previousRace?.clan.participants;

  const clanMembersWithRaceFame: IMemberWithRaceFame[] =
    parseClanMembersWithRaceFame(
      members,
      currentRaceParticipants,
      lastRaceParticipants,
      previousRaceParticipants
    );

  return clanMembersWithRaceFame;
};

export const parseDate = (date: string) => {
  const fullDate = date.split(".")[0];
  const simpleDate = fullDate.split("T")[0];

  const year = parseInt(simpleDate.slice(0, 4));
  const month = parseInt(simpleDate.slice(4, 6)) - 1;
  const day = parseInt(simpleDate.slice(6, 8));

  const dateReceived = new Date(year, month, day);

  return formatDistanceToNowStrict(dateReceived, {
    addSuffix: true,
    roundingMethod: "floor",
    unit: "day",
  });
};

export const dateInDays = (date: string) => {
  const fullDate = date.split(".")[0];
  const simpleDate = fullDate.split("T")[0];

  const year = parseInt(simpleDate.slice(0, 4));
  const month = parseInt(simpleDate.slice(4, 6)) - 1;
  const day = parseInt(simpleDate.slice(6, 8));

  const dateReceived = new Date(year, month, day);
  return differenceInDays(new Date(), dateReceived);
};

export const colorMemberRole = (role: string) => {
  switch (role.toLowerCase()) {
    case "leader":
      return "text-purple-400";
    case "coleader":
      return "text-blue-400";
    case "elder":
      return "text-sky-400";
    default:
      return "text-gray-400";
  }
};

// export const fetchData = async (clanTag: string) => {
//   try {
//     const cleanClanTag = cleanTag(clanTag).toUpperCase();
//     const riverRaceLog = await getClanRaceLog(cleanClanTag);
//     const members = await getClanMembers(cleanClanTag);
//     const currentRace = await getClanCurrentRace(cleanClanTag);
//     const membersWithRaceLog = await getClanMembersRaceFame(
//       parseTag(cleanClanTag),
//       members,
//       riverRaceLog,
//       currentRace
//     );
//     const clanInfo = {
//       clanTag: currentRace?.tag,
//       clanName: currentRace?.name,
//     };
//     console.info({ clanInfo, membersWithRaceLog });
//     console.info("----------------");
//     return { members: membersWithRaceLog, clanInfo };
//   } catch (error) {
//     throw new Error(
//       "Failed to fetch data, try another tag in the options menu"
//     );
//   }
// };

export const sorter = (filter: string): ((a: any, b: any) => number) => {
  if (
    filter === "currentRaceDecksUsed" ||
    filter === "currentRaceBoatAttacks" ||
    filter === "currentRaceFame" ||
    filter === "lastRaceFame" ||
    filter === "lastRaceDecksUsed" ||
    filter === "lastRaceBoatAttacks"
  ) {
    return (a, b) =>
      a[filter] === "-"
        ? 1
        : b[filter] === "-"
        ? -1
        : a[filter] > b[filter]
        ? -1
        : 1;
  }

  return (a, b) => (a[filter] > b[filter] ? 1 : -1);
};

export const getTopValues = (members: any[], filter: string) => {
  const maxValue = members.reduce((acc, member) => {
    const value = member[filter];
    if (value > acc) {
      return value;
    }
    return acc;
  }, 0);

  return maxValue;
};
