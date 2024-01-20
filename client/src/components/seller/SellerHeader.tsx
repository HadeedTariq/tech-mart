import { Navigate, Outlet } from "react-router-dom";
import SellerSideBar from "./SellerSideBar";
import { useAuth } from "../../store/hooks/storeHooks";

const SellerHeader = () => {
  const { user } = useAuth();
  if (!user || user?.role !== "seller") {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="flex  gap-2 w-full">
      <div className="relative min-h-[100vh] w-[200px]">
        <SellerSideBar />
      </div>
      <div className="w-full p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default SellerHeader;
