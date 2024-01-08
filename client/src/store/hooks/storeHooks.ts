import { useSelector } from "react-redux";
import { AuthReducerState } from "../reducers/authReducer";
import { ProductsReducerState } from "../reducers/productsReducer";

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

export { useAuth, useProducts };
