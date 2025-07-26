"use client";

import { ConnectionCard, StackDirectory, StackFile } from "@/stack-api-autogen";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { File, FileText, Folder } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
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

function LogoutButton() {
  const handleLogout = () => {
    document.cookie =
      "stack_ai_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/login";
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

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString();
}

export default function FileExplorer({ initialData }: FileExplorerProps) {
  const [selectedConnectionId, setSelectedConnectionId] = useState<string>(
    initialData.selectedConnection?.connection_id || ""
  );

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
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Modified</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file, index) => (
            <TableRow key={file.resource_id || index}>
              <TableCell className="flex items-center space-x-2">
                <FileIconComponent file={file} />
                <span className="font-medium">
                  {file.inode_path?.path?.split("/").pop() || "Unnamed"}
                </span>
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {file.inode_type === "directory" ? "Folder" : "File"}
                </Badge>
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
                {(file as StackFile).status && (
                  <Badge
                    variant={
                      (file as StackFile).status === "indexed"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {(file as StackFile).status}
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
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
                      {initialData.connections.map((connection) => (
                        <SelectItem
                          key={connection.connection_id}
                          value={connection.connection_id!}
                        >
                          {connection.name || "Unnamed Connection"}
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
      </main>
    </div>
  );
}
