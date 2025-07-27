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
          resourceId || undefined,
          cursor || undefined,
          pageSize
        );

    // Return pagination-aware response
    const data = filesResponse.data || [];
    const hasMore = data.length === pageSize;

    return NextResponse.json({
      data,
      total: data.length,
      hasMore,
      cursor: hasMore ? `next-${cursor || "start"}` : null,
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
