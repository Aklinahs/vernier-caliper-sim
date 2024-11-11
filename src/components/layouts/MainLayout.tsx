import { Outlet } from "react-router-dom";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
