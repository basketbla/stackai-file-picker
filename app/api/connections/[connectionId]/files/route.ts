import {
  createServerAuthenticatedClient,
  getTokenFromCookies,
} from "@/lib/auth";
import { ApiError } from "@/stack-api-autogen";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ connectionId: string }> }
) {
  try {
    // Get the auth token from cookies
    const cookieString = request.headers.get("cookie") || "";
    const token = getTokenFromCookies(cookieString);

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get resource_id from query parameters
    const { searchParams } = new URL(request.url);
    const resourceId = searchParams.get("resource_id");

    // Create authenticated client
    const client = await createServerAuthenticatedClient(token);

    // Fetch files for the connection (root files if no resource_id, folder contents if resource_id provided)
    const filesResponse =
      await client.connections.getChildrenResourcesConnectionsConnectionIdResourcesChildrenGet(
        (
          await params
        ).connectionId,
        resourceId || undefined, // use resource_id if provided, undefined for root files
        undefined, // no cursor
        100 // page size
      );

    return NextResponse.json(filesResponse.data || []);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Failed to fetch connection files:", error);
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}
