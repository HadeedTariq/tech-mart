import { Header } from "./components";
import Home from "./pages/user/Home";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { accountApi } from "./config/axios";
import { setUser } from "./store/reducers/authReducer";
import { useEffect } from "react";
import { socket } from "./sockets/socket";
import { useAuth } from "./store/hooks/storeHooks";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  useQuery({
    queryKey: ["authentication"],
    queryFn: async () => {
      const { data } = await accountApi.post("/authenticate");
      dispatch(setUser(data));
      return null;
    },
  });
  useEffect(() => {
    socket.emit("addUser", { userId: user?.id, role: user?.role });
  }, [user?.email]);
  return (
    <Routes>
      //~user accissble route
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
