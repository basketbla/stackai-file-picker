"use client";

import { logoutAndRedirect } from "@/lib/auth";
import { ConnectionCard, StackDirectory, StackFile } from "@/stack-api-autogen";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  File,
  FileText,
  Folder,
  Settings,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Checkbox } from "./ui/checkbox";

import { Separator } from "./ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface ServerData {
  connections: ConnectionCard[];
  selectedConnection: ConnectionCard | null;
  files: (StackFile | StackDirectory)[];
}

interface FileExplorerProps {
  initialData: ServerData;
}

type IndexingStatus = "indexed" | "not_indexed" | "indexing";

function LogoutButton() {
  const handleLogout = () => {
    logoutAndRedirect();
  };

  return (
    <Button onClick={handleLogout} variant="outline">
      Logout
    </Button>
  );
}

interface PaginatedFilesResponse {
  data: (StackFile | StackDirectory)[];
  total: number;
  hasMore: boolean;
}

async function fetchConnectionFiles(
  connectionId: string,
  cursor?: string,
  pageSize: number = 100
): Promise<PaginatedFilesResponse> {
  const url = new URL(
    `/api/connections/${connectionId}/files`,
    window.location.origin
  );
  if (cursor) {
    url.searchParams.append("cursor", cursor);
  }
  url.searchParams.append("page_size", pageSize.toString());

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

async function fetchFolderContents(
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

function FileIconComponent({ file }: { file: StackFile | StackDirectory }) {
  if (file.inode_type === "directory") {
    return <Folder className="h-4 w-4 text-blue-500" />;
  }

  // Check MIME type for different file icons
  const mimeType = (file as StackFile).content_mime;
  if (mimeType?.startsWith("image/")) {
    return <FileText className="h-4 w-4 text-green-500" />;
  }
  if (mimeType?.includes("pdf")) {
    return <FileText className="h-4 w-4 text-red-500" />;
  }
  if (mimeType?.includes("text") || mimeType?.includes("document")) {
    return <FileText className="h-4 w-4 text-blue-500" />;
  }

  return <File className="h-4 w-4 text-gray-500" />;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function renderIndexingStatus(
  status: IndexingStatus,
  modifiedAt?: string
): React.JSX.Element {
  switch (status) {
    case "indexed":
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          {modifiedAt ? `${formatDate(modifiedAt)}` : "indexed"}
        </Badge>
      );
    case "indexing":
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          indexing...
        </Badge>
      );
    case "not_indexed":
    default:
      return (
        <Badge variant="outline" className="text-gray-600">
          not indexed
        </Badge>
      );
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString();
}

export default function FileExplorer({ initialData }: FileExplorerProps) {
  const [selectedConnectionId, setSelectedConnectionId] = useState<string>(
    initialData.selectedConnection?.connection_id || ""
  );
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [fileIndexingStatus, setFileIndexingStatus] = useState<
    Map<string, IndexingStatus>
  >(new Map());
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );
  const [currentlyLoadingFiles, setCurrentlyLoadingFiles] = useState<
    Set<string>
  >(new Set());
  const [folderContents, setFolderContents] = useState<
    Map<string, (StackFile | StackDirectory)[]>
  >(new Map());

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const pageSize = 100;

  const queryClient = useQueryClient();

  const {
    data: paginatedData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["connection-files", selectedConnectionId, currentPage],
    queryFn: () => fetchConnectionFiles(selectedConnectionId, cursor, pageSize),
    enabled: !!selectedConnectionId,
  });

  const files = paginatedData?.data || [];

  // Update pagination state when data changes
  React.useEffect(() => {
    if (paginatedData) {
      setTotalFiles(paginatedData.total);
      setHasMore(paginatedData.hasMore);
    }
  }, [paginatedData]);

  // Pagination navigation functions
  const handleNextPage = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
      // In a real API, you'd get the cursor from the response
      // For now, we'll simulate it
      setCursor(`page-${currentPage + 1}`);
      setSelectedFiles(new Set()); // Clear selection when changing pages
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setCursor(currentPage > 2 ? `page-${currentPage - 1}` : undefined);
      setSelectedFiles(new Set()); // Clear selection when changing pages
    }
  };

  const handleGoToPage = (page: number) => {
    setCurrentPage(page);
    setCursor(page > 1 ? `page-${page}` : undefined);
    setSelectedFiles(new Set()); // Clear selection when changing pages
  };

  const handleIndexFiles = async () => {
    const filesToIndex = Array.from(selectedFiles);

    // Set files to indexing state
    const newStatus = new Map(fileIndexingStatus);
    filesToIndex.forEach((fileId) => {
      newStatus.set(fileId, "indexing");
    });
    setFileIndexingStatus(newStatus);

    // TODO: Implement actual API call to index files
    // For now, simulate the indexing process
    setTimeout(() => {
      const updatedStatus = new Map(fileIndexingStatus);
      filesToIndex.forEach((fileId) => {
        updatedStatus.set(fileId, "indexed");
      });
      setFileIndexingStatus(updatedStatus);
      setSelectedFiles(new Set());
    }, 2000);
  };

  const handleUnindexFiles = async () => {
    const filesToUnindex = Array.from(selectedFiles);

    const newStatus = new Map(fileIndexingStatus);
    filesToUnindex.forEach((fileId) => {
      newStatus.set(fileId, "not_indexed");
    });
    setFileIndexingStatus(newStatus);
    setSelectedFiles(new Set());
  };

  const handleFolderClick = (folder: StackDirectory) => {
    const folderId = folder.resource_id;
    if (!folderId) return;

    setExpandedFolders((prevExpanded) => {
      const wasExpanded = prevExpanded.has(folderId);
      const newExpanded = new Set(prevExpanded);

      if (wasExpanded) {
        // Collapse folder
        newExpanded.delete(folderId);
      } else {
        // Expand folder
        newExpanded.add(folderId);

        // Check if we need to fetch contents (only when expanding)
        setFolderContents((prevContents) => {
          if (!prevContents.has(folderId)) {
            // Start loading
            setCurrentlyLoadingFiles((prevLoading) => {
              const newLoading = new Set(prevLoading);
              newLoading.add(folderId);
              return newLoading;
            });

            // Fetch contents
            fetchFolderContents(selectedConnectionId, folderId)
              .then((contents) => {
                setFolderContents((prevContents) => {
                  const newContents = new Map(prevContents);
                  newContents.set(folderId, contents);
                  return newContents;
                });
              })
              .catch((error) => {
                console.error("Failed to fetch folder contents:", error);
              })
              .finally(() => {
                setCurrentlyLoadingFiles((prevLoading) => {
                  const newLoading = new Set(prevLoading);
                  newLoading.delete(folderId);
                  return newLoading;
                });
              });
          }
          return prevContents;
        });
      }

      return newExpanded;
    });
  };

  // Flatten files with their nested contents
  const getFlattenedFiles = () => {
    const flattened: Array<{
      file: StackFile | StackDirectory;
      depth: number;
      isLoading?: boolean;
    }> = [];

    const addFiles = (
      fileList: (StackFile | StackDirectory)[],
      depth: number = 0
    ) => {
      fileList.forEach((file) => {
        flattened.push({ file, depth });

        // If it's an expanded folder, add its contents or loading skeleton
        if (
          file.inode_type === "directory" &&
          file.resource_id &&
          expandedFolders.has(file.resource_id)
        ) {
          if (currentlyLoadingFiles.has(file.resource_id)) {
            // Add loading skeleton
            flattened.push({
              file: {
                resource_id: `loading-${file.resource_id}`,
                inode_type: "file" as const,
                inode_path: { path: "Loading..." },
                knowledge_base_id: "",
                inode_id: "",
                content_hash: "",
                content_mime: "",
                size: 0,
                status: "not_indexed",
              } as unknown as StackFile,
              depth: depth + 1,
              isLoading: true,
            });
          } else {
            // Add actual contents if we have them
            const contents = folderContents.get(file.resource_id);
            if (contents) {
              addFiles(contents, depth + 1);
            }
          }
        }
      });
    };

    addFiles(files);
    return flattened;
  };

  // TODO: inline function call isn't great, fix
  const renderFilesContent = () => {
    if (error) {
      return (
        <div className="text-center py-8 text-destructive">
          <p>Failed to load files.</p>
          <p className="text-sm text-muted-foreground">
            Please try again later.
          </p>
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-6">
              <Checkbox
                checked={
                  selectedFiles.size === getFlattenedFiles().length &&
                  getFlattenedFiles().length > 0
                }
                onCheckedChange={(checked: boolean) => {
                  if (checked) {
                    setSelectedFiles(
                      new Set(
                        getFlattenedFiles().map(
                          ({ file }) => file.resource_id || ""
                        )
                      )
                    );
                  } else {
                    setSelectedFiles(new Set());
                  }
                }}
              />
            </TableHead>
            <TableHead className="w-1/2">Name</TableHead>
            <TableHead className="w-24 shrink-0">Size</TableHead>
            <TableHead className="w-32">Modified</TableHead>
            <TableHead className="w-24">Indexed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Show skeleton rows when loading */}
          {isLoading && !error ? (
            Array.from({ length: 10 }, (_, i) => (
              <TableRow
                key={`skeleton-${i}`}
                className="animate-pulse h-[39px]"
              >
                <TableCell className="w-6 pr-0">
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                </TableCell>
                <TableCell className="w-1/2 flex items-center h-[39px]">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  </div>
                </TableCell>
                <TableCell className="w-24">
                  <div className="h-4 w-12 bg-gray-200 rounded"></div>
                </TableCell>
                <TableCell className="w-32">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </TableCell>
                <TableCell className="w-24">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                </TableCell>
              </TableRow>
            ))
          ) : files.length === 0 && !isLoading ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-muted-foreground"
              >
                <p>No files found in this connection.</p>
                <p className="text-sm">
                  Files from your connected drive will appear here.
                </p>
              </TableCell>
            </TableRow>
          ) : (
            getFlattenedFiles().map(({ file, depth, isLoading }, index) => {
              const fileId = file.resource_id || `${index}`;
              const isSelected = selectedFiles.has(fileId);
              const indexingStatus =
                fileIndexingStatus.get(fileId) ||
                ((file as StackFile).status === "indexed"
                  ? "indexed"
                  : "not_indexed");
              const isFolder = file.inode_type === "directory";

              // Handle loading skeleton
              if (isLoading) {
                return (
                  <TableRow key={fileId} className="animate-pulse h-[39px]">
                    <TableCell className="w-6 pr-0">
                      <div className="h-4 w-4 bg-gray-200 rounded"></div>
                    </TableCell>
                    <TableCell className="w-1/2 flex items-center h-[39px]">
                      <div
                        style={{ marginLeft: `${depth * 20}px` }}
                        className="flex items-center space-x-2"
                      >
                        <div className="h-4 w-4 bg-gray-200 rounded"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                      </div>
                    </TableCell>
                    <TableCell className="w-24">
                      <div className="h-4 w-12 bg-gray-200 rounded"></div>
                    </TableCell>
                    <TableCell className="w-32">
                      <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    </TableCell>
                    <TableCell className="w-24">
                      <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    </TableCell>
                  </TableRow>
                );
              }

              return (
                <TableRow key={fileId}>
                  <TableCell className="w-6">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked: boolean) => {
                        const newSelected = new Set(selectedFiles);
                        if (checked) {
                          newSelected.add(fileId);
                        } else {
                          newSelected.delete(fileId);
                        }
                        setSelectedFiles(newSelected);
                      }}
                    />
                  </TableCell>
                  <TableCell className="w-1/2 flex items-center space-x-2">
                    <div
                      style={{ marginLeft: `${depth * 20}px` }}
                      className="flex items-center space-x-2"
                    >
                      <FileIconComponent file={file} />
                      {isFolder ? (
                        <button
                          className="font-medium cursor-pointer hover:text-blue-600"
                          onClick={() =>
                            handleFolderClick(file as StackDirectory)
                          }
                        >
                          {file.inode_path?.path?.split("/").pop() || "Unnamed"}
                        </button>
                      ) : (
                        <span className="font-medium">
                          {file.inode_path?.path?.split("/").pop() || "Unnamed"}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="w-24">
                    {file.inode_type === "directory"
                      ? "-"
                      : formatFileSize((file as StackFile).size || 0)}
                  </TableCell>
                  <TableCell className="w-32">
                    {file.modified_at ? formatDate(file.modified_at) : "-"}
                  </TableCell>
                  <TableCell className="w-24">
                    {renderIndexingStatus(indexingStatus, file.modified_at)}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-xl font-semibold text-gray-900">
                StackAI File Explorer
              </h1>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Files</CardTitle>
                <CardDescription>
                  Browse files from your connected drive
                </CardDescription>
              </div>

              <div>
                <Link href="/settings">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    User Settings
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>

          <CardContent>{renderFilesContent()}</CardContent>
        </Card>

        {/* Pagination Controls */}
        {files.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Page {currentPage} of {Math.ceil(totalFiles / pageSize)}
              {totalFiles > 0 && ` (${totalFiles} total files)`}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1 || isLoading}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={!hasMore || isLoading}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Action Panel */}
        {selectedFiles.size > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 min-w-96">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 mr-4">
                  <span className="text-sm font-medium text-gray-900">
                    {selectedFiles.size} file
                    {selectedFiles.size !== 1 ? "s" : ""} selected
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleIndexFiles}
                    disabled={Array.from(selectedFiles).some(
                      (fileId) => fileIndexingStatus.get(fileId) === "indexing"
                    )}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Index Files
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUnindexFiles}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Unindex Files
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
