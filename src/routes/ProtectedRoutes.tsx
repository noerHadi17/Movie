import { Outlet, useLocation } from "react-router";
import { useToken } from "../hooks/useToken";

const ProtectedRoutes = () => {
  const { pathname } = useLocation();

  const { user } = useToken();

  const tokenProtected = ["/", "/detail", "/product"];
  const auth = ["/login"];

  if (tokenProtected.includes(pathname)) {
    if (!user?.accessToken) {
      window.location.href = "/login";
    }
  }

  if (auth.includes(pathname)) {
    if (user?.accessToken) {
      window.location.href = "/";
    }
  }

  return <Outlet />;
};

export default ProtectedRoutes;
