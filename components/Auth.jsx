"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);
export function useAuth() {
  return useContext(AuthContext);
}
export default function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
}
