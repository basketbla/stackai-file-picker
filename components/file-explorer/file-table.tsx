import { USER_SETTINGS } from "@/lib/constants";
import {
  fetchFolderContents,
  fetchIndexingStatus,
  formatDate,
  formatFileSize,
} from "@/lib/file-explorer-helpers";
import { StackDirectory, StackFile } from "@/stack-api-autogen";
import { Checkbox } from "../ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { FileIcon } from "./file-icon";
import { IndexingStatusBadge } from "./indexing-status-badge";

type IndexingStatus = "indexed" | "not_indexed" | "indexing" | "unindexing";

// Define fixed column widths to prevent layout shifts
const columnDefinitions = [
  {
    key: "checkbox",
    header: "Select",
    size: 40, // w-6 equivalent
  },
  {
    key: "name",
    header: "Name",
    size: 500, // Flexible main column
  },
  {
    key: "size",
    header: "Size",
    size: 100, // w-24 equivalent
  },
  {
    key: "modified",
    header: "Modified",
    size: 140, // w-32 equivalent
  },
  {
    key: "indexed",
    header: "Indexed",
    size: 120, // w-24 equivalent but wider for status badges
  },
];

interface FileTableProps {
  files: (StackFile | StackDirectory)[];
  isLoading: boolean;
  error: unknown;
  selectedFiles: Set<string>;
  filesWithSelectedParent: Set<string>;
  fileIndexingStatus: Map<string, IndexingStatus>;
  expandedFolders: Set<string>;
  currentlyLoadingFiles: Set<string>;
  folderContents: Map<string, (StackFile | StackDirectory)[]>;
  isOperationInProgress: boolean;
  selectedConnectionId: string;
  onFileSelect: (fileId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onFolderClick: (folder: StackDirectory) => void;
  setFolderContents: React.Dispatch<
    React.SetStateAction<Map<string, (StackFile | StackDirectory)[]>>
  >;
  setCurrentlyLoadingFiles: React.Dispatch<React.SetStateAction<Set<string>>>;
  setFileIndexingStatus: React.Dispatch<
    React.SetStateAction<Map<string, IndexingStatus>>
  >;
}

export function FileTable({
  files,
  isLoading,
  error,
  selectedFiles,
  filesWithSelectedParent,
  fileIndexingStatus,
  expandedFolders,
  currentlyLoadingFiles,
  folderContents,
  isOperationInProgress,
  selectedConnectionId,
  onFileSelect,
  onSelectAll,
  onFolderClick,
  setFolderContents,
  setCurrentlyLoadingFiles,
  setFileIndexingStatus,
}: FileTableProps) {
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

  const handleFolderClick = (folder: StackDirectory) => {
    const folderId = folder.resource_id;
    if (!folderId) return;

    // Check if we need to fetch contents (only when expanding and don't have contents)
    if (!expandedFolders.has(folderId) && !folderContents.has(folderId)) {
      // Start loading
      setCurrentlyLoadingFiles((prevLoading) => {
        const newLoading = new Set(prevLoading);
        newLoading.add(folderId);
        return newLoading;
      });

      // Fetch contents and indexing status
      Promise.all([
        fetchFolderContents(selectedConnectionId, folderId),
        fetchIndexingStatus(
          USER_SETTINGS.knowledge_base_id,
          folder.inode_path?.path || "/"
        ),
      ])
        .then(([contents, indexedFilePaths]) => {
          // Update folder contents
          setFolderContents((prevContents) => {
            const newContents = new Map(prevContents);
            newContents.set(folderId, contents);
            return newContents;
          });

          // Update indexing status for the newly loaded files
          setFileIndexingStatus((prevStatus) => {
            const newStatus = new Map(prevStatus);

            // Check each file in contents against indexed paths
            contents.forEach((file) => {
              if (file.resource_id) {
                const filePath = file.inode_path?.path;
                if (filePath && indexedFilePaths.includes(filePath)) {
                  newStatus.set(file.resource_id, "indexed");
                } else {
                  newStatus.set(file.resource_id, "not_indexed");
                }
              }
            });

            return newStatus;
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

    // Call the parent's folder click handler
    onFolderClick(folder);
  };

  if (error) {
    return (
      <div className="text-center py-8 text-destructive">
        <p>Failed to load files.</p>
        <p className="text-sm text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            style={{
              minWidth: columnDefinitions[0].size,
              maxWidth: columnDefinitions[0].size,
              width: columnDefinitions[0].size,
            }}
          >
            <Checkbox
              checked={
                files.length > 0 &&
                files.every(
                  (file) =>
                    selectedFiles.has(file.resource_id || "") ||
                    filesWithSelectedParent.has(file.resource_id || "")
                )
              }
              disabled={isOperationInProgress}
              onCheckedChange={(checked: boolean) => onSelectAll(checked)}
            />
          </TableHead>
          <TableHead
            style={{
              minWidth: columnDefinitions[1].size,
              maxWidth: columnDefinitions[1].size,
              width: columnDefinitions[1].size,
            }}
          >
            Name
          </TableHead>
          <TableHead
            style={{
              minWidth: columnDefinitions[2].size,
              maxWidth: columnDefinitions[2].size,
              width: columnDefinitions[2].size,
            }}
          >
            Size
          </TableHead>
          <TableHead
            style={{
              minWidth: columnDefinitions[3].size,
              maxWidth: columnDefinitions[3].size,
              width: columnDefinitions[3].size,
            }}
          >
            Modified
          </TableHead>
          <TableHead
            style={{
              minWidth: columnDefinitions[4].size,
              maxWidth: columnDefinitions[4].size,
              width: columnDefinitions[4].size,
            }}
          >
            Indexed
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && (
          <>
            {Array.from({ length: 10 }, (_, index) => (
              <TableRow
                key={`skeleton-${index}`}
                className="animate-pulse h-[39px]"
              >
                <TableCell
                  className="pr-0"
                  style={{
                    minWidth: columnDefinitions[0].size,
                    maxWidth: columnDefinitions[0].size,
                    width: columnDefinitions[0].size,
                  }}
                >
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                </TableCell>
                <TableCell
                  className="flex items-center h-[39px]"
                  style={{
                    minWidth: columnDefinitions[1].size,
                    maxWidth: columnDefinitions[1].size,
                    width: columnDefinitions[1].size,
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  </div>
                </TableCell>
                <TableCell
                  style={{
                    minWidth: columnDefinitions[2].size,
                    maxWidth: columnDefinitions[2].size,
                    width: columnDefinitions[2].size,
                  }}
                >
                  <div className="h-4 w-12 bg-gray-200 rounded"></div>
                </TableCell>
                <TableCell
                  style={{
                    minWidth: columnDefinitions[3].size,
                    maxWidth: columnDefinitions[3].size,
                    width: columnDefinitions[3].size,
                  }}
                >
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </TableCell>
                <TableCell
                  style={{
                    minWidth: columnDefinitions[4].size,
                    maxWidth: columnDefinitions[4].size,
                    width: columnDefinitions[4].size,
                  }}
                >
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
        {!isLoading && files.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-center py-8 text-muted-foreground"
              style={{
                minWidth: columnDefinitions.reduce(
                  (sum, col) => sum + col.size,
                  0
                ),
                width: columnDefinitions.reduce(
                  (sum, col) => sum + col.size,
                  0
                ),
              }}
            >
              No files found.
            </TableCell>
          </TableRow>
        )}
        {!isLoading &&
          getFlattenedFiles().map((fileData) => {
            const { file, depth, isLoading: fileIsLoading } = fileData;
            const isSelected = selectedFiles.has(file.resource_id || "");
            const isFolder = file.inode_type === "directory";
            const indexingStatus =
              fileIndexingStatus.get(file.resource_id || "") || "not_indexed";

            // Check if any parent is selected
            const recursiveParentIsSelected = filesWithSelectedParent.has(
              file.resource_id || ""
            );

            // Render skeleton for loading files
            if (fileIsLoading) {
              return (
                <TableRow
                  key={file.resource_id}
                  className="animate-pulse h-[39px]"
                >
                  <TableCell
                    className="pr-0"
                    style={{
                      minWidth: columnDefinitions[0].size,
                      maxWidth: columnDefinitions[0].size,
                      width: columnDefinitions[0].size,
                    }}
                  >
                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  </TableCell>
                  <TableCell
                    className="flex items-center h-[39px]"
                    style={{
                      minWidth: columnDefinitions[1].size,
                      maxWidth: columnDefinitions[1].size,
                      width: columnDefinitions[1].size,
                    }}
                  >
                    <div
                      style={{ marginLeft: `${depth * 20}px` }}
                      className="flex items-center space-x-2"
                    >
                      <div className="h-4 w-4 bg-gray-200 rounded"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </div>
                  </TableCell>
                  <TableCell
                    style={{
                      minWidth: columnDefinitions[2].size,
                      maxWidth: columnDefinitions[2].size,
                      width: columnDefinitions[2].size,
                    }}
                  >
                    <div className="h-4 w-12 bg-gray-200 rounded"></div>
                  </TableCell>
                  <TableCell
                    style={{
                      minWidth: columnDefinitions[3].size,
                      maxWidth: columnDefinitions[3].size,
                      width: columnDefinitions[3].size,
                    }}
                  >
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </TableCell>
                  <TableCell
                    style={{
                      minWidth: columnDefinitions[4].size,
                      maxWidth: columnDefinitions[4].size,
                      width: columnDefinitions[4].size,
                    }}
                  >
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  </TableCell>
                </TableRow>
              );
            }

            return (
              <TableRow key={file.resource_id}>
                <TableCell
                  style={{
                    minWidth: columnDefinitions[0].size,
                    maxWidth: columnDefinitions[0].size,
                    width: columnDefinitions[0].size,
                  }}
                >
                  <Checkbox
                    checked={recursiveParentIsSelected || isSelected}
                    disabled={
                      isOperationInProgress || recursiveParentIsSelected
                    }
                    onCheckedChange={(checked: boolean) =>
                      onFileSelect(file.resource_id || "", checked)
                    }
                  />
                </TableCell>
                <TableCell
                  className="flex items-center space-x-2"
                  style={{
                    minWidth: columnDefinitions[1].size,
                    maxWidth: columnDefinitions[1].size,
                    width: columnDefinitions[1].size,
                  }}
                >
                  <div
                    style={{ marginLeft: `${depth * 20}px` }}
                    className="flex items-center space-x-2 min-w-0"
                  >
                    <FileIcon file={file} />
                    {isFolder ? (
                      <button
                        className="font-medium cursor-pointer hover:text-blue-600 truncate text-left flex-1"
                        onClick={() =>
                          handleFolderClick(file as StackDirectory)
                        }
                      >
                        {file.inode_path?.path?.split("/").pop() || "Unnamed"}
                      </button>
                    ) : (
                      <span className="font-medium truncate flex-1">
                        {file.inode_path?.path?.split("/").pop() || "Unnamed"}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell
                  style={{
                    minWidth: columnDefinitions[2].size,
                    maxWidth: columnDefinitions[2].size,
                    width: columnDefinitions[2].size,
                  }}
                >
                  {file.inode_type === "directory"
                    ? "-"
                    : formatFileSize((file as StackFile).size || 0)}
                </TableCell>
                <TableCell
                  style={{
                    minWidth: columnDefinitions[3].size,
                    maxWidth: columnDefinitions[3].size,
                    width: columnDefinitions[3].size,
                  }}
                >
                  {file.modified_at ? formatDate(file.modified_at) : "-"}
                </TableCell>
                <TableCell
                  style={{
                    minWidth: columnDefinitions[4].size,
                    maxWidth: columnDefinitions[4].size,
                    width: columnDefinitions[4].size,
                  }}
                >
                  <IndexingStatusBadge
                    status={indexingStatus}
                    indexedAt={file.indexed_at ?? undefined}
                  />
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}
