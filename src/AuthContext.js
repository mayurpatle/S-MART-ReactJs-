import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        setIsAdmin(!!token.claims.admin);
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        setIsAdmin(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser  ,  isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
