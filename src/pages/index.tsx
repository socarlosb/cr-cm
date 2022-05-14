import { useEffect, useRef, useState } from "react";
import { IClanInfo, IMemberWithRaceFame, IOptions } from "src/types";
import { OptionsView } from "src/components/OptionsView";
import { defaultOptions } from "src/options";
import { NavigationBar } from "src/components/NavigationBar";
import { FooterBar } from "src/components/FooterBar";
import { MembersTable } from "src/components/MembersTable";
import { fetchData } from "src/utils";

const Home = () => {
  const docRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("clanRank");
  const [options, setOptions] = useState<IOptions | null>(null);
  const [members, setMembers] = useState<IMemberWithRaceFame[] | null>(null);
  const [clanInformation, setClanInformation] = useState<IClanInfo | null>(
    null
  );

  useEffect(() => {
    const update = async () => {
      const { members, clanInfo } = await fetchData(parsedLocal.clanTag);
      setMembers(members);
      setClanInformation(clanInfo);
    };

    if (docRef.current) return;
    const local = localStorage.getItem("options") || "";
    if (!local) return;
    const parsedLocal = JSON.parse(local);

    if (!parsedLocal) return;
    setOptions(parsedLocal);
    update();

    console.info({ options });
    console.info("----------------");
  }, []);

  const cleanUpOptions = (): void => {
    if (!options) return;
    localStorage.removeItem("options");
    document.cookie = `clanTag=${options.clanTag};max-age-0`;
    setMembers(null);
  };

  return options ? (
    <main ref={docRef} className="bg-gray-700">
      <div className="flex flex-col w-screen h-screen max-w-4xl m-auto">
        <NavigationBar clanInfo={clanInformation} setFilter={setFilter} />
        <div className="h-full">
          {!members ? (
            <div className="h-full text-center text-white flex justify-center items-center">
              <p>Fetching data...</p>
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
        </div>
        <FooterBar cleanUpOptions={cleanUpOptions} />
      </div>
    </main>
  ) : (
    <OptionsView setMembers={setMembers} setClanInfo={setClanInformation} />
  );
};

export default Home;
