"use client";

import {
  useDebounced,
  useFileStatusUpdate,
  useFilesWithSelectedParent,
  useIndexingStatus,
  usePaginationReset,
  usePaginationUpdate,
} from "@/hooks/file-explorer-hooks";
import { USER_SETTINGS } from "@/lib/constants";
import {
  fetchConnectionFiles,
  getAllFilePathsForUnindexing,
  indexFiles,
  unindexFiles,
} from "@/lib/file-explorer-helpers";
import { StackDirectory, StackFile } from "@/stack-api-autogen";
import { useQuery } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ActionPanel,
  FileTable,
  LogoutButton,
  NoResults,
  PaginationControls,
  SearchControls,
} from "./file-explorer/index";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

type IndexingStatus = "indexed" | "not_indexed" | "indexing" | "unindexing";

type SortOption = "name-asc" | "name-desc" | "date-asc" | "date-desc";

interface SearchSortFilterState {
  searchQuery: string;
  sortBy: SortOption;
  nameFilter: string;
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

  // Use custom hooks
  usePaginationUpdate(paginatedData, setTotalFiles, setHasMore);
  useIndexingStatus(setIsIndexingStatusLoading, setIndexedFilePaths);
  useFileStatusUpdate(files, indexedFilePaths, setFileIndexingStatus);
  useFilesWithSelectedParent(
    selectedFiles,
    files,
    folderContents,
    expandedFolders,
    setFilesWithSelectedParent
  );
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
      }

      return newExpanded;
    });
  };

  // File selection handlers
  const handleFileSelect = (fileId: string, checked: boolean) => {
    const newSelected = new Set(selectedFiles);

    if (checked) {
      newSelected.add(fileId);

      // If selecting a folder, unselect any of its children to prevent duplicates
      const selectedFile = files.find((f) => f.resource_id === fileId);
      if (
        selectedFile?.inode_type === "directory" &&
        selectedFile.resource_id
      ) {
        const removeChildrenFromSelection = (folderId: string) => {
          const children = folderContents.get(folderId);
          if (children) {
            children.forEach((child) => {
              if (child.resource_id) {
                newSelected.delete(child.resource_id);
                // Recursively remove children of subfolders
                if (child.inode_type === "directory") {
                  removeChildrenFromSelection(child.resource_id);
                }
              }
            });
          }
        };

        removeChildrenFromSelection(selectedFile.resource_id);
      }
    } else {
      newSelected.delete(fileId);
    }
    setSelectedFiles(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      // Select all top-level files (parent-child deduplication is automatic)
      const topLevelFileIds = files
        .filter((file) => file.resource_id)
        .map((file) => file.resource_id!);
      setSelectedFiles(new Set(topLevelFileIds));
    } else {
      setSelectedFiles(new Set());
    }
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

            <SearchControls
              searchSortFilter={searchSortFilter}
              setSearchSortFilter={setSearchSortFilter}
              isOperationInProgress={isOperationInProgress}
            />
          </CardHeader>

          <CardContent>
            <FileTable
              files={files}
              isLoading={isLoading}
              error={error}
              selectedFiles={selectedFiles}
              filesWithSelectedParent={filesWithSelectedParent}
              fileIndexingStatus={fileIndexingStatus}
              expandedFolders={expandedFolders}
              currentlyLoadingFiles={currentlyLoadingFiles}
              folderContents={folderContents}
              isOperationInProgress={isOperationInProgress}
              selectedConnectionId={selectedConnectionId}
              onFileSelect={handleFileSelect}
              onSelectAll={handleSelectAll}
              onFolderClick={handleFolderClick}
              setFolderContents={setFolderContents}
              setCurrentlyLoadingFiles={setCurrentlyLoadingFiles}
              setFileIndexingStatus={setFileIndexingStatus}
            />
          </CardContent>
        </Card>

        {/* Show message when no results after filtering */}
        {files.length === 0 &&
          rawFiles.length > 0 &&
          (searchSortFilter.nameFilter || debouncedSearchQuery) && (
            <NoResults
              debouncedSearchQuery={debouncedSearchQuery}
              nameFilter={searchSortFilter.nameFilter}
              onClearSearch={() =>
                setSearchSortFilter((prev) => ({
                  ...prev,
                  searchQuery: "",
                }))
              }
              onClearFilter={() =>
                setSearchSortFilter((prev) => ({
                  ...prev,
                  nameFilter: "",
                }))
              }
            />
          )}

        {/* Pagination Controls */}
        {files.length > 0 && (
          <PaginationControls
            currentPage={currentPage}
            totalFiles={totalFiles}
            pageSize={pageSize}
            hasMore={hasMore}
            isLoading={isLoading}
            debouncedSearchQuery={debouncedSearchQuery}
            nameFilter={searchSortFilter.nameFilter}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
          />
        )}

        {/* Action Panel */}
        <ActionPanel
          selectedFilesCount={selectedFiles.size}
          isOperationInProgress={isOperationInProgress}
          onIndexFiles={handleIndexFiles}
          onUnindexFiles={handleUnindexFiles}
        />
      </main>
    </div>
  );
}
