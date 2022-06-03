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
        <div className="overflow-auto">
          <>
            {isLoading && (
              <div className="flex h-screen items-center justify-center text-center text-white">
                <IconSpinner />
              </div>
            )}

            {isAnError(error) && (
              <div className="flex h-screen items-center justify-center text-center text-white">
                {error?.message}
              </div>
            )}

            {parsedMembers && (
              <MembersTable
                members={parsedMembers}
                filter={filter}
                options={options}
              />
            )}
          </>
        </div>
      )}
    </Layout>
  );
};

export default Home;
