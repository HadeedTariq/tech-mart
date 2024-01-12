import { useDispatch } from "react-redux";
import { Products } from "../types/general";
import { addToCart, removeFromCart } from "../store/reducers/productsReducer";
import { useAuth } from "../store/hooks/storeHooks";
import { useToast } from "@chakra-ui/react";
type Props = {
  remove?: boolean;
};
const Product = ({ remove }: Props) => {
  const product: Partial<Products> = {
    productTitle: "Biggest LapTop",
    productCategory: "laptop",
    productImage:
      "data:image/jpeg;base64,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",
    productPrice: "800$",
    productSeller: {
      username: "Hadeed",
      email: "hadeed12@gmail.com",
      _id: "ffg",
    },
  };
  const { user } = useAuth();
  const toast = useToast();
  const dispatch = useDispatch();
  return (
    <div className="w-[250px] max-[760px]:w-[80%]   overflow-hidden bg-[#13031d] text-white rounded-lg shadow-lg pb-2">
      <img
        className="w-full h-40 object-cover"
        src={product.productImage}
        alt={product.productTitle}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.productTitle}</div>
        <p className="text-gray-400 text-sm">
          Seller: {product.productSeller.username}
        </p>
      </div>
      <div className="px-6 py-4 flex justify-between items-center">
        <span className="text-gray-500">{product.productCategory}</span>
        <span className="text-teal-400 font-semibold">
          ${product.productPrice}
        </span>
      </div>
      {remove ? (
        <button
          className="bg-red-500 mx-auto w-full hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => {
            dispatch(removeFromCart(product as Products));
          }}>
          Remove From Cart
        </button>
      ) : (
        <button
          className="bg-teal-500 mx-auto w-full hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => {
            if (!user) {
              toast({
                title: "Authentication required",
                duration: 1500,
                isClosable: true,
                status: "warning",
              });
              return;
            }
            dispatch(addToCart(product as Products));
          }}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default Product;
