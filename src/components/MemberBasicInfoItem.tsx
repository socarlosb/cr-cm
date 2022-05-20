import Link from "next/link";
import { IMemberWithRaceFame, IOptions } from "src/types";
import { cleanTag, colorMemberRole, dateInDays, parseDate } from "src/utils";

interface IMemberBasicInfoItem {
  member: IMemberWithRaceFame;
  options: IOptions;
}

export const MemberBasicInfoItem: React.FC<IMemberBasicInfoItem> = ({
  member,
  options,
}) => {
  return (
    <>
      <h3 className="font-semibold py-0.5">
        <Link href={`clashroyale://playerInfo?id=${cleanTag(member.tag)}`}>
          <a target="_blank">{member.name}</a>
        </Link>
      </h3>
      <span className="font-light text-xs underline">
        <Link href={`https://royaleapi.com/player/${cleanTag(member.tag)}`}>
          <a target="_blank">{cleanTag(member.tag)}</a>
        </Link>
      </span>
      <p
        className={`text-xs uppercase py-0.5 font-bold ${colorMemberRole(
          member.role
        )}`}
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
    </>
  );
};
