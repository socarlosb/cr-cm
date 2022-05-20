interface IStatsItemProps {
  title: string;
  value: string | number;
  comparator: string | number;
}

export const StatsItem = ({ title, value, comparator }: IStatsItemProps) => {
  return (
    <p className={`${value === comparator ? "text-sky-600 font-bold" : ""}`}>
      {title}: {value}
    </p>
  );
};
