import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import ProductManager from './components/ProductManager';

const AppContent = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div style={{ fontFamily: 'inherit' }}>
      <header>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <h1 style={{ letterSpacing: '0.5px', margin: 0 }}>Shopyfy</h1>
          {isLoggedIn && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '12px' }}>
              <span style={{ fontWeight: '500' }}>Welcome, <strong>{user.name}</strong></span>
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </header>

      <main>
        {!isLoggedIn ? (
          showRegister ? (
            <Register onSwitchToLogin={() => setShowRegister(false)} />
          ) : (
            <Login onSwitchToRegister={() => setShowRegister(true)} />
          )
        ) : (
          <ProductManager />
        )}
      </main>
    </div>
  );
};

export default AppContent;
