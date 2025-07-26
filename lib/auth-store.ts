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
  isLoading: true,
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
        isLoading: false,
      });
    } else {
      set({ isLoading: false });
    }
  },

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });

      const authHeaders = await getAuthHeaders(email, password);
      const token = extractTokenFromAuthHeader(authHeaders.Authorization);

      // Test the token by trying to get user info
      const stackClient = new StackAiClient({
        BASE: process.env.NEXT_PUBLIC_API_URL,
        TOKEN: token,
      });

      // Try to fetch user's personal folder to verify auth
      await stackClient.folders.getUserPersonalFolderFoldersMeGet();

      // If successful, store the token and set authenticated state
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
