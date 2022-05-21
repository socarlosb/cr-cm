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
    <header className="sticky top-0 bg-gray-900 text-white p-2 pb-2 rounded-t-md flex items-center justify-between">
      {openOptions ? (
        <>
          <h1 className="text-sm sm:text-xl font-medium">Options</h1>
          <button
            className="p-2"
            title="Close options"
            type="button"
            onClick={() => setOpenOptions(false)}
          >
            <IconClose />
          </button>
        </>
      ) : (
        <>
          <div>
            {clanInfo && (
              <div className="flex items-center">
                <h1 className="text-sm sm:text-xl font-medium">
                  {clanInfo?.clanName}
                </h1>
                <span className="px-2 font-light text-xs text-gray-400">
                  ({clanInfo?.clanTotalMembers}/50)
                </span>
              </div>
            )}
            <div>
              <label htmlFor="orderby" className="text-xs">
                Order by:
              </label>
              <select
                className="bg-gray-900 text-xs focus:outline-none transition ease-in-out duration-150 px-2 py-1 rounded-l-md"
                name="orderBy"
                title="Order by"
                onChange={handleOrder}
                value={filter}
              >
                <option value="clanRank">Trophies</option>
                <option value="lastSeen">Last seen</option>
                <option value="currentRaceFame">Current fame</option>
                <option value="currentRaceDecksUsed">Current decks used</option>
                <option value="currentRaceBoatAttacks">
                  Current boat attacks
                </option>
                <option value="lastRaceFame">Last fame</option>
                <option value="lastRaceDecksUsed">Last decks used</option>
                <option value="lastRaceBoatAttacks">Last boat attacks</option>
              </select>
            </div>
          </div>
          <button
            className="p-2"
            title="Options"
            type="button"
            onClick={() => setOpenOptions(true)}
          >
            <IconOptions />
          </button>
        </>
      )}
    </header>
  );
};
