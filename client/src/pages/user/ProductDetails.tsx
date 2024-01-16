import { Navigate, useSearchParams } from "react-router-dom";
import { useProducts } from "../../store/hooks/storeHooks";

const ProductDetails = () => {
  const { products } = useProducts();
  const search = useSearchParams();
  const id = search[0].get("id");
  const product = products.find((prod) => prod._id === id);
  if (!product) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="container mx-auto my-8 p-8">
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
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
