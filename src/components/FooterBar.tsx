interface IProps {
  cleanUpOptions: () => void;
}

export const FooterBar = ({ cleanUpOptions }: IProps) => {
  return (
    <footer className="sticky top-0 bg-gray-800 text-center text-white rounded-b-md p-4 flex justify-between items-center">
      <p className="text-sm font-light">@2022</p>
      <button
        type="button"
        onClick={cleanUpOptions}
        className="text-sm font-light border-2 border-gray-100 px-2 py-1 rounded-md hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200"
      >
        Options
      </button>
    </footer>
  );
};
