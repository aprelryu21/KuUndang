import React, { createContext, useContext, useEffect, useState } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'superadmin';
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password?: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  isDemoAuth: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_ADMIN_KEY = 'wedding_studio_admin_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      // Check demo session first
      const demoSession = localStorage.getItem(DEMO_ADMIN_KEY);
      if (demoSession) {
        try {
          setUser(JSON.parse(demoSession));
          setLoading(false);
          return;
        } catch {
          localStorage.removeItem(DEMO_ADMIN_KEY);
        }
      }

      // Check Supabase session if configured
      if (isSupabaseConfigured && supabase) {
        try {
          const { data } = await supabase.auth.getSession();
          if (data.session?.user) {
            setUser({
              id: data.session.user.id,
              email: data.session.user.email || 'admin@weddingstudio.com',
              full_name: data.session.user.user_metadata?.full_name || 'Wedding Studio Admin',
              role: 'admin',
            });
          }
        } catch (e) {
          console.warn('Supabase auth check failed:', e);
        }
      }
      setLoading(false);
    }

    checkSession();
  }, []);

  const signIn = async (usernameOrEmail: string, password?: string): Promise<{ error?: string }> => {
    const cleanUser = (usernameOrEmail || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // Check credentials: Username "Nagata" and Password "09072022"
    const isValidUsername = cleanUser === 'nagata' || cleanUser === 'nagata@weddingstudio.com';
    const isValidPassword = cleanPass === '09072022';

    if (isValidUsername && isValidPassword) {
      const adminUser: UserProfile = {
        id: 'admin-nagata',
        email: 'nagata@weddingstudio.com',
        full_name: 'Nagata (Administrator)',
        role: 'admin',
      };
      setUser(adminUser);
      localStorage.setItem(DEMO_ADMIN_KEY, JSON.stringify(adminUser));
      return {};
    }

    // If Supabase is configured and has remote auth
    if (isSupabaseConfigured && supabase && password && usernameOrEmail.includes('@')) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email: usernameOrEmail, password });
        if (!error && data.user) {
          const adminUser: UserProfile = {
            id: data.user.id,
            email: data.user.email || usernameOrEmail,
            full_name: data.user.user_metadata?.full_name || 'Nagata (Administrator)',
            role: 'admin',
          };
          setUser(adminUser);
          localStorage.setItem(DEMO_ADMIN_KEY, JSON.stringify(adminUser));
          return {};
        }
      } catch (err: any) {
        console.warn('Supabase auth failed:', err);
      }
    }

    return { error: 'Username atau kata sandi salah. Silakan periksa kembali.' };
  };

  const signOut = async () => {
    localStorage.removeItem(DEMO_ADMIN_KEY);
    setUser(null);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Supabase signOut failed:', e);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
        isDemoAuth: !isSupabaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
