import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaOpencart, FaRegUserCircle } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { MdCreateNewFolder } from "react-icons/md";
import { CiShop } from "react-icons/ci";
import { IoMdLogOut } from "react-icons/io";
import { useAuth, useProducts } from "../../store/hooks/storeHooks";
import { useDispatch } from "react-redux";
import { logoutUser, setAuth } from "../../store/reducers/authReducer";
import { useMutation } from "@tanstack/react-query";
import { accountApi } from "../../config/axios";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import Product from "../Product";
import { socket } from "../../sockets/socket";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HeaderPopUp = () => {
  const { user } = useAuth();
  const { cart } = useProducts();
  const navigate = useNavigate();
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const becomeSeller = async () => {
    await socket.emit("sellerRequest", {
      userId: user?.id,
      role: user?.role,
      adminId: import.meta.env.VITE_ADMIN_ID as string,
    });
  };
  useEffect(() => {
    if (!user) return;
    socket.on("alreadyapplied", (notification: any) => {
      if (notification.id === user.id) {
        toast({
          title: notification.message,
          status: "warning",
          position: "top",
          isClosable: true,
          duration: 1500,
        });
      }
    });
  }, [socket]);

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
                <p
                  className="text-[18px] flex items-center gap-4 font-semibold  font-Nunito hover:text-orange-400 transition-colors duration-300 cursor-pointer"
                  onClick={() => {
                    navigate("seller");
                  }}>
                  <RiAdminFill size={25} />
                  Seller Panel
                </p>
              )}
              <p
                className="text-[18px] flex items-center gap-4 font-semibold  font-Nunito hover:text-orange-400 transition-colors duration-300 cursor-pointer"
                onClick={onOpen}>
                <FaOpencart size={25} />
                My Cart
                <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                  <DrawerOverlay />
                  <DrawerContent bg={"slateblue"}>
                    <DrawerCloseButton />
                    <DrawerHeader>Your Cart</DrawerHeader>

                    <DrawerBody>
                      <div className="flex flex-col items-center gap-3">
                        {cart.length > 0 ? (
                          cart.map((product) => (
                            <Product remove product={product} />
                          ))
                        ) : (
                          <p className="text-[20px] font-Lato">
                            Your cart is empty
                          </p>
                        )}
                      </div>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </p>
              {user.role !== "seller" && user.role !== "admin" && (
                <p
                  className="text-[18px] flex items-center gap-4 font-semibold  font-Nunito hover:text-orange-400 transition-colors duration-300 cursor-pointer"
                  onClick={becomeSeller}>
                  <CiShop size={25} />
                  Become Seller
                </p>
              )}
              {user.role === "admin" && (
                <p
                  className="text-[18px] flex items-center gap-4 font-semibold  font-Nunito hover:text-orange-400 transition-colors duration-300 cursor-pointer"
                  onClick={() => navigate("/admin")}>
                  <MdAdminPanelSettings size={25} />
                  Admin Panel
                </p>
              )}
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
