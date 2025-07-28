"use client";

import {
  useDebounced,
  useFileStatusUpdate,
  useFilesWithSelectedParent,
  useIndexingStatus,
  usePaginationReset,
  usePaginationUpdate,
} from "@/hooks/file-explorer-hooks";
import { logoutAndRedirect } from "@/lib/auth";
import { USER_SETTINGS } from "@/lib/constants";
import {
  fetchConnectionFiles,
  fetchFolderContents,
  fetchIndexingStatus,
  formatDate,
  formatFileSize,
  getAllFilePathsForUnindexing,
  indexFiles,
  unindexFiles,
} from "@/lib/file-explorer-helpers";
import { StackDirectory, StackFile } from "@/stack-api-autogen";
import { useQuery } from "@tanstack/react-query";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  File,
  FileText,
  Folder,
  Search,
  Settings,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
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
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type IndexingStatus = "indexed" | "not_indexed" | "indexing" | "unindexing";

type SortOption = "name-asc" | "name-desc" | "date-asc" | "date-desc";

interface SearchSortFilterState {
  searchQuery: string;
  sortBy: SortOption;
  nameFilter: string;
}

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
    size: 400, // Flexible main column
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

interface IndexingStatusBadgeProps {
  status: IndexingStatus;
  indexedAt?: string;
}

