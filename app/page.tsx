import FileExplorer from "@/components/file-explorer";
import { getTokenFromCookies } from "@/lib/auth";
import { USER_SETTINGS } from "@/lib/constants";
import {
  ApiError,
  ConnectionCard,
  StackDirectory,
  StackFile,
} from "@/stack-api-autogen";
import { cookies } from "next/headers";

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

async function loadServerData(): Promise<ServerData> {
  // Use hardcoded connection data, files will be fetched client-side
  const connectionList = [hardcodedConnection];

  return {
    connections: connectionList,
    selectedConnection: hardcodedConnection,
    files: [], // Empty array - files will be fetched client-side
  };
}

export default async function Home() {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();
  const token = getTokenFromCookies(cookieString);

  // This should not happen due to layout redirect, but just in case
  if (!token) {
    return <div>Authentication required</div>;
  }

  const serverData = await loadServerData();

  return <FileExplorer initialData={serverData} />;
}
