import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../../store/reducers/authReducer";
import { useForm } from "react-hook-form";
import { LoginUser, loginValidator } from "../../validators/auth.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { accountApi } from "../../config/axios";
import { serverError } from "../../types/general";
import { useAuth } from "../../store/hooks/storeHooks";

export default function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const toast = useToast();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<LoginUser>({
    resolver: zodResolver(loginValidator),
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["authentication"],
    mutationFn: async (user: LoginUser) => {
      const { data } = await accountApi.post("/authorize", user);
      const { data: loggedinUser } = await accountApi.post(
        "/authenticate",
        user
      );
      dispatch(setUser(loggedinUser));
      return data;
    },
    onSuccess: (data) => {
      toast({
        title: data.message || "check your email and verify account",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
      reset();
      dispatch(setAuth(null));
    },
    onError: (err: serverError) => {
      toast({
        title: err.response.data.message,
        isClosable: true,
        duration: 1500,
        status: "error",
      });
    },
  });
  const authorizeUser = async (user: LoginUser) => {
    await mutate(user);
  };
  useLayoutEffect(() => {
    if (auth === "login") {
      onOpen();
    }
  }, [auth === "login"]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={"black"} margin={"auto 0"}>
        <ModalBody>
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="max-w-md w-full p-8  text-white rounded shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Login</h2>
              <form onSubmit={handleSubmit(authorizeUser)}>
                <div className="mb-4">
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                  <label
                    htmlFor="email"
                    className="block text-gray-100 text-sm font-bold mb-2">
                    Email
                  </label>

                  <input
                    {...register("email")}
                    type="email"
                    className="w-full bg-transparent font-Fira font-[500] border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}

                  <label
                    htmlFor="password"
                    className="block text-gray-100 text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    className="w-full bg-transparent font-Fira font-[500] border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full disabled:bg-blue-300 font-bold bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                  Login
                </button>
                <p className="text-[17px] font-bold font-JetBrains text-center mt-4">
                  Don't have an account{" "}
                  <span
                    className="text-yellow-400 font-extrabold underline cursor-pointer"
                    onClick={() => {
                      dispatch(setAuth("register"));
                      onClose();
                    }}>
                    Register
                  </span>
                </p>
              </form>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
