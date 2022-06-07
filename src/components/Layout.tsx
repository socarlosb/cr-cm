import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <main className="h-screen overflow-auto bg-gray-600">
      <div className="m-auto flex h-full max-w-4xl flex-col rounded-t-md rounded-b-md ring-2 ring-gray-900">
        {children}
      </div>
    </main>
  );
};

export default Layout;
