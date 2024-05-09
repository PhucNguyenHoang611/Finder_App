import { Outlet } from "react-router-dom";

const RootPage = () => {
  return (
    <main className="p-[20px]">
      <Outlet />
    </main>
  );
};

export default RootPage;