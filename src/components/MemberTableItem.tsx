import { IMemberWithRaceFame, IOptions, ITopValues } from "src/types";
import { MemberBasicInfoItem } from "./MemberBasicInfoItem";
import { StatsItem } from "./StatsItem";

interface IMemberTableItemProps {
  member: IMemberWithRaceFame;
  options: IOptions;
  topValues: ITopValues;
  index: number;
}

export const MemberTableItem: React.FC<IMemberTableItemProps> = ({
  member,
  options,
  topValues,
  index,
}) => {
  return (
    <tr
      key={member.tag}
      className="bg-gray-100 border-b border-b-gray-400 hover:bg-gray-300"
    >
      <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center px-2">
        <p>{index + 1}</p>
      </td>
      <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap">
        <MemberBasicInfoItem member={member} options={options} />
      </td>
      <td className="text-xs text-gray-800 font-light py-2 whitespace-nowrap">
        <p>
          Trophies = {member.trophies}
          <span className="text-xs text-gray-500 ml-2 italic">
            (#{member.clanRank} - #{member.previousClanRank})
          </span>
        </p>
        <div className="flex flex-wrap">
          <p className="mr-1">Donations =</p>
          <p>Given: {member.donations}</p>
          <p className="mx-1">|</p>
          <p>Received: {member.donationsReceived}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="mr-1">Current =</p>
          <p
            className={`${
              member.currentRaceFame < parseInt(options.warWeekFame)
                ? "text-red-400 font-bold"
                : ""
            } ${
              member.currentRaceFame === topValues.currentRaceTopFame
                ? "text-sky-600 font-bold"
                : ""
            }`}
          >
            Fame: {member.currentRaceFame}
          </p>
          <p className="mx-1">|</p>
          <StatsItem
            title="Decks"
            value={member.currentRaceDecksUsed}
            comparator={topValues.currentRaceTopDecksUsed}
          ></StatsItem>
          <p className="mx-1">|</p>
          <StatsItem
            title="Boats"
            value={member.currentRaceBoatAttacks}
            comparator={topValues.currentRaceTopBoatAttacks}
          ></StatsItem>
          <p className="mx-1">|</p>
          <p>Today: {member.currentRaceDecksUsedToday}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="mr-1">Last =</p>
          <p
            className={`${
              member.lastRaceFame < parseInt(options.warWeekFame)
                ? "text-red-400 font-bold"
                : ""
            } ${
              member.lastRaceFame === topValues.lastRaceTopFame
                ? "text-sky-600 font-bold"
                : ""
            }`}
          >
            Fame: {member.lastRaceFame}
          </p>
          <p className="mx-1">|</p>
          <StatsItem
            title="Decks"
            value={member.lastRaceDecksUsed}
            comparator={topValues.lastRaceTopDecksUsed}
          ></StatsItem>
          <p className="mx-1">|</p>
          <StatsItem
            title="Boats"
            value={member.lastRaceBoatAttacks}
            comparator={topValues.lastRaceTopBoatAttacks}
          ></StatsItem>
        </div>
        <div className="flex flex-wrap">
          <p className="mr-1">Previous =</p>
          <p
            className={`${
              member.previousRaceFame < parseInt(options.warWeekFame)
                ? "text-red-400 font-bold"
                : ""
            } ${
              member.previousRaceFame === topValues.previousRaceTopFame
                ? "text-sky-600 font-bold"
                : ""
            }`}
          >
            Fame: {member.previousRaceFame}
          </p>
          <p className="mx-1">|</p>
          <StatsItem
            title="Decks"
            value={member.previousRaceDecksUsed}
            comparator={topValues.previousRaceTopDecksUsed}
          ></StatsItem>
          <p className="mx-1">|</p>
          <StatsItem
            title="Boats"
            value={member.previousRaceBoatAttacks}
            comparator={topValues.previousRaceTopBoatAttacks}
          ></StatsItem>
        </div>
      </td>
    </tr>
  );
};
