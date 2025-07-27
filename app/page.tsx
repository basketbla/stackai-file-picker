import FileExplorer from "@/components/file-explorer";
import {
  createServerAuthenticatedClient,
  getTokenFromCookies,
} from "@/lib/auth";
import { USER_SETTINGS } from "@/lib/constants";
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

// Create a hardcoded connection based on USER_SETTINGS
const hardcodedConnection: ConnectionCard = {
  connection_id: USER_SETTINGS.connection_id,
  user_id: "hardcoded-user",
  org_id: USER_SETTINGS.org_id,
  connection_provider: USER_SETTINGS.connection_provider_type,
  connection_provider_data: {
    can_be_knowledge_base: true,
  },
  created_by: {
    id: "hardcoded-user",
    email: "user@example.com",
    avatar_url: null,
    full_name: null,
    has_completed_onboarding: null,
    last_signed_in: null,
    updated_at: null,
  },
};

async function loadServerData(token: string): Promise<ServerData> {
  try {
    const client = await createServerAuthenticatedClient(token);

    // Use hardcoded connection instead of fetching connections
    const connectionList = [hardcodedConnection];

    try {
      // Fetch files for the hardcoded connection
      const filesResponse =
        await client.connections.getChildrenResourcesConnectionsConnectionIdResourcesChildrenGet(
          hardcodedConnection.connection_id!,
          undefined,
          undefined,
          100
        );

      return {
        connections: connectionList,
        selectedConnection: hardcodedConnection,
        files: filesResponse.data || [],
      };
    } catch (filesError) {
      if (isUnauthorizedError(filesError)) {
        redirect("/api/auth/server-logout");
      }
      console.error("Failed to load files for connection:", filesError);
      return {
        connections: connectionList,
        selectedConnection: hardcodedConnection,
        files: [],
      };
    }
  } catch (error) {
    if (isUnauthorizedError(error)) {
      redirect("/api/auth/server-logout");
    }
    console.error("Failed to load server data:", error);
    return {
      connections: [hardcodedConnection],
      selectedConnection: hardcodedConnection,
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
