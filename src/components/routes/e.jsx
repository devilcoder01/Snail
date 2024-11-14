import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useWallet } from './context/WalletContext';

const AppRouter = () => {
  const { isInitialized, loading } = useWallet();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* If wallet not initialized, show setup screen */}
        {!isInitialized ? (
          <>
            <Route path="/setup" element={<WalletSetup />} />
            <Route path="*" element={<Navigate to="/setup" replace />} />
          </>
        ) : (
          <>
            {/* If wallet is initialized, show dashboard */}
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

// WalletSetup Component
const WalletSetup = () => {
  const { createWallet, importWallet } = useWallet();
  const navigate = useNavigate();

  const handleCreateWallet = async () => {
    const { success } = await createWallet();
    if (success) {
      navigate('/dashboard');
    }
  };

  const handleImportWallet = async (seedPhrase) => {
    const { success } = await importWallet(seedPhrase);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-md mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Welcome to Snail Wallet</h1>
          
          {/* Create Wallet Button */}
          <button
            onClick={handleCreateWallet}
            className="w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Create New Wallet
          </button>

          <div className="text-center my-4">- OR -</div>

          {/* Import Wallet Form */}
          <form onSubmit={(e) => {
            e.preventDefault();
            const seedPhrase = e.target.seedPhrase.value;
            handleImportWallet(seedPhrase);
          }}>
            <textarea
              name="seedPhrase"
              placeholder="Enter your seed phrase"
              className="w-full p-2 border rounded mb-4"
              rows={3}
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded"
            >
              Import Existing Wallet
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
};