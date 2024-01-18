import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth, useProducts } from "../../store/hooks/storeHooks";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/reducers/productsReducer";
import { Products } from "../../types/general";

const ProductDetails = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { products } = useProducts();
  const { user } = useAuth();
  const search = useSearchParams();
  const id = search[0].get("id");
  const product = products.find((prod) => prod._id === id);
  if (!product) {
    return <Navigate to={"/"} />;
  }
  const similarProducts = products.filter(
    (prod) =>
      prod.productCategory === product.productCategory &&
      prod._id !== product._id
  );
  const navigate = useNavigate();

  return (
    <div className="container overflow-hidden mx-auto my-8 p- flex flex-col">
      <div className="flex max-[793px]:flex-col items-center gap-8">
        <div>
          <img
            src={product.productImage}
            alt="Product"
            className="rounded-lg w-[400px] max-[793px]:w-full h-[400px] shadow-md"
          />
        </div>
        <div className="w-[50%] max-[793px]:w-full">
          <h1 className="text-3xl font-bold mb-4">{product.productTitle}</h1>
          <p className="text-gray-300 font-Chivo text-[20px] mb-4">
            {product.productDescription}
          </p>
          <div className="flex items-center mb-4">
            <span className="text-xl font-semibold mr-2">
              {product.productPrice}
            </span>
            <span className="text-gray-500">In Stock</span>
          </div>
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
          <button
            className="bg-cyan-500 my-4 mx-auto w-full hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-full"
            onClick={() =>
              navigate(
                `/seller-user-chat?userId=${user?.id}&sellerId=${product.productSeller._id}`
              )
            }>
            Contact Seller
          </button>
        </div>
      </div>
      <h2 className="mt-4 text-2xl font-bungee font-extrabold">
        Similar Products
      </h2>
      <div className="my-4 flex gap-4 flex-wrap items-center">
        {similarProducts.map((prod) => (
          <div key={prod._id}>
            <img
              src={prod.productImage}
              className="w-[200px] h-[200px] cursor-pointer"
              onClick={() => navigate(`/details?id=${prod._id}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
