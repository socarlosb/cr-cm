import { useQuery } from "react-query";
import { serverOptions } from "src/options";
import { IRaceLog } from "src/types";
import { cleanTag } from "src/utils";

const fetchClanRaceLog = async (clanTag: string) => {
  if (!clanTag) return;
  const url = `${serverOptions.proxyUrl}/clans/%23${cleanTag(
    clanTag
  )}/riverracelog`;
  const response = await fetch(url);
  const { data } = await response.json();
  if (data.reason) throw Error(data.reason);
  const raceLog: IRaceLog[] = data?.items;
  return raceLog;
};

const useRaceLog = (clanTag: string) => {
  return useQuery(["racelog", clanTag], () => fetchClanRaceLog(clanTag));
};

export default useRaceLog;
