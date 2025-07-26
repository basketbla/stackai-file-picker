import {
  createServerAuthenticatedClient,
  getTokenFromCookies,
} from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { connectionId: string } }
) {
  try {
    // Get the auth token from cookies
    const cookieString = request.headers.get("cookie") || "";
    const token = getTokenFromCookies(cookieString);

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Create authenticated client
    const client = await createServerAuthenticatedClient(token);

    // Fetch files for the connection
    const filesResponse =
      await client.connections.getChildrenResourcesConnectionsConnectionIdResourcesChildrenGet(
        params.connectionId,
        undefined, // no specific resource_id, get root files
        undefined, // no cursor
        100 // page size
      );

    return NextResponse.json(filesResponse.data || []);
  } catch (error) {
    console.error("Failed to fetch connection files:", error);
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}
