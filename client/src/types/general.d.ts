type User = {
  username: string;
  email: string;
  role: string;
  id: string;
};
type serverError = {
  response: {
    data: {
      message: string;
    };
  };
};
type Products = {
  productTitle: string;
  productDescription: string;
  productCategory: string;
  productImage: string;
  productSeller: Omit<User, "id", "role"> & { _id: string };
  productPrice: string;
  productType: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export { User, serverError, Products };
