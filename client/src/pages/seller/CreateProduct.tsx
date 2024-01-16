import { useForm } from "react-hook-form";
import { Product, productValidator } from "../../validators/product.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../store/hooks/storeHooks";
import { useMutation } from "@tanstack/react-query";
import { sellerApi } from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPending, mutate } = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: async (product: Product) => {
      const { data } = await sellerApi.post("/create", {
        ...product,
        productSeller: user?.id,
      });
      console.log(data);
    },
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Product>({
    resolver: zodResolver(productValidator),
  });
  const createProduct = (product: Product) => {
    mutate(product);
  };
  useEffect(() => {
    if (user?.role !== "seller") return;
  }, []);
  return (
    <>
      <form
        onSubmit={handleSubmit(createProduct)}
        className="flex flex-col gap-4 p-4">
        <input
          type="text"
          placeholder="Enter product Title here"
          className="bg-transparent font-Lato p-2 border-2 border-pink-500 rounded-sm"
          {...register("productTitle")}
        />
        <textarea
          placeholder="Enter product description here"
          {...register("productDescription")}
          className="resize-none w-full font-Lato h-[300px] bg-transparent p-2 border-2 border-pink-500 rounded-sm"></textarea>
      </form>
    </>
  );
};

export default CreateProduct;
