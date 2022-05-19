import React, { useState } from "react";
import { IOptions } from "src/types";
import { parseTag } from "src/utils";
interface IProps {
  currentOptions: IOptions;
  updateOptions: (options: IOptions) => void;
  setOpenOptions: (value: boolean) => void;
}

export const OptionsView = ({
  updateOptions,
  setOpenOptions,
  currentOptions,
}: IProps) => {
  const [options, setOptions] = useState<IOptions>(currentOptions);
  const [disable, setDisable] = useState<boolean>(false);
  const [message, setMessage] = useState("Save");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "clanTag") {
      setOptions({ ...options, [name]: parseTag(value) });
    } else {
      setOptions({ ...options, [name]: value });
    }
  };

  const saveOptions = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Updating data and saving...");
    setDisable(true);
    localStorage.setItem("options", JSON.stringify(options));
    updateOptions(options);
    setOpenOptions(false);
  };

  return (
    <>
      <div className="sticky top-0 bg-gray-900 text-center text-white p-4 pb-2 rounded-t-md flex justify-between items-center">
        <h1 className="text-xl font-medium">Options</h1>
      </div>
      <div className="h-full">
        <form className="m-10 text-gray-100" onSubmit={saveOptions}>
          <label htmlFor="clanTag">Clan tag</label>
          <input
            disabled={disable}
            className="bg-transparent px-2 py-1 rounded-md mt-2 mb-4 ring-1 ring-gray-100 w-full disabled:bg-slate-400 disabled:text-gray-100 uppercase"
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
    </>
  );
};
