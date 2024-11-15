import React, { useState } from 'react';
import { 
  Home,
  Wallet,
  Settings,
  Menu
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const NavButton = ({ icon: Icon, isActive = false, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`
        w-12 h-12 rounded-full flex items-center justify-center
        transition-all duration-200 ease-in-out
        group relative
        ${isActive 
          ? 'bg-black text-white' 
          : 'text-gray-500 hover:bg-gray-100'
        }
      `}
      
    >
      <Icon size={20} />
      
    </button>
  );
};

const SideNavigation = () => {

  const navigate = useNavigate('/home')
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'wallets', icon: Wallet, label: 'Wallet' },
    { id: 'transactions', icon: Menu, label: 'Transactions' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  const handleNavigation = (sectionId) => {
    setActiveSection(sectionId);
    navigate(`/${sectionId}`)

  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 bg-white rounded-full py-4 px-2 shadow-lg z-50 border-2 ">
      <div className="flex flex-col items-center space-y-4">
        {navItems.map((item) => (
          <NavButton
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeSection === item.id}
            onClick={() => handleNavigation(item.id)}
          />
        ))}
      </div>
    </div>
  );
};


export default SideNavigation;