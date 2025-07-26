"use client";

import FileExplorer from "@/components/file-explorer";
import LoginForm from "@/components/login-form";
import { Loader2 } from "lucide-react";
import { Card } from "../components/ui/card";
import { useAuthStore } from "../lib/auth-store";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <div>
              <h3 className="font-medium">Loading...</h3>
              <p className="text-sm text-muted-foreground">
                Initializing your session
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <FileExplorer />;
}
