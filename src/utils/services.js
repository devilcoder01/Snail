const checkWalletStatus = () => {
    try {
      // Check if wallet exists in localStorage
      const walletData = localStorage.getItem('walletData');
      
      if (walletData) {
        const parsedWallet = JSON.parse(walletData);
        setWallet(parsedWallet);
        setIsInitialized(true);
      } else {
        setIsInitialized(false);
      }
    } catch (error) {
      console.error('Error checking wallet status:', error);
      setIsInitialized(false);
    } finally {
      setLoading(false);
    }
  };