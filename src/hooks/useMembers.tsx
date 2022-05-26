import { useQuery } from "react-query";
import { serverOptions } from "src/options";
import { IMember } from "src/types";
import { cleanTag, verifyError } from "src/utils";

const fetchClanMembers = async (clanTag: string) => {
  if (!clanTag) return;
  const url = `${serverOptions.proxyUrl}/clans/%23${cleanTag(clanTag)}/members`;
  const response = await fetch(url);
  const { data } = await response.json();
  if (data?.reason) throw new Error(verifyError(data.reason));
  const members: IMember[] = data?.items;
  return members;
};

const useMembers = (clanTag: string) => {
  return useQuery(["members", clanTag], () => fetchClanMembers(clanTag));
};

export default useMembers;
