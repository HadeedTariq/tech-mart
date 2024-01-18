import { useDispatch } from "react-redux";
import { Products } from "../types/general";
import { addToCart, removeFromCart } from "../store/reducers/productsReducer";
import { useAuth } from "../store/hooks/storeHooks";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
type Props = {
  remove?: boolean;
  product: Products;
  admin?: boolean;
};
const Product = ({ remove, product, admin }: Props) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const toast = useToast();
  const dispatch = useDispatch();
  return (
    <div className="w-[270px]  max-[760px]:w-[80%]   overflow-hidden bg-[#13031d] text-white rounded-lg shadow-lg pb-2">
      <img
        className="w-full h-40 object-cover"
        src={product.productImage}
        alt={product.productTitle}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-[24px] font-Kanit mb-2">
          {product.productTitle}
        </div>
        <p className="text-gray-400 text-sm">
          Seller: {product.productSeller.username}
        </p>
      </div>
      <div className="px-6 py-4 flex justify-between items-center">
        <span className="text-gray-500">{product.productCategory}</span>
        <span className="text-teal-400 font-semibold">
          {product.productPrice}
        </span>
      </div>
      {!admin && (
        <>
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
                toast({
                  title: "Added to Cart",
                  isClosable: true,
                });
              }}>
              Add to Cart
            </button>
          )}
          <button
            className="bg-indigo-500 my-4 mx-auto w-full hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => navigate(`/details?id=${product._id}`)}>
            Details
          </button>
        </>
      )}
    </div>
  );
};

export default Product;
