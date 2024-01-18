import { useSelector } from "react-redux";
import { AuthReducerState } from "../reducers/authReducer";
import { ProductsReducerState } from "../reducers/productsReducer";
import { AdminReducerState } from "../reducers/adminReducer";
import { ChatReducerState } from "../reducers/chat.Reducer";

const useAuth = () => {
  const userState: AuthReducerState = useSelector(
    (state: any) => state.authReducer
  );
  return { ...userState };
};
const useProducts = () => {
  const productState: ProductsReducerState = useSelector(
    (state: any) => state.productsReducer
  );
  return { ...productState };
};
const useAdmin = () => {
  const adminState: AdminReducerState = useSelector(
    (state: any) => state.adminReducer
  );
  return { ...adminState };
};

const useChats = () => {
  const chatState: ChatReducerState = useSelector(
    (state: any) => state.adminReducer
  );
  return { ...chatState };
};

export { useAuth, useProducts, useAdmin, useChats };
