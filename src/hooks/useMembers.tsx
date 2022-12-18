import { useQuery } from "react-query";
import { IMember } from "src/types";
import { removeSymbolFromTag, verifyError } from "src/utils";

const fetchClanMembers = async (clanTag: string) => {
  if (!clanTag) return;
  const url = `/api/${removeSymbolFromTag(clanTag)}/members`;
  const response = await fetch(url);
  const data = await response.json();
  console.info({ fetchClanMembers: data });
  console.info("----------------");
  if (data?.reason) throw new Error(verifyError(data.reason));
  const members: IMember[] = data?.items;
  return members;
};

const useMembers = (clanTag: string) => {
  return useQuery(["members", clanTag], () => fetchClanMembers(clanTag));
};

export default useMembers;
