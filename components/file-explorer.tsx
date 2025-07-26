import { useAuthStore } from "@/lib/auth-store";
import { ConnectionCard } from "@/stack-api-autogen";
import { Loader2 } from "lucide-react";
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
import { Skeleton } from "./ui/skeleton";

function ConnectionsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Separator />
      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function FileExplorer() {
  const { logout, client } = useAuthStore();
  const [connections, setConnections] = useState<ConnectionCard[]>([]);
  const [isLoadingConnections, setIsLoadingConnections] = useState(false);
  const [connectionsError, setConnectionsError] = useState<string | null>(null);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  const loadConnections = async () => {
    if (!client) return;

    try {
      setIsLoadingConnections(true);
      setConnectionsError(null);

      // List connections (similar to the Python workflow)
      const response = await client.connections.getConnectionsConnectionsGet();
      setConnections(response || []);
      setHasLoadedOnce(true);
    } catch (err) {
      setConnectionsError(
        err instanceof Error ? err.message : "Failed to load connections"
      );
    } finally {
      setIsLoadingConnections(false);
    }
  };

  const renderConnectionsContent = () => {
    // Show skeleton while loading (only on first load or when explicitly loading)
    if (isLoadingConnections && (!hasLoadedOnce || connections.length === 0)) {
      return <ConnectionsSkeleton />;
    }

    // Show error state
    if (connectionsError) {
      return (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{connectionsError}</AlertDescription>
        </Alert>
      );
    }

    // Show empty state (only if we've loaded once and there are no connections)
    if (connections.length === 0 && hasLoadedOnce && !isLoadingConnections) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          <p>No connections found.</p>
          <p className="text-sm">
            Click &quot;Load Connections&quot; to refresh.
          </p>
        </div>
      );
    }

    // Show initial state (never loaded)
    if (connections.length === 0 && !hasLoadedOnce && !isLoadingConnections) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          <p>Ready to load your connections.</p>
          <p className="text-sm">
            Click &quot;Load Connections&quot; to get started.
          </p>
        </div>
      );
    }

    // Show connections
    if (connections.length > 0) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Available Connections</h3>
            <Badge variant="secondary">{connections.length} found</Badge>
          </div>
          <Separator />
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
    }

    return null;
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
            <Button onClick={logout} variant="outline">
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
              <Button
                onClick={loadConnections}
                disabled={isLoadingConnections}
                variant={hasLoadedOnce ? "outline" : "default"}
              >
                {isLoadingConnections && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isLoadingConnections
                  ? "Loading..."
                  : hasLoadedOnce
                  ? "Refresh"
                  : "Load Connections"}
              </Button>
            </div>
          </CardHeader>

          <CardContent>{renderConnectionsContent()}</CardContent>
        </Card>
      </main>
    </div>
  );
}
