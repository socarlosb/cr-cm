import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { getArenaImage } from "src/options";
import { IMemberWithRaceFame, IOptions, ITopValues } from "src/types";
import { dateInDays, removeSymbolFromTag } from "src/utils";

interface IMemberTableItemProps {
  member: IMemberWithRaceFame;
  options: IOptions;
  topValues: ITopValues;
  index: number;
  warState: string | null;
}

export const MemberItem: FC<IMemberTableItemProps> = ({
  member,
  options,
  topValues,
  index,
  warState,
}) => {
  const isTraining = warState === "training";
  const isFailingCurrentFameTarget =
    !isTraining &&
    (member.currentRaceFame === 0 ||
      member.currentRaceFame < options.warWeekFame);
  const isFailingLastFameTarget =
    member.lastRaceFame !== "-" &&
    (member.lastRaceFame === 0 || member.lastRaceFame < options.warWeekFame);
  const isFailingPreviousFameTarget =
    member.previousRaceFame !== "-" &&
    (member.previousRaceFame === 0 ||
      member.previousRaceFame < options.warWeekFame);
  const isAwayForDangerDays =
    dateInDays(member.lastSeen) >= options.awayDangerDays;
  const isAwayForMaxDays = dateInDays(member.lastSeen) >= options.awayMaxDays;
  const isTopDonationsGiven = member.donations === topValues.donationsGiven;
  const isTopDonationsReceived =
    member.donationsReceived === topValues.donationsReceived;
  const isTopCurrentRaceFame =
    member.currentRaceFame === topValues.currentRaceTopFame;
  const isTopLastRaceFame = member.lastRaceFame === topValues.lastRaceTopFame;
  const isTopPreviousRaceFame =
    member.previousRaceFame === topValues.previousRaceTopFame;

  return (
    <motion.article
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.7, type: "tween" }}
      layout
      className={`m-2 flex items-center rounded bg-gradient-to-t from-gray-800 to-gray-700 py-2 text-gray-200 shadow-md ${
        (isFailingCurrentFameTarget && isFailingLastFameTarget) ||
        (isFailingLastFameTarget && isFailingPreviousFameTarget)
          ? "ring-2 ring-orange-800"
          : ""
      }`}
    >
      <div
        className={`ml-2 flex h-10 w-10 items-center justify-center rounded-lg border-2 border-gray-600 px-1 font-bold text-gray-100 ring-1 ring-gray-800 ${
          index === 0
            ? "bg-yellow-500"
            : index === 1
            ? "bg-gray-400"
            : index === 2
            ? "bg-orange-400"
            : "bg-gray-600"
        }`}
      >
        {index + 1}
      </div>
      <div className="relative ml-2 flex h-10 w-10 flex-col items-center justify-start">
        <div className="flex h-10 w-10 items-center justify-center rounded-full text-center ring-2 ring-gray-400 hover:bg-gray-50 hover:text-gray-600">
          <Link
            href={`clashroyale://playerInfo?id=${removeSymbolFromTag(
              member.tag
            )}`}
          >
            <a target="_blank">
              <Image
                src={getArenaImage(member?.arena?.id)}
                width={50}
                height={50}
                alt="number of trophies"
              />
              {isAwayForDangerDays && (
                <p
                  className={`absolute left-0 right-0 rounded-lg text-center text-[0.6em] font-semibold text-black ring-2 ring-gray-400 ${
                    isAwayForMaxDays ? "bg-orange-800" : "bg-orange-500"
                  }`}
                >
                  {dateInDays(member?.lastSeen)} days
                </p>
              )}
            </a>
          </Link>
        </div>
      </div>
      <div className="ml-2 flex-1">
        <h4 className="text-md font-bold leading-tight tracking-tight text-gray-100">
          {member?.name}
        </h4>
        <div className="mt-2 flex items-center">
          <p className="text-xs uppercase tracking-tighter">{member?.role}</p>
          <Link
            href={`https://royaleapi.com/player/${removeSymbolFromTag(
              member?.tag
            )}`}
          >
            <a
              target="_blank"
              className="opacity-60 transition-opacity hover:opacity-100"
            >
              <picture className="ml-2 object-cover pb-2">
                <Image
                  src="/royaleapi.webp"
                  width={20}
                  height={20}
                  alt="royale api link"
                />
              </picture>
            </a>
          </Link>
        </div>
      </div>
      <div className="flex items-start">
        <div className="mx-0.5 flex w-20 flex-col items-start">
          <div className="flex items-center py-0.5 ">
            <picture className="text-[0.6em] tracking-tighter">
              <Image
                src="/trophy.webp"
                width={14}
                height={14}
                alt="number of trophies"
              />
            </picture>
            <p className="ml-1 text-sm tracking-tighter">{member?.trophies}</p>
          </div>
          <div className="flex items-center justify-center py-0.5">
            <picture className="text-[0.6em] tracking-tighter">
              <Image
                src="/ic-cards.webp"
                width={14}
                height={14}
                alt="donations given and received"
              />
            </picture>
            <p className="ml-1 text-[0.7em] tracking-tighter">
              <span
                className={`${isTopDonationsGiven ? "text-yellow-300" : ""}`}
              >
                {member?.donations}
              </span>
              <span className="mx-0.5">/</span>
              <span
                className={`${isTopDonationsReceived ? "text-yellow-300" : ""}`}
              >
                {member?.donationsReceived}
              </span>
            </p>
          </div>
          <div className="flex items-center justify-center py-0.5">
            <picture className="text-[0.6em] tracking-tighter">
              <Image
                src="/cw-wardecks-day.png"
                width={14}
                height={14}
                alt="war decks to use today"
              />
            </picture>
            <p className="ml-1 text-xs tracking-tighter">
              {4 - Number(member.currentRaceDecksUsedToday) || 4}/4
            </p>
          </div>
        </div>
        <div className="mx-0.5 flex w-6 flex-col items-center">
          <picture className="text-[0.6em] tracking-tighter">
            <Image
              src="/cw-fame.webp"
              width={14}
              height={14}
              alt="war fame medals"
            />
          </picture>
          <p
            className={`text-xs tracking-tighter ${
              isFailingCurrentFameTarget
                ? "text-orange-500"
                : isTopCurrentRaceFame && !isTraining
                ? "text-yellow-300"
                : ""
            }`}
          >
            {!isTraining ? member?.currentRaceFame : "-"}
          </p>
          <p
            className={`text-xs tracking-tighter opacity-80 ${
              isFailingLastFameTarget
                ? "text-orange-500"
                : isTopLastRaceFame
                ? "text-yellow-300"
                : ""
            }`}
          >
            {member?.lastRaceFame}
          </p>
          <p
            className={`text-xs tracking-tighter opacity-60 ${
              isFailingPreviousFameTarget
                ? "text-orange-500"
                : isTopPreviousRaceFame
                ? "text-yellow-300"
                : ""
            }`}
          >
            {member?.previousRaceFame}
          </p>
        </div>
        <div className="mx-0.5 flex w-6 flex-col items-center">
          <picture className="text-[0.6em] tracking-tighter">
            <Image
              src="/cw-wardecks.png"
              width={14}
              height={14}
              alt="war decks"
            />
          </picture>
          <p className="text-xs tracking-tighter">
            {member?.currentRaceDecksUsed}
          </p>
          <p className="text-xs tracking-tighter opacity-80">
            {member?.lastRaceDecksUsed}
          </p>
          <p className="text-xs tracking-tighter opacity-60">
            {member?.previousRaceDecksUsed}
          </p>
        </div>
        <div className="mx-0.5 flex w-6 flex-col items-center">
          <picture className="text-[0.6em] tracking-tighter">
            <Image
              src="/cw-boat-battle.webp"
              width={14}
              height={14}
              alt="boat battles"
            />
          </picture>
          <p className="text-xs tracking-tighter">
            {member?.currentRaceBoatAttacks}
          </p>
          <p className="text-xs tracking-tighter opacity-80">
            {member?.lastRaceBoatAttacks}
          </p>
          <p className="text-xs tracking-tighter opacity-60">
            {member?.previousRaceBoatAttacks}
          </p>
        </div>
      </div>
    </motion.article>
  );
};
