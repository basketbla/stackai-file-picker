"use client";

import { logoutAndRedirect } from "@/lib/auth";
import { ConnectionCard, StackDirectory, StackFile } from "@/stack-api-autogen";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, File, FileText, Folder, X } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";
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

async function fetchConnectionFiles(
  connectionId: string
): Promise<(StackFile | StackDirectory)[]> {
  const response = await fetch(`/api/connections/${connectionId}/files`);
  if (!response.ok) {
    if (response.status === 401) {
      await logoutAndRedirect();
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to fetch files");
  }
  return response.json();
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

  const queryClient = useQueryClient();

  // Set initial data in the query cache
  queryClient.setQueryData(
    ["connection-files", initialData.selectedConnection?.connection_id],
    initialData.files
  );

  const {
    data: files = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["connection-files", selectedConnectionId],
    queryFn: () => fetchConnectionFiles(selectedConnectionId),
    enabled: !!selectedConnectionId,
    initialData:
      selectedConnectionId === initialData.selectedConnection?.connection_id
        ? initialData.files
        : undefined,
  });

  const handleConnectionChange = (connectionId: string) => {
    setSelectedConnectionId(connectionId);
    setSelectedFiles(new Set()); // Clear selection when changing connections
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

  // TODO: inline function call isn't great, fix
  const renderFilesContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      );
    }

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

    if (files.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          <p>No files found in this connection.</p>
          <p className="text-sm">
            Files from your connected drive will appear here.
          </p>
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={
                  selectedFiles.size === files.length && files.length > 0
                }
                onCheckedChange={(checked: boolean) => {
                  if (checked) {
                    setSelectedFiles(
                      new Set(files.map((f) => f.resource_id || ""))
                    );
                  } else {
                    setSelectedFiles(new Set());
                  }
                }}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Modified</TableHead>
            <TableHead>Indexed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file, index) => {
            const fileId = file.resource_id || `${index}`;
            const isSelected = selectedFiles.has(fileId);
            const indexingStatus =
              fileIndexingStatus.get(fileId) ||
              ((file as StackFile).status === "indexed"
                ? "indexed"
                : "not_indexed");

            return (
              <TableRow key={fileId}>
                <TableCell>
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
                <TableCell className="flex items-center space-x-2">
                  <FileIconComponent file={file} />
                  <span className="font-medium">
                    {file.inode_path?.path?.split("/").pop() || "Unnamed"}
                  </span>
                </TableCell>
                <TableCell>
                  {file.inode_type === "directory"
                    ? "-"
                    : formatFileSize((file as StackFile).size || 0)}
                </TableCell>
                <TableCell>
                  {file.modified_at ? formatDate(file.modified_at) : "-"}
                </TableCell>
                <TableCell>
                  {renderIndexingStatus(indexingStatus, file.modified_at)}
                </TableCell>
              </TableRow>
            );
          })}
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
                  Browse files from your connected drives
                </CardDescription>
              </div>

              {initialData.connections.length > 1 && (
                <div>
                  <Select
                    value={selectedConnectionId}
                    onValueChange={handleConnectionChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a connection" />
                    </SelectTrigger>
                    <SelectContent>
                      {initialData.connections.map((connection, index) => (
                        <SelectItem
                          key={connection.connection_id}
                          value={connection.connection_id!}
                        >
                          {`Conn ${index + 1}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent>{renderFilesContent()}</CardContent>
        </Card>

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
