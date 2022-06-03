import { motion } from "framer-motion";
import React, { FormEvent, useState } from "react";
import { IOptions } from "src/types";
import { AddSymbolToTag } from "src/utils";
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
    const verifiedTag = AddSymbolToTag(options.clanTag);
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
      <motion.div
        initial={{ scale: 0.5, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0.5 }}
        transition={{ duration: 0.5, type: "tween" }}
        className="h-full"
      >
        <form
          className="m-4 flex flex-col rounded bg-gradient-to-t from-gray-800 to-gray-700 px-4 py-8 text-gray-200 shadow-md"
          onSubmit={saveOptions}
        >
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
              setOptions({
                ...options,
                [e.target.name]: AddSymbolToTag(e.target.value),
              })
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
            className="mt-4 rounded bg-gray-200 p-1 py-2 text-gray-900 ring-1 ring-gray-200 hover:bg-gray-900 hover:text-gray-200 hover:ring-gray-900 focus:outline-none"
          >
            Save options
          </button>
        </form>
      </motion.div>
    </>
  );
};
