import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Layout from "src/components/Layout";
import { MembersTable } from "src/components/MembersTable";
import { NavigationBar } from "src/components/NavigationBar";
import { OptionsForm } from "src/components/OptionsForm";
import useCurrentRace from "src/hooks/useCurrentRace";
import useMembers from "src/hooks/useMembers";
import useRaceLog from "src/hooks/useRaceLog";
import { IconSpinner } from "src/icons";
import { defaultFilter, defaultOptions } from "src/options";
import { IClanInfo, IMemberWithRaceFame, IOptions } from "src/types";
import { isAnError, parseClanMembersRaceFame } from "src/utils";

const Home = () => {
  const [filter, setFilter] = useState(defaultFilter);
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [options, setOptions] = useState<IOptions>(defaultOptions);
  const [parsedMembers, setParsedMembers] = useState<
    IMemberWithRaceFame[] | null
  >(null);
  const [clanInformation, setClanInformation] = useState<IClanInfo | null>(
    null
  );
  const [warState, setWarState] = useState<string | null>(null);

  const { clanTag } = options;

  const { data: members, isError, error, isLoading } = useMembers(clanTag);
  const { data: riverracelog } = useRaceLog(clanTag);
  const { data: currentriverrace } = useCurrentRace(clanTag);

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
      currentriverrace.currentRace
    ).then((parsedMembers) => {
      const clanInfo = {
        clanTag: currentriverrace.currentRace.tag,
        clanName: currentriverrace.currentRace.name,
        clanTotalMembers: members.length,
        clanRacePosition: currentriverrace.clanRacePosition,
        clanRaceType: currentriverrace.raceType,
        clanRaceFame: currentriverrace.currentRace.fame,
        clanRacePoints: currentriverrace.currentRace.periodPoints,
      };
      setWarState(currentriverrace.raceType);
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
    <Layout>
      <NavigationBar
        clanInfo={clanInformation}
        setFilter={handleFilter}
        filter={filter}
        openOptions={openOptions}
        setOpenOptions={setOpenOptions}
      />

      {openOptions ? (
        <AnimatePresence exitBeforeEnter>
          <OptionsForm
            updateOptions={setOptions}
            currentOptions={options}
            setOpenOptions={setOpenOptions}
          />
        </AnimatePresence>
      ) : (
        <div className="h-full overflow-hidden overflow-y-auto">
          <>
            {isLoading && (
              <div className="flex h-full items-center justify-center text-center text-white">
                <IconSpinner width={80} height={80} />
              </div>
            )}

            {isAnError(error) && (
              <div className="flex h-screen items-center justify-center text-center text-white">
                {error?.message}
              </div>
            )}

            {!isLoading && parsedMembers && (
              <MembersTable
                members={parsedMembers}
                filter={filter}
                options={options}
                warState={warState}
              />
            )}
          </>
        </div>
      )}
    </Layout>
  );
};

export default Home;
