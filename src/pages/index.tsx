import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import { defaultOptions } from "src/options";
import { IMemberWithRaceFame, IOptions } from "src/types";
import {
  dateInDays,
  getClanCurrentRace,
  getClanMembers,
  getClanMembersRaceFame,
  getClanRaceLog,
  parseDate,
} from "src/utils";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const clanTag = context.req.cookies.clanTag;

  if (!clanTag) {
    context.res.writeHead(302, {
      Location: "/options",
    });
    context.res.end();
    return { props: {} };
  }

  const riverRaceLog = await getClanRaceLog(clanTag);
  const members = await getClanMembers(clanTag);
  const currentRace = await getClanCurrentRace(clanTag);
  const membersWithRaceLog = await getClanMembersRaceFame(
    clanTag,
    members,
    riverRaceLog,
    currentRace
  );
  const clanInfo = {
    clanTag: currentRace?.tag,
    clanName: currentRace?.name,
  };

  return {
    props: { members: membersWithRaceLog, clanInfo },
  };
};

interface IProps {
  members: [];
  clanInfo: {
    clanTag: string;
    clanName: string;
  };
}

const Home = ({ members, clanInfo }: IProps) => {
  const [filter, setFilter] = useState("clanRank");
  const [options, setOptions] = useState<IOptions>(defaultOptions);
  useState(() => {
    let local;
    if (typeof window !== "undefined") {
      local = JSON.parse(localStorage.getItem("options") || "{}");
    }

    if (local?.clanTag) {
      setOptions(local);
    }
  }, []);

  const handleOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.currentTarget.value);
  };

  return (
    <main className="bg-gray-700">
      <div className="flex flex-col w-screen h-screen max-w-lg m-auto">
        <div className="sticky top-0 bg-gray-900 text-center text-white p-4 pb-2 rounded-t-md flex justify-between items-center">
          <div>
            <label className="text-xs">Order by:</label>
            <select
              className="bg-gray-900 text-xs focus:outline-none transition ease-in-out duration-150 px-2 py-1 rounded-l-md"
              name="orderBy"
              title="Order by"
              onChange={handleOrder}
            >
              <option selected value="clanRank">
                Trophies
              </option>
              <option value="lastSeen">Last seen</option>
            </select>
          </div>
          <h1 className="text-xl font-medium">{clanInfo.clanName}</h1>
        </div>
        <div className="overflow-auto">
          <table className="w-full relative">
            <thead className="">
              <tr>
                <th
                  scope="col"
                  className="text-xs font-medium text-white py-4 text-center sticky top-0 border-b bg-gray-800"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="text-xs font-medium text-white py-4 text-left sticky top-0 border-b bg-gray-800"
                >
                  Member
                </th>
                <th
                  scope="col"
                  className="text-xs font-medium text-white py-4 text-left sticky top-0 border-b bg-gray-800"
                >
                  Stats
                </th>
              </tr>
            </thead>
            <tbody>
              {members
                .sort((a, b) => (a[filter] > b[filter] ? 1 : -1))
                .map((member: IMemberWithRaceFame) => (
                  <tr
                    key={member.tag}
                    className="bg-white border-b hover:bg-gray-100"
                  >
                    <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center px-2">
                      <p>{member.clanRank}</p>
                      <span className="text-xs text-gray-500">
                        ({member.previousClanRank})
                      </span>
                    </td>
                    <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap">
                      <h3 className="font-semibold py-0.5">{member.name}</h3>
                      <p className="text-gray-400 text-xs uppercase py-0.5">
                        {member.role}
                      </p>
                      <p
                        className={`text-gray-600 text-xs ${
                          dateInDays(member.lastSeen) >=
                          parseInt(options.awayMaxDays)
                            ? "text-red-400 font-bold"
                            : dateInDays(member.lastSeen) >=
                              parseInt(options.awayDangerDays)
                            ? "text-orange-400 font-bold"
                            : ""
                        }`}
                      >
                        Online {parseDate(member.lastSeen)}
                      </p>
                    </td>
                    <td className="text-xs text-gray-800 font-light py-2 whitespace-nowrap">
                      <p>Trophies: {member.trophies}</p>
                      <div className="flex flex-wrap">
                        <p>Donations: (</p>
                        <p>Given: {member.donations}</p>
                        <p> | Received: {member.donationsReceived})</p>
                      </div>
                      <div className="flex flex-wrap">
                        <p>Current Race: (</p>
                        <p
                          className={`${
                            member.currentRaceFame <
                            parseInt(options.warWeekFame)
                              ? "text-red-400 font-bold"
                              : ""
                          }`}
                        >
                          Fame: {member.currentRaceFame}
                        </p>
                        <p> | Decks: {member.currentRaceDecksUsed}</p>
                        <p> | Today: {member.currentRaceDecksUsedToday}</p>
                        <p> | Boats: {member.currentRaceBoatAttacks})</p>
                      </div>
                      <div className="flex flex-wrap">
                        <p>Last Race: (</p>
                        <p
                          className={`${
                            member.lastRaceFame < parseInt(options.warWeekFame)
                              ? "text-red-400 font-bold"
                              : ""
                          }`}
                        >
                          Fame: {member.lastRaceFame}
                        </p>
                        <p> | Decks: {member.lastRaceDecksUsed}</p>
                        <p> | Boats: {member.lastRaceBoatAttacks})</p>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <footer className="sticky top-0 bg-gray-800 text-center text-white rounded-b-md p-4 flex justify-between items-center">
          <p className="text-sm font-light">@2022</p>
          <Link href="/options">
            <a className="text-sm font-light border-2 border-gray-100 px-2 py-1 rounded-md hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200">
              Options
            </a>
          </Link>
        </footer>
      </div>
    </main>
  );
};

export default Home;
