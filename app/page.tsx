"use client";

import FileExplorer from "@/components/file-explorer";
import LoginForm from "@/components/login-form";
import { useAuthStore } from "../lib/auth-store";

export default function Home() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <FileExplorer />;
}
