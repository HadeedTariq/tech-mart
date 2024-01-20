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
import { useToast } from "@chakra-ui/react";
import CreateProduct from "./pages/seller/CreateProduct";
import ProductDetails from "./pages/user/ProductDetails";
import Chat from "./pages/user/Chat";
import SingleChat from "./pages/user/SingleChat";
import SellerChats from "./pages/seller/SellerChats";
import SellerHeader from "./components/seller/SellerHeader";
import SellerHome from "./pages/seller/SellerHome";
import SellerProducts from "./pages/seller/SellerProducts";

const App = () => {
  const dispatch = useDispatch();
  const toast = useToast();
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
  useEffect(() => {
    if (!user) return;
    if (user.id === import.meta.env.VITE_ADMIN_ID) {
      socket.on("requestNotification", (notification: string) => {
        toast({
          title: notification,
          status: "info",
          position: "top",
        });
      });
    }
  }, [socket]);
  return (
    <Routes>
      //^ user accissble route
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="createProduct" element={<CreateProduct />} />
        <Route path="details" element={<ProductDetails />} />
        <Route path="chat" element={<Chat />} />
        <Route path="seller-user-chat" element={<SingleChat />} />
      </Route>
      <Route path="/seller" element={<SellerHeader />}>
        <Route index element={<SellerHome />} />
        <Route path="chats" element={<SellerChats />} />
        <Route path="createProducts" element={<CreateProduct />} />
        <Route path="myProducts" element={<SellerProducts />} />
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
