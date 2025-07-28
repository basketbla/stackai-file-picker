import {
  createServerAuthenticatedClient,
  getTokenFromCookies,
} from "@/lib/auth";
import { ApiError } from "@/stack-api-autogen";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get the auth token from cookies
    const cookieString = request.headers.get("cookie") || "";
    const token = getTokenFromCookies(cookieString);

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const { filePaths, knowledgeBaseId } = await request.json();

    if (!filePaths || !Array.isArray(filePaths) || !knowledgeBaseId) {
      return NextResponse.json(
        { error: "filePaths and knowledgeBaseId are required" },
        { status: 400 }
      );
    }

    // Create authenticated client
    const client = await createServerAuthenticatedClient(token);

    // Delete each file resource using the correct DELETE endpoint
    const deletePromises = filePaths.map((resourcePath: string) =>
      client.knowledgeBases.deleteResourceKnowledgeBasesKnowledgeBaseIdResourcesDelete(
        knowledgeBaseId,
        resourcePath
      )
    );

    // Wait for all deletes to complete
    await Promise.all(deletePromises);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Failed to unindex files:", error);
    return NextResponse.json(
      { error: "Failed to unindex files" },
      { status: 500 }
    );
  }
}
