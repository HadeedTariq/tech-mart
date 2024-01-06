import { useSelector } from "react-redux";
import { AuthReducerState } from "../reducers/authReducer";

const useAuth = () => {
  const user: AuthReducerState = useSelector((state: any) => state.authReducer);
  return { ...user };
};

export { useAuth };
