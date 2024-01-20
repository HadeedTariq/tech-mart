import { Link, useLocation, useNavigate } from "react-router-dom";

const SellerSideBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentPath = pathname.split("seller")[1].split("/")[1];

  return (
    <div className="border-r-2 min-h-[100vh] border-purple-500 w-[200px] fixed flex flex-col bg-slate-700">
      <h2
        className="text-center border-b-2 border-violet-400 my-5 text-[25px] font-Martian cursor-pointer text-orange-400"
        onClick={() => navigate("/")}>
        Tech Mart
      </h2>
      <div className="w-full flex flex-col items-center my-6">
        <Link
          to={"chats"}
          className={`my-2  text-[17px] font-Fira font-bold w-full text-center p-2 rounded-sm ${
            currentPath === "chats" ? "bg-purple-500" : "bg-purple-800"
          }`}>
          Chats
        </Link>
        <Link
          to={"createProducts"}
          className={`my-2  text-[17px] font-Fira font-bold w-full text-center p-2 rounded-sm ${
            currentPath === "createProducts" ? "bg-purple-500" : "bg-purple-800"
          }`}>
          Create Products
        </Link>
        <Link
          to={"myProducts"}
          className={`my-2  text-[17px] font-Fira font-bold w-full text-center p-2 rounded-sm ${
            currentPath === "myProducts" ? "bg-purple-500" : "bg-purple-800"
          }`}>
          Products
        </Link>
      </div>
    </div>
  );
};

export default SellerSideBar;
