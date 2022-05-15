import { useEffect, useState } from "react";
import { IClanInfo, IMemberWithRaceFame, IOptions } from "src/types";
import { OptionsView } from "src/components/OptionsView";
import { defaultOptions } from "src/options";
import { NavigationBar } from "src/components/NavigationBar";
import { FooterBar } from "src/components/FooterBar";
import { MembersTable } from "src/components/MembersTable";
import { fetchData } from "src/utils";

const Home = () => {
  const [filter, setFilter] = useState("clanRank");
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [options, setOptions] = useState<IOptions>(defaultOptions);
  const [message, setMessage] = useState("");
  const [members, setMembers] = useState<IMemberWithRaceFame[] | null>(null);
  const [clanInformation, setClanInformation] = useState<IClanInfo | null>(
    null
  );

  const update = async (tag: string) => {
    setMessage("Fetching data...");
    const { members, clanInfo } = await fetchData(tag);
    if (!members || !clanInfo) {
      return setMessage(
        "Failed to fetch data, try another tag in the options menu"
      );
    }
    setMembers(members);
    setClanInformation(clanInfo);
  };

  useEffect(() => {
    const localOptions = localStorage.getItem("options") || "";
    if (!localOptions) return;
    const parsedLocal = JSON.parse(localOptions);

    if (!parsedLocal) {
      setOptions(defaultOptions);
      return;
    }

    setOptions(parsedLocal);
    update(parsedLocal.clanTag);
  }, []);

  useEffect(() => {
    setMembers(null);
    update(options.clanTag);
  }, [options]);

  const cleanUpOptions = (): void => {
    setOpenOptions(true);
  };

  return openOptions ? (
    <OptionsView
      updateOptions={setOptions}
      currentOptions={options}
      setOpenOptions={setOpenOptions}
    />
  ) : (
    <main className="bg-gray-700">
      <div className="flex flex-col w-screen h-screen max-w-4xl m-auto">
        <NavigationBar clanInfo={clanInformation} setFilter={setFilter} />

        {!members ? (
          <div className="h-full text-center text-white flex justify-center items-center">
            <p>{message}</p>
          </div>
        ) : (
          <div className="overflow-auto">
            <MembersTable members={members} filter={filter} options={options} />
          </div>
        )}
        <FooterBar cleanUpOptions={cleanUpOptions} />
      </div>
    </main>
  );
};

export default Home;
