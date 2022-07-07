import Image from "next/image";
import { IconClose, IconOptions } from "src/icons";
import { IClanInfo } from "src/types";

interface INavigationBarProps {
  clanInfo: IClanInfo | null;
  setFilter: (e: string) => void;
  filter: string;
  openOptions: boolean;
  setOpenOptions: (value: boolean) => void;
}

export const NavigationBar = ({
  clanInfo,
  setFilter,
  filter,
  openOptions,
  setOpenOptions,
}: INavigationBarProps) => {
  const handleOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.currentTarget.value);
  };

  return (
    <header className="sticky top-0 flex h-24 items-center justify-between rounded-t-md bg-gray-900 p-2 text-white">
      {openOptions ? (
        <>
          <h1 className="text-sm font-medium sm:text-xl">Options</h1>
          <button
            className="m-2 rounded p-1 ring-1 ring-gray-300 hover:bg-gray-200 hover:text-gray-900 focus:outline-none"
            title="Close options"
            type="button"
            onClick={() => setOpenOptions(false)}
          >
            <IconClose />
          </button>
        </>
      ) : (
        <>
          {clanInfo ? (
            <div className="flex flex-col justify-center">
              <h1 className="text-sm font-medium sm:text-xl">
                {clanInfo?.clanName}
                <span className="ml-2 text-xs font-light uppercase text-gray-400">
                  Members {clanInfo?.clanTotalMembers}/50
                </span>
              </h1>
              <p className="text-xs font-light text-gray-400">
                <span className="capitalize">
                  Race stage: {clanInfo.clanRaceType}
                </span>
              </p>
              {clanInfo.clanRaceType !== "WarDay" && (
                <p className="align-center my-1 flex text-xs font-light text-gray-400">
                  <span className="">
                    Position: {clanInfo.clanRacePosition}º
                  </span>
                  <span className="ml-1 flex justify-center">
                    <picture className="text-[0.6em] tracking-tighter">
                      <Image
                        src="/cw-fame.webp"
                        width={14}
                        height={14}
                        alt="war fame medals"
                      />
                    </picture>
                    <span className="ml-1">{clanInfo.clanRacePoints}</span>
                  </span>
                </p>
              )}
            </div>
          ) : (
            <p></p>
          )}
          <div className="flex items-center justify-end">
            <select
              className="rounded-l-md bg-gray-700 py-1 text-xs transition duration-150 ease-in-out focus:outline-none"
              name="orderBy"
              title="Order by"
              onChange={handleOrder}
              value={filter}
            >
              <option value="clanRank">Trophies</option>
              <option value="lastSeen">Last seen</option>
              <option value="currentRaceFame">Current medals</option>
              <option value="currentRaceDecksUsed">Current decks used</option>
              <option value="currentRaceBoatAttacks">
                Current boat attacks
              </option>
              <option value="lastRaceFame">Last medals</option>
              <option value="lastRaceDecksUsed">Last decks used</option>
              <option value="lastRaceBoatAttacks">Last boat attacks</option>
            </select>

            <button
              className="m-2 rounded p-1 ring-1 ring-gray-300 hover:bg-gray-200 hover:text-gray-900 focus:outline-none"
              title="Options"
              type="button"
              onClick={() => setOpenOptions(true)}
            >
              <IconOptions />
            </button>
          </div>
        </>
      )}
    </header>
  );
};
