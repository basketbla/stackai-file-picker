import { useAuthStore } from "@/lib/auth-store";
import { ConnectionCard } from "@/stack-api-autogen";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Alert, AlertDescription } from "./ui/alert";
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

export default function FileExplorer() {
  const { logout, client } = useAuthStore();
  const [connections, setConnections] = useState<ConnectionCard[]>([]);
  const [isLoadingConnections, setIsLoadingConnections] = useState(false);
  const [connectionsError, setConnectionsError] = useState<string | null>(null);

  const loadConnections = async () => {
    if (!client) return;

    try {
      setIsLoadingConnections(true);
      setConnectionsError(null);

      // List connections (similar to the Python workflow)
      const response = await client.connections.getConnectionsConnectionsGet();
      setConnections(response || []);
    } catch (err) {
      setConnectionsError(
        err instanceof Error ? err.message : "Failed to load connections"
      );
    } finally {
      setIsLoadingConnections(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Image
                className="dark:invert"
                src="/next.svg"
                alt="Stack AI"
                width={120}
                height={24}
                priority
              />
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-xl font-semibold text-gray-900">
                File Explorer
              </h1>
            </div>
            <Button onClick={logout} variant="destructive">
              Logout
            </Button>
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
                  Manage your data source connections
                </CardDescription>
              </div>
              <Button onClick={loadConnections} disabled={isLoadingConnections}>
                {isLoadingConnections && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isLoadingConnections ? "Loading..." : "Load Connections"}
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {connectionsError && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{connectionsError}</AlertDescription>
              </Alert>
            )}

            {connections.length === 0 &&
              !isLoadingConnections &&
              !connectionsError && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No connections loaded.</p>
                  <p className="text-sm">
                    Click &quot;Load Connections&quot; to get started.
                  </p>
                </div>
              )}

            {connections.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Available Connections</h3>
                  <Badge variant="secondary">{connections.length} found</Badge>
                </div>
                <Separator />
                <div className="grid gap-4">
                  {connections.map((connection, index) => (
                    <Card
                      key={connection.connection_id || index}
                      className="p-4"
                    >
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
                              {new Date(
                                connection.created_at
                              ).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
