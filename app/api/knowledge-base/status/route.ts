import {
  createServerAuthenticatedClient,
  getTokenFromCookies,
} from "@/lib/auth";
import type { StackDirectory, StackFile } from "@/stack-api-autogen";
import { ApiError } from "@/stack-api-autogen";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get the auth token from cookies
    const cookieString = request.headers.get("cookie") || "";
    const token = getTokenFromCookies(cookieString);

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const knowledgeBaseId = searchParams.get("knowledge_base_id");
    const resourcePath = searchParams.get("resource_path") || "/";

    if (!knowledgeBaseId) {
      return NextResponse.json(
        { error: "knowledge_base_id is required" },
        { status: 400 }
      );
    }

    // Create authenticated client
    const client = await createServerAuthenticatedClient(token);

    // Get child resources from the knowledge base for the specified path
    const kbData =
      await client.knowledgeBases.getChildrenResourcesKnowledgeBasesKnowledgeBaseIdResourcesChildrenGet(
        knowledgeBaseId,
        resourcePath
      );

    // Extract inode_path.path from the child resources to represent indexed files
    const indexedFilePaths = (kbData.data || [])
      .map((item: StackFile | StackDirectory) => item.inode_path?.path)
      .filter((path: string | undefined) => path !== undefined);

    return NextResponse.json({
      indexedFilePaths,
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Failed to get indexing status:", error);
    return NextResponse.json(
      { error: "Failed to get indexing status" },
      { status: 500 }
    );
  }
}
