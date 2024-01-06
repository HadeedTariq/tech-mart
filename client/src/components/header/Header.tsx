import { Outlet } from "react-router-dom";
import HeaderPopUp from "./HeaderPopUp";

const Header = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between py-2 px-4 bg-slate-700 text-white w-full relative h-12">
        <h1 className="text-[23px] font-bungee">Tech-Mart</h1>
        <HeaderPopUp />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Header;
