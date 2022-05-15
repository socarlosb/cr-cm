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

const cleanTag = (clanTag: string) => clanTag.replace("#", "");

export const parseTag = (clanTag: string) => {
  return clanTag.startsWith("#") ? clanTag : `#${clanTag}`;
};

export const getClanMembers = async (clanTag: string): Promise<IMember[]> => {
  const url = `${serverOptions.proxyUrl}/clans/%23${cleanTag(clanTag)}/members`;

  const response = await fetch(url);
  const { data } = await response.json();

  const members = data?.items;
  return members;
};

export const getClanRaceLog = async (clanTag: string): Promise<IRaceLog[]> => {
  const url = `${serverOptions.proxyUrl}/clans/%23${cleanTag(
    clanTag
  )}/riverracelog`;

  const response = await fetch(url);
  const { data } = await response.json();

  const raceLog: IRaceLog[] = data?.items;
  return raceLog;
};

export const getClanCurrentRace = async (
  clanTag: string
): Promise<IClanCurrentRace> => {
  const url = `${serverOptions.proxyUrl}/clans/%23${cleanTag(
    clanTag
  )}/currentriverrace`;

  const response = await fetch(url);
  const { data } = await response.json();

  const currentRace: IClanCurrentRace = data?.clan;
  return currentRace;
};

const getClanMembersWithRaceFame = (
  members: IMember[],
  currentRaceParticipants: IParticipants[],
  lastRaceParticipants: IParticipants[],
  previousRaceParticipants: IParticipants[]
) => {
  return members.map((member) => {
    const { tag } = member;

    const currentRace = {
      currentRaceFame:
        currentRaceParticipants.filter(
          (participant) => participant.tag === tag
        )[0]?.fame || "-",
      currentRaceDecksUsed:
        currentRaceParticipants.filter(
          (participant) => participant.tag === tag
        )[0]?.decksUsed || "-",
      currentRaceDecksUsedToday:
        currentRaceParticipants.filter(
          (participant) => participant.tag === tag
        )[0]?.decksUsedToday || "-",
      currentRaceBoatAttacks:
        currentRaceParticipants.filter(
          (participant) => participant.tag === tag
        )[0]?.boatAttacks || "-",
    };

    const lastRace = {
      lastRaceFame:
        lastRaceParticipants.filter((participant) => participant.tag === tag)[0]
          ?.fame || "-",
      lastRaceDecksUsed:
        lastRaceParticipants.filter((participant) => participant.tag === tag)[0]
          ?.decksUsed || "-",
      lastRaceBoatAttacks:
        lastRaceParticipants.filter((participant) => participant.tag === tag)[0]
          ?.boatAttacks || "-",
    };
    const previousRace = {
      previousRaceFame:
        previousRaceParticipants.filter(
          (participant) => participant.tag === tag
        )[0]?.fame || "-",
      previousRaceDecksUsed:
        previousRaceParticipants.filter(
          (participant) => participant.tag === tag
        )[0]?.decksUsed || "-",
      previousRaceBoatAttacks:
        previousRaceParticipants.filter(
          (participant) => participant.tag === tag
        )[0]?.boatAttacks || "-",
    };

    return {
      ...member,
      ...currentRace,
      ...lastRace,
      ...previousRace,
    };
  });
};

export const getClanMembersRaceFame = async (
  clanTag: string,
  members: IMember[],
  raceLog: IRaceLog[],
  currentRace: IClanCurrentRace
): Promise<IMemberWithRaceFame[]> => {
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
    getClanMembersWithRaceFame(
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
      return "text-blue-400";
    case "coleader":
      return "text-green-400";
    case "elder":
      return "text-orange-400";
    case "member":
      return "text-gray-400";
    default:
      return "text-gray-400";
  }
};

export const fetchData = async (clanTag: string) => {
  try {
    const riverRaceLog = await getClanRaceLog(clanTag);
    const members = await getClanMembers(clanTag);
    const currentRace = await getClanCurrentRace(clanTag);
    const membersWithRaceLog = await getClanMembersRaceFame(
      clanTag,
      members,
      riverRaceLog,
      currentRace
    );
    const clanInfo = {
      clanTag: currentRace?.tag,
      clanName: currentRace?.name,
    };
    return { members: membersWithRaceLog, clanInfo };
  } catch (error) {
    return { members: null, clanInfo: null };
  }
};

export const sorter = (filter: string): ((a: any, b: any) => number) => {
  return (a, b) => (a[filter] > b[filter] ? 1 : -1);
};
