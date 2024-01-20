import { useQuery } from "@tanstack/react-query";
import Product from "../../components/Product";
import { useAuth } from "../../store/hooks/storeHooks";
import { sellerApi } from "../../config/axios";
import { Products } from "../../types/general";

const SellerProducts = () => {
  const { user } = useAuth();
  const { data: products } = useQuery({
    queryKey: ["sellerProducts"],
    queryFn: async () => {
      const { data } = await sellerApi.get(`/?seller=${user?.id}`);
      return data as Products[];
    },
  });
  return (
    <div className="flex items-center flex-wrap gap-4 justify-center">
      {products?.map((product) => (
        <div className="flex flex-col">
          <Product key={product._id} product={product} admin={true} />
        </div>
      ))}
    </div>
  );
};

export default SellerProducts;
