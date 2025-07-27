import {
  createServerAuthenticatedClient,
  getTokenFromCookies,
} from "@/lib/auth";
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

    if (!knowledgeBaseId) {
      return NextResponse.json(
        { error: "knowledge_base_id is required" },
        { status: 400 }
      );
    }

    // Create authenticated client
    const client = await createServerAuthenticatedClient(token);

    // Get current knowledge base data
    const kbData =
      await client.knowledgeBases.getKnowledgeBaseByIdKnowledgeBasesKnowledgeBaseIdGet(
        knowledgeBaseId
      );

    // Return the connection_source_ids which represent indexed files
    return NextResponse.json({
      indexedFileIds: kbData.connection_source_ids || [],
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
