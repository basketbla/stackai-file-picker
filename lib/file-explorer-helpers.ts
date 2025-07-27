import { StackDirectory, StackFile } from "@/stack-api-autogen";
import { logoutAndRedirect } from "./auth";
import { USER_SETTINGS } from "./constants";

interface PaginatedFilesResponse {
  data: (StackFile | StackDirectory)[];
  total: number;
  hasMore: boolean;
}

export async function fetchConnectionFiles(
  connectionId: string,
  cursor?: string,
  pageSize: number = 100,
  searchQuery?: string
): Promise<PaginatedFilesResponse> {
  const url = new URL(
    `/api/connections/${connectionId}/files`,
    window.location.origin
  );
  if (cursor) {
    url.searchParams.append("cursor", cursor);
  }
  url.searchParams.append("page_size", pageSize.toString());
  if (searchQuery) {
    url.searchParams.append("search_query", searchQuery);
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    if (response.status === 401) {
      await logoutAndRedirect();
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to fetch files");
  }
  const data = await response.json();

  // If the API doesn't return pagination info, simulate it
  if (Array.isArray(data)) {
    return {
      data,
      total: data.length,
      hasMore: data.length === pageSize,
    };
  }

  return data;
}

export async function fetchFolderContents(
  connectionId: string,
  folderResourceId: string
): Promise<(StackFile | StackDirectory)[]> {
  const response = await fetch(
    `/api/connections/${connectionId}/files?resource_id=${folderResourceId}`
  );
  if (!response.ok) {
    if (response.status === 401) {
      await logoutAndRedirect();
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to fetch folder contents");
  }
  const result = await response.json();

  // Handle new pagination response format
  if (result.data) {
    return result.data;
  }

  // Fallback for old format
  return result;
}

// Get all file/folder IDs recursively for a folder
export function getAllFileIds(
  files: (StackFile | StackDirectory)[],
  folderContents: Map<string, (StackFile | StackDirectory)[]>,
  expandedFolders: Set<string>
): string[] {
  const ids: string[] = [];

  const collectIds = (fileList: (StackFile | StackDirectory)[]) => {
    fileList.forEach((file) => {
      if (file.resource_id) {
        ids.push(file.resource_id);

        // If it's an expanded folder, also collect its children
        if (
          file.inode_type === "directory" &&
          expandedFolders.has(file.resource_id)
        ) {
          const children = folderContents.get(file.resource_id);
          if (children) {
            collectIds(children);
          }
        }
      }
    });
  };

  collectIds(files);
  return ids;
}

// Recursively fetch all contents of folders for indexing
export async function getAllFolderContentsForIndexing(
  selectedFileIds: string[],
  files: (StackFile | StackDirectory)[],
  folderContents: Map<string, (StackFile | StackDirectory)[]>,
  connectionId: string
): Promise<string[]> {
  const allFileIds = new Set<string>();
  const processedFolders = new Set<string>();

  // Helper function to recursively fetch folder contents
  const fetchFolderRecursively = async (folderId: string): Promise<void> => {
    if (processedFolders.has(folderId)) return;
    processedFolders.add(folderId);

    // Add the folder itself
    allFileIds.add(folderId);

    // Check if we already have the contents in cache
    let contents = folderContents.get(folderId);

    // If not in cache, fetch from API
    if (!contents) {
      try {
        contents = await fetchFolderContents(connectionId, folderId);
      } catch (error) {
        console.error(
          `Failed to fetch contents for folder ${folderId}:`,
          error
        );
        return;
      }
    }

    // Process all items in this folder
    for (const item of contents) {
      if (item.resource_id) {
        allFileIds.add(item.resource_id);

        // If it's a subfolder, recursively fetch its contents
        if (item.inode_type === "directory") {
          await fetchFolderRecursively(item.resource_id);
        }
      }
    }
  };

  // Find selected folders and files
  const selectedFolders: string[] = [];
  const selectedFiles: string[] = [];

  for (const fileId of selectedFileIds) {
    // Find the file object to check if it's a folder
    const findFileInList = (
      list: (StackFile | StackDirectory)[]
    ): StackFile | StackDirectory | null => {
      for (const file of list) {
        if (file.resource_id === fileId) return file;
        // Also check in folder contents
        if (file.inode_type === "directory") {
          const children = folderContents.get(file.resource_id || "");
          if (children) {
            const found = findFileInList(children);
            if (found) return found;
          }
        }
      }
      return null;
    };

    const fileObj = findFileInList(files);
    if (fileObj) {
      if (fileObj.inode_type === "directory") {
        selectedFolders.push(fileId);
      } else {
        selectedFiles.push(fileId);
        allFileIds.add(fileId);
      }
    } else {
      // If we can't find it in the current view, assume it's a file
      selectedFiles.push(fileId);
      allFileIds.add(fileId);
    }
  }

  // Recursively fetch all folder contents
  for (const folderId of selectedFolders) {
    await fetchFolderRecursively(folderId);
  }

  return Array.from(allFileIds);
}

// API functions for indexing operations
export async function indexFiles(fileIds: string[]): Promise<void> {
  const response = await fetch("/api/knowledge-base/index", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileIds,
      knowledgeBaseId: USER_SETTINGS.knowledge_base_id,
    }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      await logoutAndRedirect();
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to index files");
  }
}

export async function unindexFiles(fileIds: string[]): Promise<void> {
  const response = await fetch("/api/knowledge-base/unindex", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileIds,
      knowledgeBaseId: USER_SETTINGS.knowledge_base_id,
    }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      await logoutAndRedirect();
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to unindex files");
  }
}

export async function fetchIndexingStatus(
  knowledgeBaseId: string
): Promise<string[]> {
  const response = await fetch(
    `/api/knowledge-base/status?knowledge_base_id=${knowledgeBaseId}`
  );

  if (!response.ok) {
    if (response.status === 401) {
      await logoutAndRedirect();
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to fetch indexing status");
  }

  const data = await response.json();
  return data.indexedFileIds || [];
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString();
}
