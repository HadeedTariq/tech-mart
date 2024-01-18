import { useMutation } from "@tanstack/react-query";
import Product from "../../components/Product";
import { useAdmin, useProducts } from "../../store/hooks/storeHooks";
import { MdDelete } from "react-icons/md";
import { adminApi } from "../../config/axios";
import { useToast } from "@chakra-ui/react";

export default function AdminProducts() {
  const toast = useToast();
  const { products } = useProducts();
  const { adminPassword } = useAdmin();
  const { mutate: deleteProduct } = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: async (id: string) => {
      const { data } = await adminApi.delete(
        `/deleteProduct?adminPassword=${adminPassword}&productId=${id}`
      );
      return data;
    },
    onSuccess: (data: any) => {
      toast({
        title: data.message,
        status: "success",
        isClosable: true,
      });
    },
    onError: (err: any) => {
      toast({
        title: err.response.data.message || "Soemthing went wrong",
        status: "error",
        isClosable: true,
      });
    },
  });
  return (
    <div className="flex items-center flex-wrap gap-4 justify-center">
      {products?.map((product) => (
        <div className="flex flex-col">
          <Product key={product._id} product={product} admin={true} />
          <button
            className="bg-[#c73838] w-full rounded-b-md py-2 flex justify-center"
            onClick={() => deleteProduct(product._id)}>
            <MdDelete size={25} />
          </button>
        </div>
      ))}
    </div>
  );
}
