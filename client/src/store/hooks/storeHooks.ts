import { useSelector } from "react-redux";
import { AuthReducerState } from "../reducers/authReducer";
import { ProductsReducerState } from "../reducers/productsReducer";
import { AdminReducerState } from "../reducers/adminReducer";
import { ChatReducerState } from "../reducers/chat.Reducer";
import { SellerReducerState } from "../reducers/seller.Reducer";

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
    (state: any) => state.chatReducer
  );
  return { ...chatState };
};
const useSeller = () => {
  const sellerState: SellerReducerState = useSelector(
    (state: any) => state.sellerReducer
  );
  return { ...sellerState };
};

export { useAuth, useProducts, useAdmin, useChats, useSeller };
