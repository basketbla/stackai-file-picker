"use client";

import { create } from "zustand";
import { StackAiClient } from "../stack-api-autogen";
import {
  clearToken,
  extractTokenFromAuthHeader,
  getAuthHeaders,
  getStoredToken,
  storeToken,
} from "./auth";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  client: StackAiClient | null;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  initializeAuth: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set, get) => ({
  // Initial state
  isAuthenticated: false,
  isLoading: false,
  client: null,
  error: null,

  // Actions
  initializeAuth: () => {
    const token = getStoredToken();
    if (token) {
      const stackClient = new StackAiClient({
        BASE: process.env.NEXT_PUBLIC_API_URL,
        TOKEN: token,
      });
      set({
        isAuthenticated: true,
        client: stackClient,
      });
    }
  },

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });

      const authHeaders = await getAuthHeaders(email, password);
      const token = extractTokenFromAuthHeader(authHeaders.Authorization);

      // If we got auth headers, assume it works
      const stackClient = new StackAiClient({
        BASE: process.env.NEXT_PUBLIC_API_URL,
        TOKEN: token,
      });

      // Store the token and set authenticated state
      storeToken(token);
      set({
        isAuthenticated: true,
        client: stackClient,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Authentication failed";
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw err;
    }
  },

  logout: () => {
    clearToken();
    set({
      isAuthenticated: false,
      client: null,
      error: null,
    });
  },
}));
