type User = {
  username: string;
  email: string;
  password: string;
  role: string;
};
type Account = Omit<User, "password"> & { id: string };
export { User, Account };
