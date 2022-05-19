import { useEffect, useState } from "react";
import { IMemberWithRaceFame, IOptions, ITopValues } from "src/types";
import { getTopValues, sorter } from "src/utils";
import { MemberTableItem } from "./MemberTableItem";

interface Props {
  members: IMemberWithRaceFame[];
  filter: string;
  options: IOptions;
}

export const MembersTable: React.FC<Props> = ({ members, filter, options }) => {
  const [topValues, setTopValues] = useState<ITopValues>({
    topBoatAttacks: 0,
    topDecksUsed: 0,
    topFame: 0,
  });

  useEffect(() => {
    const verifyTopValues: ITopValues = {
      topFame: getTopValues(members, "currentRaceFame"),
      topBoatAttacks: getTopValues(members, "currentRaceBoatAttacks"),
      topDecksUsed: getTopValues(members, "currentRaceDecksUsed"),
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
