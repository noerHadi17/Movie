
import Header from "../header";
import Footer from "../footer";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-900">
      <Header />
      <div className="flex-grow w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
