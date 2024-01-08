import { Login, Register } from "../../components";
import { useAuth } from "../../store/hooks/storeHooks";
import { useQuery } from "@tanstack/react-query";
import { productApi } from "../../config/axios";
import { useDispatch } from "react-redux";
import { Products } from "../../types/general";
import { setProductsAndCategories } from "../../store/reducers/productsReducer";
import Product from "../../components/Product";

const Home = () => {
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const { isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data }: { data: Products[] } = await productApi.get("/");
      const categories: Products["productCategory"][] = data.map(
        (prod) => prod.productCategory
      );
      dispatch(setProductsAndCategories({ products: data, categories }));
      return null;
    },
  });
  return (
    <>
      {auth === "register" && <Register />}
      {auth === "login" && <Login />}
      <div className="flex items-center justify-center gap-3 p-2 flex-wrap">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </>
  );
};

export default Home;
