import { useEffect, useState } from "react";
import { IClanInfo, IMemberWithRaceFame, IOptions } from "src/types";
import { OptionsView } from "src/components/OptionsView";
import { defaultFilter, defaultOptions } from "src/options";
import { NavigationBar } from "src/components/NavigationBar";
import { FooterBar } from "src/components/FooterBar";
import { MembersTable } from "src/components/MembersTable";
import {
  fetchClanCurrentRace,
  fetchClanMembers,
  fetchClanRaceLog,
  parseClanMembersRaceFame,
} from "src/utils";
import useSWR from "swr";

const Home = () => {
  const [filter, setFilter] = useState(defaultFilter);
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [options, setOptions] = useState<IOptions>(defaultOptions);
  const [message, setMessage] = useState("");
  const [parsedMembers, setParsedMembers] = useState<
    IMemberWithRaceFame[] | null
  >(null);
  const [clanInformation, setClanInformation] = useState<IClanInfo | null>(
    null
  );

  const { data: members, error: membersError } = useSWR(
    [`/members`, options.clanTag],
    fetchClanMembers
  );
  const { data: riverracelog, error: riverracelogError } = useSWR(
    [`/riverracelog`, options.clanTag],
    fetchClanRaceLog
  );
  const { data: currentriverrace, error: currentriverraceError } = useSWR(
    [`/currentriverrace`, options.clanTag],
    fetchClanCurrentRace
  );

  useEffect(() => {
    const localOptions = localStorage.getItem("options") || "";
    if (localOptions) return setOptions(JSON.parse(localOptions));
    if (options.clanTag === "") return setOpenOptions(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!members) return;
    if (!riverracelog) return;
    if (!currentriverrace) return;
    parseClanMembersRaceFame(
      options.clanTag,
      members,
      riverracelog,
      currentriverrace
    ).then((parsedMembers) => {
      const clanInfo = {
        clanTag: currentriverrace?.tag,
        clanName: currentriverrace?.name,
        clanTotalMembers: members.length,
      };
      setParsedMembers(parsedMembers);
      setClanInformation(clanInfo);
    });
  }, [currentriverrace, members, options.clanTag, riverracelog]);

  useEffect(() => {
    const localFilter = localStorage.getItem("filter") || "";
    const parsedLocalFilter = localFilter ? JSON.parse(localFilter) : null;
    if (!parsedLocalFilter) {
      localStorage.setItem("filter", JSON.stringify(defaultFilter));
      setFilter(defaultFilter);
    } else {
      setFilter(parsedLocalFilter);
    }
  }, []);

  const handleFilter = (newFilter: string) => {
    localStorage.setItem("filter", JSON.stringify(newFilter));
    setFilter(newFilter);
  };

  return (
    <main className="bg-gray-700">
      <div className="flex flex-col w-screen h-screen max-w-4xl m-auto ring-2 ring-gray-900 rounded-t-md rounded-b-md">
        {openOptions ? (
          <OptionsView
            updateOptions={setOptions}
            currentOptions={options}
            setOpenOptions={setOpenOptions}
          />
        ) : (
          <>
            <NavigationBar
              clanInfo={clanInformation}
              setFilter={handleFilter}
              filter={filter}
            />
            <div className="overflow-auto">
              {membersError ? (
                <div className="h-screen text-center text-white flex justify-center items-center">
                  {membersError.message}
                </div>
              ) : (
                <>
                  {parsedMembers ? (
                    <MembersTable
                      members={parsedMembers}
                      filter={filter}
                      options={options}
                    />
                  ) : (
                    <div className="h-screen text-center text-white flex justify-center items-center">
                      <p>Loading...</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
        <FooterBar setOpenOptions={setOpenOptions} openOptions={openOptions} />
      </div>
    </main>
  );
};

export default Home;
