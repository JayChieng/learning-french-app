import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar/TopBar";
import { useAppData } from "../context/AppDataContext";
import "./AppLayout.scss";

function AppLayout() {
  const { progressReady, progressLoadError, progressSyncError, retryProgressLoad, retryProgressSync } = useAppData();

  return (
    <div className="app-layout">
      <TopBar />
      <main className="app-layout__main">
        {progressLoadError ? (
          <div className="app-layout__progress-error" role="alert">
            <span>{progressLoadError}</span>
            <button type="button" onClick={retryProgressLoad}>Retry</button>
          </div>
        ) : !progressReady ? (
          <p role="status">Loading your progress...</p>
        ) : (
          <>
            {progressSyncError && (
              <div className="app-layout__progress-error" role="alert">
                <span>{progressSyncError}</span>
                <button type="button" onClick={retryProgressSync}>Retry</button>
              </div>
            )}
            <Outlet />
          </>
        )}
      </main>
    </div>
  );
}

export default AppLayout;
