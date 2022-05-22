import { FC, useEffect, useState } from "react";
import { defaultTopValues } from "src/options";
import { IMemberWithRaceFame, IOptions, ITopValues } from "src/types";
import { getTopValues, sorter } from "src/utils";
import { MemberItem } from "./MemberItem";
import { AnimatePresence } from "framer-motion";

interface IMembersTableProps {
  members: IMemberWithRaceFame[];
  filter: string;
  options: IOptions;
}

export const MembersTable: FC<IMembersTableProps> = ({
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
    <section className="w-full">
      <AnimatePresence>
        {members
          .sort(sorter(filter))
          .map((member: IMemberWithRaceFame, i: number) => (
            <MemberItem
              key={member.tag}
              member={member}
              options={options}
              topValues={topValues}
              index={i}
            />
          ))}
      </AnimatePresence>
    </section>
  );
};
