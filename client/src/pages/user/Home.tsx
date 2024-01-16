import { Login, Register } from "../../components";
import { useAuth, useProducts } from "../../store/hooks/storeHooks";
import { useQuery } from "@tanstack/react-query";
import { productApi } from "../../config/axios";
import { useDispatch } from "react-redux";
import { Products } from "../../types/general";
import { setProductsAndCategories } from "../../store/reducers/productsReducer";
import Product from "../../components/Product";
import { categories } from "../../utils/categories";

const Home = () => {
  const { auth } = useAuth();
  const { products } = useProducts();
  const dispatch = useDispatch();
  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data }: { data: Products[] } = await productApi.get("/");
      dispatch(setProductsAndCategories({ products: data, categories }));
      return data as Products[];
    },
  });
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      {auth === "register" && <Register />}
      {auth === "login" && <Login />}
      <div className="flex items-center justify-center gap-3 p-2 flex-wrap">
        {products?.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </>
  );
};

export default Home;
