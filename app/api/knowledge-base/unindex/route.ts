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
    const { fileIds, knowledgeBaseId } = await request.json();

    if (!fileIds || !Array.isArray(fileIds) || !knowledgeBaseId) {
      return NextResponse.json(
        { error: "fileIds and knowledgeBaseId are required" },
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

    // Remove file IDs from existing connection_source_ids
    const currentSourceIds = new Set(kbData.connection_source_ids || []);
    fileIds.forEach((id: string) => currentSourceIds.delete(id));

    // Update the knowledge base with removed source IDs
    const updatedKbData =
      await client.knowledgeBases.updateKnowledgeBaseKnowledgeBasesKnowledgeBaseIdPut(
        knowledgeBaseId,
        {
          connection_id: kbData.connection_id,
          connection_source_ids: Array.from(currentSourceIds),
          website_sources: kbData.website_sources || [],
          name: kbData.name,
          description: kbData.description,
          indexing_params: kbData.indexing_params,
          org_level_role: kbData.org_level_role,
          cron_job_id: kbData.cron_job_id,
        }
      );

    // Trigger sync to update the index
    await client.knowledgeBases.synchronizeKnowledgeBaseKnowledgeBasesSyncTriggerKnowledgeBaseIdOrgIdGet(
      kbData.org_id,
      knowledgeBaseId
    );

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
