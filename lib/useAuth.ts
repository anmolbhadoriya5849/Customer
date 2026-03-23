import { useEffect, useState } from "react";
import axios from "axios";
import { u } from "framer-motion/client";

type AuthUser = {
  id: string;
  email?: string;
  name?: string;
};

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await axios.get(
          `http://localhost:5173/api/v1/auth/customer`,
          { withCredentials: true }
        );

        console.log(res.data);

        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

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

  return { user, loading, logout };
}
