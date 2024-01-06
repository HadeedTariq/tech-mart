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

export { User, serverError };
