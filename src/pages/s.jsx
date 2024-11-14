import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

const WalletManager = () => {
  const [view, setView] = useState('initial'); // 'initial', 'seedPhrase', 'import'
  const [seedPhrase, setSeedPhrase] = useState([]);
  const [importedWords, setImportedWords] = useState(Array(12).fill(''));

  // Function to generate a random seed phrase (example only - use a proper crypto library in production)
  const generateSeedPhrase = () => {
    const words = [
      'abandon', 'ability', 'able', 'about', 'above', 'absent',
      'absorb', 'abstract', 'absurd', 'abuse', 'access', 'accident'
    ];
    return Array.from({ length: 12 }, () => 
      words[Math.floor(Math.random() * words.length)]
    );
  };

  const handleCreateWallet = () => {
    const newSeedPhrase = generateSeedPhrase();
    setSeedPhrase(newSeedPhrase);
    setView('seedPhrase');
  };

  const handleImportWallet = () => {
    setView('import');
  };

  const handleWordChange = (index, value) => {
    const newWords = [...importedWords];
    newWords[index] = value;
    setImportedWords(newWords);
  };

  const handleImportSubmit = () => {
    // Validate and process imported seed phrase
    if (importedWords.every(word => word.trim() !== '')) {
      // Add your wallet import logic here
      alert('Wallet imported successfully!');
    } else {
      alert('Please fill in all words');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">Snail</h1>
      <p className="text-gray-600 mb-6">A web based wallet</p>

      <Card className="p-6">
        <CardContent>
          {view === 'initial' && (
            <div className="flex gap-4 justify-center">
              <Button onClick={handleCreateWallet}>Create Wallet</Button>
              <Button variant="outline" onClick={handleImportWallet}>
                Import Wallet
              </Button>
            </div>
          )}

          {view === 'seedPhrase' && (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  Please store these 12 words safely. They are the only way to recover your wallet.
                </AlertDescription>
              </Alert>
              <div className="grid grid-cols-3 gap-4">
                {seedPhrase.map((word, index) => (
                  <div key={index} className="p-2 bg-gray-100 rounded">
                    <span className="font-mono text-gray-500">{index + 1}.</span>{' '}
                    {word}
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === 'import' && (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  Enter your 12-word seed phrase to import your wallet
                </AlertDescription>
              </Alert>
              <div className="grid grid-cols-3 gap-4">
                {importedWords.map((word, index) => (
                  <Input
                    key={index}
                    placeholder={`Word ${index + 1}`}
                    value={word}
                    onChange={(e) => handleWordChange(index, e.target.value)}
                    className="w-full"
                  />
                ))}
              </div>
              <Button onClick={handleImportSubmit} className="w-full">
                Import Wallet
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletManager;