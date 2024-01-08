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
import { setAuth } from "../../store/reducers/authReducer";
import { useForm } from "react-hook-form";
import {
  RegisterUser,
  registerValidator,
} from "../../validators/auth.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { accountApi } from "../../config/axios";
import { serverError } from "../../types/general";
import { useAuth } from "../../store/hooks/storeHooks";

export default function Register() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const toast = useToast();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<RegisterUser>({
    resolver: zodResolver(registerValidator),
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["registeration"],
    mutationFn: async (user: RegisterUser) => {
      const { data } = await accountApi.post("/create", {
        ...user,
        role: "user",
      });
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
      dispatch(setAuth("login"));
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
  const registerUser = async (user: RegisterUser) => {
    await mutate(user);
  };
  useLayoutEffect(() => {
    if (auth === "register") {
      onOpen();
    }
  }, [auth === "register"]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={"black"} margin={"auto 0"}>
        <ModalBody>
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="max-w-md w-full p-8  text-white rounded shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Register</h2>
              <form onSubmit={handleSubmit(registerUser)}>
                <div className="mb-4">
                  {errors.username && (
                    <p className="text-red-500">{errors.username.message}</p>
                  )}
                  <label
                    htmlFor="name"
                    className="block text-gray-100 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    {...register("username")}
                    type="text"
                    className="w-full bg-transparent font-Fira font-[500] border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
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
                  Register
                </button>
                <p className="text-[17px] font-bold font-JetBrains text-center mt-4">
                  Already have an account{" "}
                  <span
                    className="text-yellow-400 font-extrabold underline cursor-pointer"
                    onClick={() => {
                      dispatch(setAuth("login"));
                      onClose();
                    }}>
                    Login
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
