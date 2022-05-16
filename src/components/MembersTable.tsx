import { IMemberWithRaceFame, IOptions } from "src/types";
import { sorter } from "src/utils";
import { MemberTableItem } from "./MemberTableItem";

interface Props {
  members: IMemberWithRaceFame[];
  filter: string;
  options: IOptions;
}

export const MembersTable: React.FC<Props> = ({ members, filter, options }) => {
  return (
    <table className="w-full relative">
      <thead className="">
        <tr>
          <th
            scope="col"
            className="text-xs font-medium text-white py-4 text-center sticky top-0 border-b bg-gray-800"
          >
            #
          </th>
          <th
            scope="col"
            className="text-xs font-medium text-white py-4 text-left sticky top-0 border-b bg-gray-800"
          >
            Member
          </th>
          <th
            scope="col"
            className="text-xs font-medium text-white py-4 text-left sticky top-0 border-b bg-gray-800"
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
              index={i}
            />
          ))}
      </tbody>
    </table>
  );
};
