"use client";

import { supabase } from "@/lib/supabase";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
export function useAuth() {
  return useContext(AuthContext);
}
export default function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data, error }) => {
      if (!error && data.session) {
        setSession(data.session);
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
}
