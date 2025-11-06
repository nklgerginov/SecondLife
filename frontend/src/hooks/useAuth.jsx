import { useState, useEffect } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user from Supabase
    setTimeout(() => {
      // To test the logged-in state, you can manually set a user object here.
      // setUser({ email: 'test@example.com' });
      setUser(null); // Default to logged-out state
      setLoading(false);
    }, 1000);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    // Simulate Supabase login
    console.log('Simulating login for:', email);
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = { email };
        setUser(mockUser);
        setLoading(false);
        resolve({ user: mockUser, error: null });
      }, 1000);
    });
  };

  const logout = async () => {
    setLoading(true);
    // Simulate Supabase logout
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(null);
        setLoading(false);
        resolve({ error: null });
      }, 500);
    });
  };

  return { user, loading, login, logout };
};

export default useAuth;
