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
  return currentRace;
};

const useCurrentRace = (clanTag: string) => {
  return useQuery(["currentrace", clanTag], () =>
    fetchClanCurrentRace(clanTag)
  );
};

export default useCurrentRace;
