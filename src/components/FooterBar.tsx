interface IFooterBarProps {
  openOptions: boolean;
  setOpenOptions: (value: boolean) => void;
}

export const FooterBar = ({ openOptions, setOpenOptions }: IFooterBarProps) => {
  return (
    <footer className="sticky top-0 bg-gray-800 text-center text-white rounded-b-md p-2 flex justify-between items-center">
      <p className="text-sm font-light">@2022</p>
      <button
        type="button"
        onClick={() => setOpenOptions(!openOptions)}
        className="text-sm font-light border-2 border-gray-100 px-2 py-1 rounded-md hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200"
      >
        {openOptions ? "Go back" : "Options"}
      </button>
    </footer>
  );
};
