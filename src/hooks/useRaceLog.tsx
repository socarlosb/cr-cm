import { useQuery } from "react-query";
import { serverOptions } from "src/options";
import { IRaceLog } from "src/types";
import { RemoveSymbolFromTag, verifyError } from "src/utils";

const fetchClanRaceLog = async (clanTag: string) => {
  if (!clanTag) return;
  const url = `${serverOptions.proxyUrl}/clans/%23${RemoveSymbolFromTag(
    clanTag
  )}/riverracelog`;
  const response = await fetch(url);
  const { data } = await response.json();
  if (data.reason) throw new Error(verifyError(data.reason));
  const raceLog: IRaceLog[] = data?.items;
  return raceLog;
};

const useRaceLog = (clanTag: string) => {
  return useQuery(["racelog", clanTag], () => fetchClanRaceLog(clanTag));
};

export default useRaceLog;
