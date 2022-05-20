import { useEffect, useState } from "react";
import { IClanInfo, IMemberWithRaceFame, IOptions } from "src/types";
import { OptionsView } from "src/components/OptionsView";
import { defaultFilter, defaultOptions } from "src/options";
import { NavigationBar } from "src/components/NavigationBar";
import { FooterBar } from "src/components/FooterBar";
import { MembersTable } from "src/components/MembersTable";
import { fetchData } from "src/utils";

const Home = () => {
  const [filter, setFilter] = useState(defaultFilter);
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [oldTag, setOldTag] = useState(defaultOptions.clanTag);
  const [options, setOptions] = useState<IOptions>(defaultOptions);
  const [message, setMessage] = useState("");
  const [members, setMembers] = useState<IMemberWithRaceFame[] | null>(null);
  const [clanInformation, setClanInformation] = useState<IClanInfo | null>(
    null
  );

  const update = async (tag: string) => {
    setMessage("Updating data...");
    setOldTag(options.clanTag);
    const { members, clanInfo } = await fetchData(tag);
    if (!members || !clanInfo) {
      return setMessage(
        "Failed to fetch data, try another tag in the options menu"
      );
    }
    setClanInformation(clanInfo);
    setOldTag(clanInformation?.clanTag || defaultOptions.clanTag);
    setMembers(members);
  };

  useEffect(() => {
    const localOptions = localStorage.getItem("options") || "";
    const parsedLocal = localOptions ? JSON.parse(localOptions) : null;
    if (!parsedLocal) {
      localStorage.setItem("options", JSON.stringify(defaultOptions));
      setOptions(defaultOptions);
      if (defaultOptions.clanTag === "") return setOpenOptions(true);
      if (members && members?.length > 0 && defaultOptions.clanTag === oldTag)
        return;
      update(defaultOptions.clanTag);
    } else {
      if (members && members?.length > 0 && parsedLocal.clanTag === oldTag)
        return;
      setOptions(parsedLocal);
      update(parsedLocal.clanTag);
    }

    const localFilter = localStorage.getItem("filter") || "";
    const parsedLocalFilter = localFilter ? JSON.parse(localFilter) : null;
    if (!parsedLocalFilter) {
      localStorage.setItem("filter", JSON.stringify(defaultFilter));
      setFilter(defaultFilter);
    } else {
      setFilter(parsedLocalFilter);
    }
  }, []);

  useEffect(() => {
    setMembers(null);
    update(options.clanTag);
  }, [options]);

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

            {!members ? (
              <div className="h-full text-center text-white flex justify-center items-center">
                <p>{message}</p>
              </div>
            ) : (
              <div className="overflow-auto">
                <MembersTable
                  members={members}
                  filter={filter}
                  options={options}
                />
              </div>
            )}
          </>
        )}
        <FooterBar setOpenOptions={setOpenOptions} openOptions={openOptions} />
      </div>
    </main>
  );
};

export default Home;
