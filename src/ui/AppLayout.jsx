import { Outlet } from "react-router-dom";
import Header from "./Header";
import Info from "./Info";

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Info />
    </div>
  );
}

export default AppLayout;
