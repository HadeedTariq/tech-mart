import { useToast } from "@chakra-ui/react";
import { useAdmin } from "../store/hooks/storeHooks";
import { Navigate } from "react-router-dom";
import AdminModal from "../components/admin/AdminModal";

type Props = {
  children: React.ReactNode;
};

const AdminProtectedRoute = ({ children }: Props) => {
  const { adminPassword } = useAdmin();
  const toast = useToast();
  if (!adminPassword) {
    return <AdminModal />;
  }
  if (adminPassword !== String(import.meta.env.VITE_ADMIN_PASSWORD)) {
    toast({
      title: "Incorrect admin password",
      status: "error",
      isClosable: true,
    });
    return <Navigate to={"/"} />;
  }
  return <div>{children}</div>;
};

export default AdminProtectedRoute;
