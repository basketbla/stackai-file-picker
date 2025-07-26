"use client";

import { ConnectionCard } from "@/stack-api-autogen";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

interface FileExplorerProps {
  connections: ConnectionCard[];
}

function LogoutButton() {
  const handleLogout = () => {
    // Clear the cookie
    document.cookie =
      "stack_ai_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    // Redirect to login
    window.location.href = "/login";
  };

  return (
    <Button onClick={handleLogout} variant="outline">
      Logout
    </Button>
  );
}

export default function FileExplorer({ connections }: FileExplorerProps) {
  const renderConnectionsContent = () => {
    // Show empty state
    if (connections.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          <p>No connections found.</p>
          <p className="text-sm">Your Stack AI connections will appear here.</p>
        </div>
      );
    }

    // Show connections
    return (
      <div className="space-y-4">
        <div className="grid gap-4">
          {connections.map((connection, index) => (
            <Card key={connection.connection_id || index} className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">
                      {connection.name || "Unnamed Connection"}
                    </h4>
                    <Badge variant="outline">
                      {connection.connection_provider || "Unknown"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ID: {connection.connection_id}
                  </p>
                  {connection.created_at && (
                    <p className="text-sm text-muted-foreground">
                      Created:{" "}
                      {new Date(connection.created_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-xl font-semibold text-gray-900">
                Rhett Owen StackAI File Explorer
              </h1>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Connections</CardTitle>
                <CardDescription>
                  Your Google Drive connections in Stack AI
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>{renderConnectionsContent()}</CardContent>
        </Card>
      </main>
    </div>
  );
}