function IndexingStatusBadge({ status, indexedAt }: IndexingStatusBadgeProps) {
  switch (status) {
    case "indexed":
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          {indexedAt ? `${formatDate(indexedAt)}` : "indexed"}
        </Badge>
      );
    case "indexing":
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          indexing...
        </Badge>
      );
    case "unindexing":
      return (
        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
          unindexing...
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

export default function FileExplorer() {
  const selectedConnectionId = USER_SETTINGS?.connection_id;
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

  // Track files that have a selected parent (for performance)
  const [filesWithSelectedParent, setFilesWithSelectedParent] = useState<
    Set<string>
  >(new Set());

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const pageSize = 100;

  // Operation state
  const [isOperationInProgress, setIsOperationInProgress] =
    useState<boolean>(false);

  // Indexing status loading state and data
  const [isIndexingStatusLoading, setIsIndexingStatusLoading] =
    useState<boolean>(false);
  const [indexedFilePaths, setIndexedFilePaths] = useState<string[]>([]);

  // Search, sort, and filter state
  const [searchSortFilter, setSearchSortFilter] =
    useState<SearchSortFilterState>({
      searchQuery: "",
      sortBy: "name-asc",
      nameFilter: "",
    });

  // Debounced search query for API calls
  const debouncedSearchQuery = useDebounced(searchSortFilter);

  const {
    data: paginatedData,
    isLoading: isFilesLoading,
    error,
  } = useQuery({
    queryKey: [
      "connection-files",
      selectedConnectionId,
      currentPage,
      debouncedSearchQuery,
    ],
    queryFn: () =>
      fetchConnectionFiles(
        selectedConnectionId,
        cursor,
        pageSize,
        debouncedSearchQuery || undefined
      ),
    enabled: !!selectedConnectionId,
  });

  // Combined loading state - wait for both files and indexing status
  const isLoading = isFilesLoading || isIndexingStatusLoading;

  const rawFiles = useMemo(
    () => paginatedData?.data || [],
    [paginatedData?.data]
  );

  // Apply client-side sorting and filtering
  const files = useMemo(() => {
    let processedFiles = [...rawFiles];

    // Apply name filter (client-side)
    if (searchSortFilter.nameFilter) {
      processedFiles = processedFiles.filter((file) => {
        const fileName = file.inode_path?.path?.split("/").pop() || "";
        return fileName
          .toLowerCase()
          .includes(searchSortFilter.nameFilter.toLowerCase());
      });
    }

    // Apply sorting (client-side)
    processedFiles.sort((a, b) => {
      const aName = a.inode_path?.path?.split("/").pop() || "";
      const bName = b.inode_path?.path?.split("/").pop() || "";
      const aDate = a.modified_at || "";
      const bDate = b.modified_at || "";

      switch (searchSortFilter.sortBy) {
        case "name-asc":
          return aName.localeCompare(bName);
        case "name-desc":
          return bName.localeCompare(aName);
        case "date-asc":
          return aDate.localeCompare(bDate);
        case "date-desc":
          return bDate.localeCompare(aDate);
        default:
          return 0;
      }
    });

    return processedFiles;
  }, [rawFiles, searchSortFilter]);

  // Update pagination state when data changes
  usePaginationUpdate(paginatedData, setTotalFiles, setHasMore);

  // Fetch indexing status immediately (in parallel with files)
  useIndexingStatus(setIsIndexingStatusLoading, setIndexedFilePaths);

  // Update file statuses when either files or indexing status changes
  useFileStatusUpdate(files, indexedFilePaths, setFileIndexingStatus);

  // Update files with selected parent when selections or file structure changes
  useFilesWithSelectedParent(
    selectedFiles,
    files,
    folderContents,
    expandedFolders,
    setFilesWithSelectedParent
  );

  // Reset pagination when search/filter changes
  usePaginationReset(
    debouncedSearchQuery,
    searchSortFilter.nameFilter,
    setCurrentPage,
    setCursor,
    setSelectedFiles
  );

  // Pagination navigation functions
  const handleNextPage = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
      setCursor(`page-${currentPage + 1}`);
      setSelectedFiles(new Set());
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setCursor(currentPage > 2 ? `page-${currentPage - 1}` : undefined);
      setSelectedFiles(new Set());
    }
  };

  // Helper function to update children indexing status without closing folders
  const updateChildrenIndexingStatus = (
    affectedFileIds: string[],
    newStatus: IndexingStatus
  ) => {
    setFileIndexingStatus((prevStatus) => {
      const updatedStatus = new Map(prevStatus);

      // Update status for all affected files
      affectedFileIds.forEach((fileId) => {
        updatedStatus.set(fileId, newStatus);
      });

      // Also update status for all visible children in expanded folders
      folderContents.forEach((contents, folderId) => {
        // Check if this folder or any of its ancestors is affected
        const folderIsAffected = affectedFileIds.includes(folderId);

        if (folderIsAffected) {
          // Update status for all children in this folder
          contents.forEach((child) => {
            if (child.resource_id) {
              updatedStatus.set(child.resource_id, newStatus);

              // If child is also a folder with children, update recursively
              if (child.inode_type === "directory") {
                const grandChildren = folderContents.get(child.resource_id);
                if (grandChildren) {
                  const updateRecursively = (
                    items: (StackFile | StackDirectory)[]
                  ) => {
                    items.forEach((item) => {
                      if (item.resource_id) {
                        updatedStatus.set(item.resource_id, newStatus);
                        if (item.inode_type === "directory") {
                          const subChildren = folderContents.get(
                            item.resource_id
                          );
                          if (subChildren) {
                            updateRecursively(subChildren);
                          }
                        }
                      }
                    });
                  };
                  updateRecursively(grandChildren);
                }
              }
            }
          });
        }
      });

      return updatedStatus;
    });
  };

  const handleIndexFiles = async () => {
    const selectedFileIds = Array.from(selectedFiles);

    // Set operation in progress
    setIsOperationInProgress(true);

    // Set selected files and their children to indexing state
    updateChildrenIndexingStatus(selectedFileIds, "indexing");

    try {
      // Get all files including recursive folder contents
      const allFilesToIndex = selectedFileIds;

      // Make actual API call to index all files
      await indexFiles(allFilesToIndex);

      // Update status to indexed on success for all files and their children
      updateChildrenIndexingStatus(selectedFileIds, "indexed");

      setSelectedFiles(new Set());
    } catch (error) {
      updateChildrenIndexingStatus(selectedFileIds, "not_indexed");
      console.error("Failed to index files:", error);
    } finally {
      setIsOperationInProgress(false);
    }
  };

  const handleUnindexFiles = async () => {
    const selectedFileIds = Array.from(selectedFiles);

    // Set operation in progress
    setIsOperationInProgress(true);

    // Set selected files and their children to unindexing state
    updateChildrenIndexingStatus(selectedFileIds, "unindexing");

    try {
      // Get all file paths including recursive folder contents
      const allFilePathsToUnindex = await getAllFilePathsForUnindexing(
        selectedFileIds,
        files,
        folderContents,
        selectedConnectionId
      );

      // Make actual API call to unindex all files
      await unindexFiles(allFilePathsToUnindex);

      // Update status to not_indexed on success for all files and their children
      updateChildrenIndexingStatus(selectedFileIds, "not_indexed");

      setSelectedFiles(new Set());
    } catch (error) {
      // Reset status on error for selected files and their children
      updateChildrenIndexingStatus(selectedFileIds, "indexed");
      console.error("Failed to unindex files:", error);
    } finally {
      setIsOperationInProgress(false);
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
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

            {/* Search, Sort, and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search files..."
                  value={searchSortFilter.searchQuery}
                  onChange={(e) =>
                    setSearchSortFilter((prev) => ({
                      ...prev,
                      searchQuery: e.target.value,
                    }))
                  }
                  className="pl-10"
                  disabled={isOperationInProgress}
                />
                {searchSortFilter.searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setSearchSortFilter((prev) => ({
                        ...prev,
                        searchQuery: "",
                      }))
                    }
                    className="absolute right-2 top-2 h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>

              {/* Sort */}
              <Select
                value={searchSortFilter.sortBy}
                onValueChange={(value: SortOption) =>
                  setSearchSortFilter((prev) => ({ ...prev, sortBy: value }))
                }
                disabled={isOperationInProgress}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="date-asc">Date (Oldest)</SelectItem>
                  <SelectItem value="date-desc">Date (Newest)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            {error ? (
              <div className="text-center py-8 text-destructive">
                <p>Failed to load files.</p>
                <p className="text-sm text-muted-foreground">
                  Please try again later.
                </p>
              </div>
            ) : (
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
                              filesWithSelectedParent.has(
                                file.resource_id || ""
                              )
                          )
                        }
                        disabled={isOperationInProgress}
                        onCheckedChange={(checked: boolean) => {
                          if (checked) {
                            // Select all top-level files (parent-child deduplication is automatic)
                            const topLevelFileIds = files
                              .filter((file) => file.resource_id)
                              .map((file) => file.resource_id!);
                            setSelectedFiles(new Set(topLevelFileIds));
                          } else {
                            setSelectedFiles(new Set());
                          }
                        }}
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
                      const {
                        file,
                        depth,
                        isLoading: fileIsLoading,
                      } = fileData;
                      const isSelected = selectedFiles.has(
                        file.resource_id || ""
                      );
                      const isFolder = file.inode_type === "directory";
                      const indexingStatus =
                        fileIndexingStatus.get(file.resource_id || "") ||
                        "not_indexed";

                      // Check if any parent is selected
                      const recursiveParentIsSelected =
                        filesWithSelectedParent.has(file.resource_id || "");

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
                                isOperationInProgress ||
                                recursiveParentIsSelected
                              }
                              onCheckedChange={(checked: boolean) => {
                                // Only allow changes if no parent is selected
                                if (recursiveParentIsSelected) return;

                                const newSelected = new Set(selectedFiles);

                                if (checked) {
                                  newSelected.add(file.resource_id);

                                  // If selecting a folder, unselect any of its children to prevent duplicates
                                  if (isFolder && file.resource_id) {
                                    const removeChildrenFromSelection = (
                                      folderId: string
                                    ) => {
                                      const children =
                                        folderContents.get(folderId);
                                      if (children) {
                                        children.forEach((child) => {
                                          if (child.resource_id) {
                                            newSelected.delete(
                                              child.resource_id
                                            );
                                            // Recursively remove children of subfolders
                                            if (
                                              child.inode_type === "directory"
                                            ) {
                                              removeChildrenFromSelection(
                                                child.resource_id
                                              );
                                            }
                                          }
                                        });
                                      }
                                    };

                                    removeChildrenFromSelection(
                                      file.resource_id
                                    );
                                  }
                                } else {
                                  newSelected.delete(file.resource_id);
                                }
                                setSelectedFiles(newSelected);
                              }}
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
                                  {file.inode_path?.path?.split("/").pop() ||
                                    "Unnamed"}
                                </button>
                              ) : (
                                <span className="font-medium">
                                  {file.inode_path?.path?.split("/").pop() ||
                                    "Unnamed"}
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
                            {file.modified_at
                              ? formatDate(file.modified_at)
                              : "-"}
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
            )}
          </CardContent>
        </Card>

        {/* Show message when no results after filtering */}
        {files.length === 0 &&
          rawFiles.length > 0 &&
          (searchSortFilter.nameFilter || debouncedSearchQuery) && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No files match your current filters.</p>
              <div className="flex justify-center space-x-2 mt-2">
                {debouncedSearchQuery && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setSearchSortFilter((prev) => ({
                        ...prev,
                        searchQuery: "",
                      }))
                    }
                  >
                    Clear search
                  </Button>
                )}
                {searchSortFilter.nameFilter && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setSearchSortFilter((prev) => ({
                        ...prev,
                        nameFilter: "",
                      }))
                    }
                  >
                    Clear filter
                  </Button>
                )}
              </div>
            </div>
          )}

        {/* Pagination Controls */}
        {files.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              {debouncedSearchQuery && (
                <span className="text-blue-600 mr-2">
                  🔍 Search: &ldquo;{debouncedSearchQuery}&rdquo;
                </span>
              )}
              {searchSortFilter.nameFilter && (
                <span className="text-green-600 mr-2">
                  🏷️ Filter: &ldquo;{searchSortFilter.nameFilter}&rdquo;
                </span>
              )}
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
                    {selectedFiles.size} resource
                    {selectedFiles.size !== 1 ? "s" : ""} selected
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleIndexFiles}
                    disabled={isOperationInProgress}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Index Files
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUnindexFiles}
                    disabled={isOperationInProgress}
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
