type Product = {
  productTitle: string;
  productDescription: string;
  productCategory: string;
  productImage: string;
  productSeller: string;
  productPrice: string;
  productType: string;
};
type ProductAuthProps = Product & {
  sellerPassword: string;
};

export { Product, ProductAuthProps };
