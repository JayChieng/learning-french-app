import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar/TopBar";
import "./AppLayout.scss";

function AppLayout() {
  return (
    <div className="app-layout">
      <TopBar />
      <main className="app-layout__main">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
