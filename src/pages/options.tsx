import { GetServerSideProps } from "next";
import Link from "next/link";
import { options } from "src/options";
import { IMemberWithRaceFame } from "src/types";
import {
  dateInDays,
  getClanCurrentRace,
  getClanMembers,
  getClanMembersRaceFame,
  getClanRaceLog,
  parseDate,
} from "src/utils";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const riverRaceLog = await getClanRaceLog(options.clanTag);
  const members = await getClanMembers(options.clanTag);
  const currentRace = await getClanCurrentRace(options.clanTag);
  const membersWithRaceLog = await getClanMembersRaceFame(
    options.clanTag,
    members,
    riverRaceLog,
    currentRace
  );

  return {
    props: { members: membersWithRaceLog },
  };
};

const Options = () => {
  return (
    <main className="bg-gray-700">
      <div className="flex flex-col w-screen h-screen max-w-lg m-auto">
        <div className="sticky top-0 bg-gray-900 text-center text-white p-4 pb-2 rounded-t-md flex justify-between items-center">
          <Link href="/" prefetch>
            <a className="text-sm font-light border-2 border-gray-100 px-2 py-1 rounded-md hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200">
              Go Back
            </a>
          </Link>
          <h1 className="text-xl font-medium">Bock Royale</h1>
        </div>
        <div className="h-full">
          <form className="m-10 text-gray-100" action="">
            <label htmlFor="clanTag">Clan tag</label>
            <input
              className="bg-transparent px-2 py-1 rounded-md mt-2 mb-4 ring-1 ring-gray-100 w-full"
              type="text"
              name="clanTag"
              title="Clan tag"
            />
            <label htmlFor="minFameWeek">Minimum fame per week</label>
            <input
              className="bg-transparent px-2 py-1 rounded-md mt-2 mb-4 ring-1 ring-gray-100 w-full"
              type="text"
              name="minFameWeek"
              title="Minimum fame per week"
            />
            <label htmlFor="awayDaysDanger">
              Number of days away for warning
            </label>
            <input
              className="bg-transparent px-2 py-1 rounded-md mt-2 mb-4 ring-1 ring-gray-100 w-full"
              type="text"
              name="awayDaysDanger"
              title="Number of days away for warning"
            />
            <label htmlFor="awayDaysMax">Number of days away to kick</label>
            <input
              className="bg-transparent px-2 py-1 rounded-md mt-2 mb-4 ring-1 ring-gray-100 w-full"
              type="text"
              name="awayDaysMax"
              title="Number of days away to kick"
            />
            <button
              className="mt-4 text-sm font-semibold ring-2 ring-gray-100 px-4 py-2 rounded-md bg-gray-100 text-gray-800 transition-colors duration-200 hover:bg-gray-800 hover:text-gray-100 hover:ring-gray-800"
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
        <footer className="sticky top-0 bg-gray-800 text-center text-white rounded-b-md p-4 flex justify-between items-center">
          <p className="text-sm font-light">@2022</p>
          <Link href="/options" prefetch>
            <a className="text-sm font-light border-2 border-gray-100 px-2 py-1 rounded-md hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200">
              Options
            </a>
          </Link>
        </footer>
      </div>
    </main>
  );
};

export default Options;
