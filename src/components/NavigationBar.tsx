import { IClanInfo } from "src/types";

interface IProps {
  clanInfo: IClanInfo | null;
  setFilter: (e: string) => void;
}

export const NavigationBar = ({ clanInfo, setFilter }: IProps) => {
  const handleOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.currentTarget.value);
  };

  return (
    <div className="sticky top-0 bg-gray-900 text-center text-white p-4 pb-2 rounded-t-md flex justify-between items-center">
      <div>
        <label className="text-xs">Order by:</label>
        <select
          className="bg-gray-900 text-xs focus:outline-none transition ease-in-out duration-150 px-2 py-1 rounded-l-md"
          name="orderBy"
          title="Order by"
          onChange={handleOrder}
          defaultValue={"clanRank"}
        >
          <option value="clanRank">Trophies</option>
          <option value="lastSeen">Last seen</option>
          <option value="currentRaceDecksUsed">Decks used this race</option>
          <option value="currentRaceBoatAttacks">Boat attacks this race</option>
        </select>
      </div>
      <h1 className="text-xl font-medium">{clanInfo?.clanName}</h1>
    </div>
  );
};
