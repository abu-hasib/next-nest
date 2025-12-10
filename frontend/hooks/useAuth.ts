"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import API, { setAuthToken, initAuth } from "../lib/api";

export function useAuth() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    initAuth();
  }, []);

  async function login(email: string, password: string) {
    const res = await API.post("/auth/login", { email, password });
    const token = res.data.access_token;
    setAuthToken(token);
    setUser(res.data.user);
    return res;
  }

  function logout() {
    setAuthToken(undefined);
    setUser(null);
    router.push("/admin/login");
  }

  return { user, login, logout };
}
