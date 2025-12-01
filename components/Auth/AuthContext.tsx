"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import useAuthStore from "@/context/User";

type User = {
  id: string;
  fullName: string;
  email: string;
  role: string;
} | null;

type AuthContextType = {
  user: User;
  accessToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: {
    fullName: string;
    email: string;
    phoneNumber?: string;
    role: string;
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  fetchWithAuth: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { loginData } = useAuthStore();

  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    try {
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) return null;
      const body = await res.json();
      if (body?.accessToken) {
        setAccessToken(body.accessToken);
        return body.accessToken;
      }
      return null;
    } catch (err) {
      return null;
    }
  }, []);

  const fetchWithAuth = useCallback(
    async (input: RequestInfo, init: RequestInit = {}): Promise<Response> => {
      const headers = new Headers(init.headers || {});
      if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
      const mergedInit = {
        ...init,
        headers,
        credentials: "include" as RequestCredentials,
      };

      let res = await fetch(input, mergedInit);
      if (res.status === 401) {
        const newToken = await refreshAccessToken();
        if (!newToken) return res;
        const retryHeaders = new Headers(init.headers || {});
        retryHeaders.set("Authorization", `Bearer ${newToken}`);
        res = await fetch(input, {
          ...init,
          headers: retryHeaders,
          credentials: "include" as RequestCredentials,
        });
      }
      return res;
    },
    [accessToken, refreshAccessToken]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        const res = await axios.post("/api/auth/login", { email, password });
        console.log("rsessdadasdasdadasdasd", res);
        setAccessToken(res.data.accessToken ?? null);
        setUser(res.data.user ?? null);
        loginData(res.data.user);
        router.push("/dashboard/overview");
        setLoading(false);
      } catch (err) {
        setLoading(false);
        throw err;
      }
    },
    [router]
  );

  const register = useCallback(
    async (payload: {
      fullName: string;
      email: string;
      phoneNumber?: string;
      role: string;
      password: string;
      confirmPassword: string;
    }) => {
      setLoading(true);
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res
            .json()
            .catch(() => ({ message: "Register failed" }));
          throw new Error(err.message || "Register failed");
        }
        const body = await res.json();
        setAccessToken(body.accessToken ?? null);
        setUser(body.user ?? null);
        setLoading(false);
        router.push("/dashboard");
      } catch (err) {
        setLoading(false);
        throw err;
      }
    },
    [router]
  );

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      // ignore
    } finally {
      setAccessToken(null);
      setUser(null);
      router.push("/");
    }
  }, [router]);

  const value: AuthContextType = {
    user,
    accessToken,
    loading,
    login,
    register,
    logout,
    fetchWithAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
