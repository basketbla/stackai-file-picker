import FileExplorer from "@/components/file-explorer";
import {
  createServerAuthenticatedClient,
  getTokenFromCookies,
} from "@/lib/auth";
import {
  ApiError,
  ConnectionCard,
  StackDirectory,
  StackFile,
} from "@/stack-api-autogen";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ServerData {
  connections: ConnectionCard[];
  selectedConnection: ConnectionCard | null;
  files: (StackFile | StackDirectory)[];
}

function isUnauthorizedError(error: unknown): boolean {
  if (error instanceof ApiError) {
    return error.status === 401;
  }
  return false;
}

async function loadServerData(token: string): Promise<ServerData> {
  try {
    const client = await createServerAuthenticatedClient(token);

    // Fetch all connections
    const connections = await client.connections.getConnectionsConnectionsGet();
    const connectionList = connections || [];

    // Get the first connection and its files
    if (connectionList.length > 0) {
      const firstConnection = connectionList[0];

      try {
        // Fetch files for the first connection
        const filesResponse =
          await client.connections.getChildrenResourcesConnectionsConnectionIdResourcesChildrenGet(
            firstConnection.connection_id!,
            undefined, // no specific resource_id, get root files
            undefined, // no cursor
            100 // page size
          );

        return {
          connections: connectionList,
          selectedConnection: firstConnection,
          files: filesResponse.data || [],
        };
      } catch (filesError) {
        if (isUnauthorizedError(filesError)) {
          redirect("/api/auth/server-logout");
        }
        console.error("Failed to load files for connection:", filesError);
        return {
          connections: connectionList,
          selectedConnection: firstConnection,
          files: [],
        };
      }
    }

    return {
      connections: connectionList,
      selectedConnection: null,
      files: [],
    };
  } catch (error) {
    if (isUnauthorizedError(error)) {
      redirect("/api/auth/server-logout");
    }
    console.error("Failed to load server data:", error);
    return {
      connections: [],
      selectedConnection: null,
      files: [],
    };
  }
}

export default async function Home() {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();
  const token = getTokenFromCookies(cookieString);

  // This should not happen due to layout redirect, but just in case
  if (!token) {
    return <div>Authentication required</div>;
  }

  const serverData = await loadServerData(token);

  return <FileExplorer initialData={serverData} />;
}
