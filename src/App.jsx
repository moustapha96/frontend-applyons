import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { ScrollToTop } from "./components";
import { AuthProvider, LayoutProvider, SettingsProvider } from "./context";
import { configureFakeBackend } from "./helpers";
import AllRoutes from "./routes/Routes";

import "preline/preline";


configureFakeBackend();

function App() {
  const { pathname } = useLocation();


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 400);
  }, [pathname]);

  return (
    <HelmetProvider>
      <LayoutProvider>
        <SettingsProvider>
          <AuthProvider>
            <AllRoutes />
            <ScrollToTop />
            <Toaster richColors />
          </AuthProvider>
        </SettingsProvider>
      </LayoutProvider>
    </HelmetProvider>
  );
}

export default App;
