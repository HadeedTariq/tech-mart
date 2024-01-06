import { Login, Register } from "../../components";
import { useAuth } from "../../store/hooks/storeHooks";

const Home = () => {
  const { auth } = useAuth();
  return (
    <>
      {auth === "register" && <Register />}
      {auth === "login" && <Login />}
    </>
  );
};

export default Home;
