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
import TokensContexts from "../context/AssetTokens";
import getEthBalances from "../../utils/GetEthTokens";
import TokenBalancesContext from "../context/TokenBalancesContext";

export default function AllRoute({ children }) {
  const [isInitialized, setIsInitialized] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState([]);
  const [tokensSymboles, setTokenSymbole] = useState([]);

  useEffect(() => {
    const checkWalletInitialization = () => {
      const seedphrase = localStorage.getItem("walletSeedPhrase");
      setIsInitialized(!!seedphrase);
      // setLoading(false);
    };
    checkWalletInitialization();
  }, []);

  const EthPublicKey = "0xeF5c67E6dBb6Fd6CfB9C93ADbc5801bcfc10c494";
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const { tokens } = await getEthBalances(EthPublicKey);
        setAssets(tokens);
        const symbols = tokens.map((e) => e.symbol);
        setTokenSymbole(symbols);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, [EthPublicKey]);

  return (
    <TokensContexts.Provider value={assets}>
      <TokenBalancesContext.Provider value={tokensSymboles}>
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
      </TokenBalancesContext.Provider>
    </TokensContexts.Provider>
  );
}
