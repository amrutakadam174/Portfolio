import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load logged-in user on refresh
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedUser) setUser(loggedUser);
  }, []);

  // Register user (frontend only)
  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const exists = users.find((u) => u.email === email);
    if (exists) {
      alert("User already exists with this email");
      return false;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! Please login.");
    return true;
  };

  // Login user (frontend only)
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (existingUser) {
      setUser({ name: existingUser.name, email: existingUser.email });
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ name: existingUser.name, email: existingUser.email })
      );
      return true;
    } else {
      alert("Invalid email or password");
      return false;
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
