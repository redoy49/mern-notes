1️⃣ Execution Flow:
Create Context → Provide Context → Wrap Application → Use Context

// src/context/AuthContext.jsx
import { createContext } from 'react';
export const AuthContext = createContext(null);

// src/context/AuthProvider.jsx
import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fakeUser = { name: 'Redoy', email: 'test@example.com' };
    setTimeout(() => setUser(fakeUser), 1000);
  }, []);

  const authContextValue = { user, setUser };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export default useAuth;

// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from './context/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// src/components/Profile.jsx
import useAuth from '../hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <p>Loading user...</p>;

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;

1️⃣ Create Context:
- AuthContext is created using createContext(null).
  
2️⃣ Provide Context:
- AuthProvider holds user state.
- AuthProvider returns <AuthContext.Provider value={user, setUser}>.

3️⃣ Wrap Application:
- main.jsx wraps <App /> with <AuthProvider>.

4️⃣ Use Context via Hook:
- useAuth() calls useContext(AuthContext) to access user and setUser.
