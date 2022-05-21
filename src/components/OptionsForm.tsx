import Error from "next/error";
import React, { FormEvent, useState } from "react";
import { IOptions } from "src/types";
import { parseTag } from "src/utils";
interface IOptionsViewProps {
  currentOptions: IOptions;
  updateOptions: (options: IOptions) => void;
  setOpenOptions: (value: boolean) => void;
}

export const OptionsForm = ({
  updateOptions,
  setOpenOptions,
  currentOptions,
}: IOptionsViewProps) => {
  const [options, setOptions] = useState<IOptions>(currentOptions);
  const [disable, setDisable] = useState<boolean>(false);
  const [message, setMessage] = useState("");

  const saveOptions = async (event: FormEvent) => {
    event.preventDefault();
    if (options.clanTag === "") return setMessage("Clan tag is required");
    const verifiedTag = parseTag(options.clanTag);
    setOptions({ ...options, clanTag: verifiedTag });
    if (!options.warWeekFame)
      return setMessage("Minimum of race medals per week is required");
    if (!options.awayDangerDays)
      return setMessage("Number of days away for warning is required");
    if (!options.awayMaxDays)
      return setMessage("Number of days away to kick is required");
    setDisable(true);
    localStorage.setItem("options", JSON.stringify(options));
    updateOptions(options);
    setOpenOptions(false);
  };

  return (
    <>
      <div className="h-full">
        <form className="m-10 text-gray-100" onSubmit={saveOptions}>
          <label htmlFor="clanTag">Clan tag</label>
          <input
            disabled={disable}
            className="mt-2 mb-4 w-full rounded-md bg-transparent px-2 py-1 uppercase ring-1 ring-gray-500 transition ease-in-out focus:outline-none
            focus:ring-gray-200 disabled:bg-slate-400 disabled:text-gray-100"
            type="text"
            name="clanTag"
            title="Clan tag"
            defaultValue={options.clanTag}
            onChange={(e) =>
              setOptions({ ...options, [e.target.name]: e.target.value })
            }
            autoComplete="on"
            placeholder="#ABC00000"
          />
          <label htmlFor="minFameWeek">Minimum of race medals per week</label>
          <input
            disabled={disable}
            className="mt-2 mb-4 w-full rounded-md bg-transparent px-2 py-1 uppercase ring-1 ring-gray-500 transition ease-in-out focus:outline-none
            focus:ring-gray-200 disabled:bg-slate-400 disabled:text-gray-100"
            type="number"
            name="warWeekFame"
            title="Minimum fame per week"
            defaultValue={options.warWeekFame}
            onChange={(e) =>
              setOptions({ ...options, [e.target.name]: e.target.value })
            }
          />
          <label htmlFor="awayDaysDanger">
            Number of days away for warning
          </label>
          <input
            disabled={disable}
            className="mt-2 mb-4 w-full rounded-md bg-transparent px-2 py-1 uppercase ring-1 ring-gray-500 transition ease-in-out focus:outline-none
            focus:ring-gray-200 disabled:bg-slate-400 disabled:text-gray-100"
            type="number"
            name="awayDangerDays"
            title="Number of days away for warning"
            defaultValue={options.awayDangerDays}
            onChange={(e) =>
              setOptions({ ...options, [e.target.name]: e.target.value })
            }
          />
          <label htmlFor="awayDaysMax">Number of days away to kick</label>
          <input
            disabled={disable}
            className="mt-2 mb-4 w-full rounded-md bg-transparent px-2 py-1 uppercase ring-1 ring-gray-500 transition ease-in-out focus:outline-none
            focus:ring-gray-200 disabled:bg-slate-400 disabled:text-gray-100"
            type="number"
            name="awayMaxDays"
            title="Number of days away to kick"
            defaultValue={options.awayMaxDays}
            onChange={(e) =>
              setOptions({ ...options, [e.target.name]: e.target.value })
            }
          />
          <section
            hidden={message ? false : true}
            className="text-center font-semibold text-yellow-400"
          >
            <p>!!! {message}</p>
          </section>
          <button
            type="submit"
            disabled={disable}
            className="mt-4 w-full rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-800 ring-2 ring-gray-100 transition-colors duration-200 hover:bg-gray-800 hover:text-gray-100 hover:ring-gray-800 disabled:bg-slate-400 disabled:text-gray-100"
          >
            Save options
          </button>
        </form>
      </div>
    </>
  );
};
