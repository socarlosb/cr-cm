import { useQuery } from "react-query";
import { serverOptions } from "src/options";
import { IClanCurrentRace } from "src/types";
import { removeSymbolFromTag } from "src/utils";

const fetchClanCurrentRace = async (clanTag: string) => {
  const url = `${serverOptions.proxyUrl}/clans/%23${removeSymbolFromTag(
    clanTag
  )}/currentriverrace`;
  const response = await fetch(url);
  const { data } = await response.json();
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
