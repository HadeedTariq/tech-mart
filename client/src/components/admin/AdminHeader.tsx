import { Outlet } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";

const AdminHeader = () => {
  return (
    <div className="flex  gap-2 w-full">
      <div className="relative min-h-[100vh] w-[200px]">
        <AdminSideBar />
      </div>
      <div className="w-full p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminHeader;
