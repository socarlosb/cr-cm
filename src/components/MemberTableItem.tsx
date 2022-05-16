import Link from "next/link";
import { IMemberWithRaceFame, IOptions } from "src/types";
import { cleanTag, colorMemberRole, dateInDays, parseDate } from "src/utils";

interface Props {
  member: IMemberWithRaceFame;
  options: IOptions;
  index: number;
}

export const MemberTableItem: React.FC<Props> = ({
  member,
  options,
  index,
}) => {
  return (
    <tr key={member.tag} className="bg-white border-b hover:bg-gray-100">
      <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center px-2">
        <p>{index + 1}</p>
      </td>
      <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap">
        <h3 className="font-semibold py-0.5">{member.name}</h3>
        <span className="font-light text-xs italic hover:underline">
          <Link href={`https://royaleapi.com/player/${cleanTag(member.tag)}`}>
            <a target="_blank">({cleanTag(member.tag)})</a>
          </Link>
        </span>
        <p
          className={`text-xs uppercase py-0.5 ${colorMemberRole(member.role)}`}
        >
          {member.role}
        </p>
        <p
          className={`text-gray-600 text-xs ${
            dateInDays(member.lastSeen) >= parseInt(options.awayMaxDays)
              ? "text-red-400 font-bold"
              : dateInDays(member.lastSeen) >= parseInt(options.awayDangerDays)
              ? "text-orange-400 font-bold"
              : ""
          }`}
        >
          Online {parseDate(member.lastSeen)}
        </p>
      </td>
      <td className="text-xs text-gray-800 font-light py-2 whitespace-nowrap">
        <p>
          Trophies: {member.trophies}
          <span className="text-xs text-gray-500 ml-2 italic">
            (#{member.clanRank} - #{member.previousClanRank})
          </span>
        </p>
        <div className="flex flex-wrap">
          <p>Donations: (</p>
          <p>Given: {member.donations}</p>
          <p>| Received: {member.donationsReceived})</p>
        </div>
        <div className="flex flex-wrap">
          <p>Current Race: (</p>
          <p
            className={`${
              member.currentRaceFame < parseInt(options.warWeekFame)
                ? "text-red-400 font-bold"
                : ""
            }`}
          >
            Fame: {member.currentRaceFame}
          </p>
          <p>| Decks: {member.currentRaceDecksUsed}</p>
          <p>| Today: {member.currentRaceDecksUsedToday}</p>
          <p>| Boats: {member.currentRaceBoatAttacks})</p>
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
          <p>| Decks: {member.lastRaceDecksUsed}</p>
          <p>| Boats: {member.lastRaceBoatAttacks})</p>
        </div>
        <div className="flex flex-wrap">
          <p>Previous Race: (</p>
          <p
            className={`${
              member.previousRaceFame < parseInt(options.warWeekFame)
                ? "text-red-400 font-bold"
                : ""
            }`}
          >
            Fame: {member.previousRaceFame}
          </p>
          <p> | Decks: {member.previousRaceDecksUsed}</p>
          <p> | Boats: {member.previousRaceBoatAttacks})</p>
        </div>
      </td>
    </tr>
  );
};
