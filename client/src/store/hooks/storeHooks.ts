import { useSelector } from "react-redux";
import { AuthReducerState } from "../reducers/authReducer";
import { ProductsReducerState } from "../reducers/productsReducer";
import { AdminReducerState } from "../reducers/adminReducer";

const useAuth = () => {
  const userState: AuthReducerState = useSelector(
    (state: any) => state.authReducer
  );
  return { ...userState };
};
const useProducts = () => {
  const productState: ProductsReducerState = useSelector(
    (state: any) => state.productReducer
  );
  return { ...productState };
};
const useAdmin = () => {
  const adminState: AdminReducerState = useSelector(
    (state: any) => state.adminReducer
  );
  return { ...adminState };
};

export { useAuth, useProducts, useAdmin };
