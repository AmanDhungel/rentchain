"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
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
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { loginData } = useAuthStore();

  // Keep a ref so callbacks always see the latest token (avoids stale closures)
  const tokenRef = useRef<string | null>(null);
  useEffect(() => {
    tokenRef.current = accessToken;
  }, [accessToken]);

  // Refresh queue state — serialize refresh calls and let waiting requests wait
  const isRefreshingRef = useRef(false);
  const refreshPromiseRef = useRef<Promise<string | null> | null>(null);

  const setAccessToken = useCallback((token: string | null) => {
    setAccessTokenState(token);
    tokenRef.current = token;
  }, []);

  // central refresh function that ensures only one refresh runs at a time
  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    // If a refresh is already in progress, return the same promise so callers can wait
    if (isRefreshingRef.current && refreshPromiseRef.current) {
      return refreshPromiseRef.current;
    }

    isRefreshingRef.current = true;
    const p = (async () => {
      try {
        // POST or GET depending on your API — keep credentials to send httpOnly cookie
        const res = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });
        if (!res.ok) {
          // refresh failed (expired/invalid refresh token)
          setAccessToken(null);
          setUser(null);
          return null;
        }
        const body = await res.json();
        const newToken = body?.accessToken ?? null;
        if (newToken) setAccessToken(newToken);
        // optionally set user if returned
        if (body?.user) {
          setUser(body.user);
          loginData(body.user);
        }
        return newToken;
      } catch (err) {
        setAccessToken(null);
        setUser(null);
        return null;
      } finally {
        isRefreshingRef.current = false;
        refreshPromiseRef.current = null;
      }
    })();

    refreshPromiseRef.current = p;
    return p;
  }, [loginData, setAccessToken]);

  // Hydrate on mount: attempt to refresh to load existing session (if cookie present)
  useEffect(() => {
    (async () => {
      // optional: set a lightweight loading state while hydrating
      try {
        await refreshAccessToken();
      } catch (err) {
        // ignore
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // fetch wrapper that uses the tokenRef and retries after refreshing once
  const fetchWithAuth = useCallback(
    async (input: RequestInfo, init: RequestInit = {}): Promise<Response> => {
      const makeRequest = async (token: string | null) => {
        const headers = new Headers(init.headers || {});
        if (token) headers.set("Authorization", `Bearer ${token}`);
        const mergedInit = {
          ...init,
          headers,
          credentials: "include" as RequestCredentials,
        };
        return fetch(input, mergedInit);
      };

      // first attempt with current token
      let res = await makeRequest(tokenRef.current);
      if (res.status !== 401) return res;

      // If 401 -> attempt refresh (serialized)
      const newToken = await refreshAccessToken();
      if (!newToken) {
        // refresh failed; return original 401 response (or create a custom one)
        return res;
      }

      // retry once with new token
      res = await makeRequest(newToken);
      return res;
    },
    [refreshAccessToken]
  );

  // Login: set token and user on success
  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        const res = await axios.post(
          "/api/auth/login",
          { email, password },
          { withCredentials: true }
        );
        const tok = res.data.accessToken ?? null;
        const u = res.data.user ?? null;
        setAccessToken(tok);
        setUser(u);
        if (u) loginData(u);
        // Optionally set axios defaults for convenience
        if (tok)
          axios.defaults.headers.common["Authorization"] = `Bearer ${tok}`;
        router.push("/dashboard/overview");
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [router, loginData, setAccessToken]
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
        router.push("/dashboard");
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
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
      delete axios.defaults.headers.common["Authorization"];
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
