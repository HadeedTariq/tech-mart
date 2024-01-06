import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useToast,
} from "@chakra-ui/react";
import { FaOpencart, FaRegUserCircle } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { useAuth } from "../../store/hooks/storeHooks";
import { useDispatch } from "react-redux";
import { logoutUser, setAuth } from "../../store/reducers/authReducer";
import { useMutation } from "@tanstack/react-query";
import { accountApi } from "../../config/axios";

const HeaderPopUp = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const toast = useToast();
  const { mutate } = useMutation({
    mutationKey: ["logoutUser"],
    mutationFn: async () => {
      const { data } = await accountApi.post("/logout");
      return data;
    },
    onSuccess: (data: { message: string }) => {
      toast({
        title: data.message || "check your email and verify account",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    },
  });
  return (
    <Popover>
      <PopoverTrigger>
        <img
          src="user.jpg"
          className="w-[35px] h-[35px] cursor-pointer rounded-full"
        />
      </PopoverTrigger>
      <PopoverContent
        bgColor={"black"}
        w={"190px"}
        margin={"0 3px"}
        border={""}>
        <PopoverArrow />
        <PopoverBody>
          {user ? (
            <div className="flex flex-col gap-3 py-2">
              <p className="text-[18px] flex items-center gap-4 font-semibold  font-Nunito hover:text-orange-400 transition-colors duration-300 cursor-pointer">
                <FaRegUserCircle size={25} />
                {user.username}
              </p>
              {user.role === "seller" && (
                <p className="text-[18px] flex items-center gap-4 font-semibold  font-Nunito hover:text-orange-400 transition-colors duration-300 cursor-pointer">
                  <MdCreateNewFolder size={25} />
                  Create Product
                </p>
              )}
              <p className="text-[18px] flex items-center gap-4 font-semibold  font-Nunito hover:text-orange-400 transition-colors duration-300 cursor-pointer">
                <FaOpencart size={25} />
                My Cart
              </p>
              <p
                className="text-[18px] flex items-center gap-4 font-semibold  font-Nunito hover:text-orange-400 transition-colors duration-300 cursor-pointer"
                onClick={() => {
                  mutate();
                  dispatch(logoutUser());
                }}>
                <IoMdLogOut size={25} />
                Logout
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <p
                className="py-1 font-Fira font-[400] cursor-pointer hover:text-pink-400 text-[17px]"
                onClick={() => {
                  dispatch(setAuth("login"));
                }}>
                Login
              </p>
              <p
                className=" py-1 font-Fira font-[400] cursor-pointer hover:text-pink-400 text-[17px]"
                onClick={() => {
                  dispatch(setAuth("register"));
                }}>
                Register
              </p>
            </div>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default HeaderPopUp;
