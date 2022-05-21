import { useEffect, useState } from "react";
import { defaultTopValues } from "src/options";
import { IMemberWithRaceFame, IOptions, ITopValues } from "src/types";
import { getTopValues, sorter } from "src/utils";
import { MemberTableItem } from "./MemberTableItem";

interface IMembersTableProps {
  members: IMemberWithRaceFame[];
  filter: string;
  options: IOptions;
}

export const MembersTable: React.FC<IMembersTableProps> = ({
  members,
  filter,
  options,
}) => {
  const [topValues, setTopValues] = useState<ITopValues>(defaultTopValues);

  useEffect(() => {
    const verifyTopValues: ITopValues = {
      currentRaceTopFame: getTopValues(members, "currentRaceFame"),
      currentRaceTopBoatAttacks: getTopValues(
        members,
        "currentRaceBoatAttacks"
      ),
      currentRaceTopDecksUsed: getTopValues(members, "currentRaceDecksUsed"),
      lastRaceTopFame: getTopValues(members, "lastRaceFame"),
      lastRaceTopBoatAttacks: getTopValues(members, "lastRaceBoatAttacks"),
      lastRaceTopDecksUsed: getTopValues(members, "lastRaceDecksUsed"),
      previousRaceTopFame: getTopValues(members, "previousRaceFame"),
      previousRaceTopBoatAttacks: getTopValues(
        members,
        "previousRaceBoatAttacks"
      ),
      previousRaceTopDecksUsed: getTopValues(members, "previousRaceDecksUsed"),
      donationsGiven: getTopValues(members, "donations"),
      donationsReceived: getTopValues(members, "donationsReceived"),
    };
    setTopValues(verifyTopValues);
  }, [members]);

  return (
    <table className="w-full relative">
      <thead className="">
        <tr>
          <th
            scope="col"
            className="text-xs font-medium text-gray-100 py-4 text-center sticky top-0 border-b bg-gray-800"
          >
            #
          </th>
          <th
            scope="col"
            className="text-xs font-medium text-gray-100 py-4 text-left sticky top-0 border-b bg-gray-800"
          >
            Member
          </th>
          <th
            scope="col"
            className="text-xs font-medium text-gray-100 py-4 text-left sticky top-0 border-b bg-gray-800"
          >
            Stats
          </th>
        </tr>
      </thead>
      <tbody>
        {members
          .sort(sorter(filter))
          .map((member: IMemberWithRaceFame, i: number) => (
            <MemberTableItem
              key={member.tag}
              member={member}
              options={options}
              topValues={topValues}
              index={i}
            />
          ))}
      </tbody>
    </table>
  );
};
