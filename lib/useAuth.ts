import { useEffect, useState } from "react";
import axios from "axios";

type AuthUser = {
  id: string;
  email?: string;
  name?: string;
};

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 reusable function
  const fetchMe = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/customer`,
        { withCredentials: true }
      );

      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  async function logout() {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
    setUser(null);
  }

  return { user, loading, logout, refreshUser: fetchMe };
}