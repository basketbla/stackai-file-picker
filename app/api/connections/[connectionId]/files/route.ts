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

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const resourceId = searchParams.get("resource_id");
    const cursor = searchParams.get("cursor");
    const pageSize = parseInt(searchParams.get("page_size") || "100", 10);
    const searchQuery = searchParams.get("search_query");

    // Create authenticated client
    const client = await createServerAuthenticatedClient(token);

    // Use search API if search query is provided, otherwise get children
    const filesResponse = searchQuery
      ? await client.connections.searchConnectionResourcesConnectionsConnectionIdResourcesSearchGet(
          (
            await params
          ).connectionId,
          searchQuery,
          cursor || undefined,
          pageSize
        )
      : await client.connections.getChildrenResourcesConnectionsConnectionIdResourcesChildrenGet(
          (
            await params
          ).connectionId,
          resourceId || undefined, // use resource_id if provided, undefined for root files
          cursor || undefined, // use cursor for pagination
          pageSize // configurable page size
        );

    // Return pagination-aware response
    const data = filesResponse.data || [];
    const hasMore = data.length === pageSize; // Simple heuristic - if we got a full page, there might be more

    return NextResponse.json({
      data,
      total: data.length, // In a real implementation, this would come from the API
      hasMore,
      cursor: hasMore ? `next-${cursor || "start"}` : null, // Generate next cursor
    });
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
