import { useQuery } from "react-query";
import { IRaceLog } from "src/types";
import { removeSymbolFromTag, verifyError } from "src/utils";

const fetchClanRaceLog = async (clanTag: string) => {
  if (!clanTag) return;
  const url = `/api/${removeSymbolFromTag(clanTag)}/riverracelog`;
  const response = await fetch(url);
  const data = await response.json();
  console.info({ fetchClanRaceLog: data });
  console.info("----------------");
  if (data.reason) throw new Error(verifyError(data.reason));
  const raceLog: IRaceLog[] = data?.items;
  return raceLog;
};

const useRaceLog = (clanTag: string) => {
  return useQuery(["racelog", clanTag], () => fetchClanRaceLog(clanTag));
};

export default useRaceLog;
