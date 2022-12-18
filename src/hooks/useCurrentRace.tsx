import { useQuery } from "react-query";
import { IClanCurrentRace } from "src/types";
import { removeSymbolFromTag } from "src/utils";

const fetchClanCurrentRace = async (clanTag: string) => {
  if (!clanTag) return;
  const url = `/api/${removeSymbolFromTag(clanTag)}/currentriverrace`;
  const response = await fetch(url);
  const data = await response.json();
  console.info({ fetchClanCurrentRace: data });
  console.info("----------------");
  if (data.reason) throw Error(data.reason);
  const currentRace: IClanCurrentRace = data?.clan;
  const currentRaceClans: IClanCurrentRace[] = data?.clans;
  const raceType = data.periodType;
  const clanRacePosition =
    currentRaceClans
      .sort((a, b) => b.periodPoints - a.periodPoints)
      .findIndex((clan) => clan.tag === clanTag) + 1;

  return { currentRace, raceType, clanRacePosition };
};

const useCurrentRace = (clanTag: string) => {
  return useQuery(["currentrace", clanTag], () =>
    fetchClanCurrentRace(clanTag)
  );
};

export default useCurrentRace;
