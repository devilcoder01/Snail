import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SlideNavigation from ".././ui/Navbar";
import Home from "../../pages/Home";
import WalletPage from "../../pages/WalletsPage";
import Signin from "../../pages/Setup";
import { useState, useEffect } from "react";
import { WalletAuthentication } from "../../utils/Authentication";


export default function AllRoute({ children }) {
  const [isInitialized, setIsInitialized] = useState(false);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if seedphrase exists in localStorage
    const checkWalletInitialization = () => {
      const seedphrase = localStorage.getItem('walletSeedPhrase');
      // console.log('Seedphrase from localStorage:', seedphrase); // This will log the seedphrase
      setIsInitialized(!!seedphrase);
      // setLoading(false);
    };

    checkWalletInitialization();
  }, []);


  return (
    <Router
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
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
