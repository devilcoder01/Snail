import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SlideNavigation from "../Navbar";
import Home from "../../pages/Home";
import WalletPage from "../../pages/WalletsPage";
import Signin from "../../pages/Setup";
import { useState } from "react";

export default function AllRoute({ children }) {
  // const { isInitialized, loading } = useState();
  const isInitialized = false;

  return (
    <Router>
      {!isInitialized ? <></> : <SlideNavigation />}
      {children}
      <Routes>
        {!isInitialized ? (
          <>
            <Route path="/setup" element={<Signin />} />
            <Route path="*" element={<Navigate to="/setup" replace />} />
          </>
        ) : (
          <>
            {/* If wallet is initialized, show dashboard */}
            <Route path="/home" element={<Home />} />
            <Route path="/wallets" element={<WalletPage />} />
            <Route path="/transactions" element={<Signin />} />
            <Route path="/settings" element={<WalletPage />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}
