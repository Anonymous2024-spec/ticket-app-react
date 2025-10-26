import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem("ticketapp_session");
    if (session) {
      setUser(JSON.parse(session));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock authentication
    if (email === "demo@example.com" && password === "password123") {
      const userData = {
        id: 1,
        email,
        name: "Demo User",
      };
      localStorage.setItem("ticketapp_session", JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  };

  const logout = () => {
    localStorage.removeItem("ticketapp_session");
    setUser(null);
  };

  return { user, login, logout, loading };
};
