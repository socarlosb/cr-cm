import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { defaultOptions } from "src/options";
import { IClanInfo, IMemberWithRaceFame, IOptions } from "src/types";
import { fetchData } from "src/utils";

interface IProps {
  setMembers: (members: IMemberWithRaceFame[]) => void;
  setClanInfo: (clanInfo: IClanInfo) => void;
}

export const OptionsView = ({ setMembers, setClanInfo }: IProps) => {
  const [options, setOptions] = useState<IOptions>(defaultOptions);
  const [disable, setDisable] = useState<boolean>(false);
  const [message, setMessage] = useState("Save");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOptions({ ...options, [name]: value });
  };

  const saveOptions = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Fetching data and saving...");
    setDisable(true);
    localStorage.setItem("options", JSON.stringify(options));
    const { members, clanInfo } = await fetchData(options.clanTag);
    setMembers(members);
    setClanInfo(clanInfo);
  };

  return (
    <main className="bg-gray-700">
      <div className="flex flex-col w-screen h-screen max-w-lg m-auto">
        <div className="sticky top-0 bg-gray-900 text-center text-white p-4 pb-2 rounded-t-md flex justify-between items-center">
          <Link href="/">
            <a className="text-sm font-light border-2 border-gray-100 px-2 py-1 rounded-md hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200">
              Go Back
            </a>
          </Link>
          <h1 className="text-xl font-medium">Options</h1>
        </div>
        <div className="h-full">
          <form className="m-10 text-gray-100" onSubmit={saveOptions}>
            <label htmlFor="clanTag">Clan tag</label>
            <input
              disabled={disable}
              className="bg-transparent px-2 py-1 rounded-md mt-2 mb-4 ring-1 ring-gray-100 w-full disabled:bg-slate-400 disabled:text-gray-100"
              type="text"
              name="clanTag"
              title="Clan tag"
              defaultValue={options.clanTag}
              onChange={handleChange}
            />
            <label htmlFor="minFameWeek">Minimum fame per week</label>
            <input
              disabled={disable}
              className="bg-transparent px-2 py-1 rounded-md mt-2 mb-4 ring-1 ring-gray-100 w-full disabled:bg-slate-400 disabled:text-gray-100"
              type="number"
              name="warWeekFame"
              title="Minimum fame per week"
              defaultValue={options.warWeekFame}
              onChange={handleChange}
            />
            <label htmlFor="awayDaysDanger">
              Number of days away for warning
            </label>
            <input
              disabled={disable}
              className="bg-transparent px-2 py-1 rounded-md mt-2 mb-4 ring-1 ring-gray-100 w-full disabled:bg-slate-400 disabled:text-gray-100"
              type="number"
              name="awayDangerDays"
              title="Number of days away for warning"
              defaultValue={options.awayDangerDays}
              onChange={handleChange}
            />
            <label htmlFor="awayDaysMax">Number of days away to kick</label>
            <input
              disabled={disable}
              className="bg-transparent px-2 py-1 rounded-md mt-2 mb-4 ring-1 ring-gray-100 w-full disabled:bg-slate-400 disabled:text-gray-100"
              type="number"
              name="awayMaxDays"
              title="Number of days away to kick"
              defaultValue={options.awayMaxDays}
              onChange={handleChange}
            />
            <button
              disabled={disable}
              className="mt-4 text-sm font-semibold ring-2 ring-gray-100 px-4 py-2 rounded-md bg-gray-100 text-gray-800 transition-colors duration-200 hover:bg-gray-800 hover:text-gray-100 hover:ring-gray-800 disabled:bg-slate-400 disabled:text-gray-100"
              type="submit"
            >
              {message}
            </button>
          </form>
        </div>
        <footer className="sticky top-0 bg-gray-800 text-center text-white rounded-b-md p-4 flex flex-start items-center">
          <p className="text-sm font-light">@2022</p>
        </footer>
      </div>
    </main>
  );
};