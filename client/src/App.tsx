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
import AdminHeader from "./components/admin/AdminHeader";
import AdminProtectedRoute from "./config/AdminProtectedRoute";
import AdminHome from "./pages/admin/Home.admin";
import AdminNotifications from "./pages/admin/Notifications.admin";
import AdminUsers from "./pages/admin/Users.admin";
import AdminProducts from "./pages/admin/Products.admin";

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
      //^ user accissble route
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
      </Route>
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminHeader />
          </AdminProtectedRoute>
        }>
        <Route index element={<AdminHome />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>
    </Routes>
  );
};

export default App;
