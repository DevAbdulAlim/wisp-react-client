import { Outlet } from "react-router-dom";
import ChatListPage from "./pages/ChatListPage";

const Layout: React.FC = () => {
  return (
    <div className="h-svh w-lvh flex">
      <div className="hidden md:block">
        <ChatListPage />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
