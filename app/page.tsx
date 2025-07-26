import FileExplorer from "@/components/file-explorer";
import {
  createServerAuthenticatedClient,
  getTokenFromCookies,
} from "@/lib/auth";
import { ConnectionCard } from "@/stack-api-autogen";
import { cookies } from "next/headers";

async function loadConnections(token: string): Promise<ConnectionCard[]> {
  try {
    const client = await createServerAuthenticatedClient(token);
    const connections = await client.connections.getConnectionsConnectionsGet();
    return connections || [];
  } catch (error) {
    console.error("Failed to load connections:", error);
    return [];
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

  const connections = await loadConnections(token);

  return <FileExplorer connections={connections} />;
}
