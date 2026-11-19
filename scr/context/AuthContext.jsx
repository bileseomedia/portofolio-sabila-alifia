import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoAdmin, setIsDemoAdmin] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) {
      // Check local storage for offline demo session
      const demoAuth = localStorage.getItem('sabila_demo_admin_auth');
      if (demoAuth === 'true') {
        setIsDemoAdmin(true);
      }
      setLoading(false);
      return;
    }

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loginWithPassword = async (email, password) => {
    if (!isSupabaseConfigured() || !supabase) {
      // Offline / Demo mode passcode check
      if (password.trim().toUpperCase() === 'SABILA2025' || password.trim() === 'admin123') {
        setIsDemoAdmin(true);
        localStorage.setItem('sabila_demo_admin_auth', 'true');
        return { success: true };
      }
      throw new Error('Kode akses demo salah. Gunakan: SABILA2025');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { success: true, data };
  };

  const registerAdmin = async (email, password) => {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase belum dihubungkan. Silakan atur .env terlebih dahulu.');
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return { success: true, data };
  };

  const logout = async () => {
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    }
    setIsDemoAdmin(false);
    localStorage.removeItem('sabila_demo_admin_auth');
  };

  const isAuthenticated = Boolean(user || isDemoAdmin);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        isDemoAdmin,
        loginWithPassword,
        registerAdmin,
        logout,
        isConfigured: isSupabaseConfigured(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
