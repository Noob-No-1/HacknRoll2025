import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase-config.mjs";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a component/element wrapped by AuthProvider.");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const initValue = {
    userLoggedIn: !!currentUser, 
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={initValue}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}
