import { USER_SETTINGS } from "@/lib/constants";
import { fetchIndexingStatus } from "@/lib/file-explorer-helpers";
import { StackDirectory, StackFile } from "@/stack-api-autogen";
import { useEffect, useState } from "react";

type IndexingStatus = "indexed" | "not_indexed" | "indexing" | "unindexing";
type SortOption = "name-asc" | "name-desc" | "date-asc" | "date-desc";

interface SearchSortFilterState {
  searchQuery: string;
  sortBy: SortOption;
  nameFilter: string;
}

// Debounce search query
export function useDebounced(searchSortFilter: SearchSortFilterState) {
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchSortFilter.searchQuery);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(timer);
  }, [searchSortFilter.searchQuery]);

  return debouncedSearchQuery;
}

// Update pagination state when data changes
export function usePaginationUpdate(
  paginatedData: any,
  setTotalFiles: (total: number) => void,
  setHasMore: (hasMore: boolean) => void
) {
  useEffect(() => {
    if (paginatedData) {
      setTotalFiles(paginatedData.total);
      setHasMore(paginatedData.hasMore);
    }
  }, [paginatedData, setTotalFiles, setHasMore]);
}

// Fetch indexing status immediately (in parallel with files)
export function useIndexingStatus(
  setIsIndexingStatusLoading: (loading: boolean) => void,
  setIndexedFilePaths: (paths: string[]) => void
) {
  useEffect(() => {
    const loadIndexingStatus = async () => {
      setIsIndexingStatusLoading(true);
      try {
        const paths = await fetchIndexingStatus(
          USER_SETTINGS.knowledge_base_id
        );
        setIndexedFilePaths(paths);
      } catch (error) {
        console.error("Failed to load indexing status:", error);
      } finally {
        setIsIndexingStatusLoading(false);
      }
    };

    loadIndexingStatus();
  }, [setIsIndexingStatusLoading, setIndexedFilePaths]);
}

// Update file statuses when either files or indexing status changes
export function useFileStatusUpdate(
  files: (StackFile | StackDirectory)[],
  indexedFilePaths: string[],
  setFileIndexingStatus: (statusMap: Map<string, IndexingStatus>) => void
) {
  useEffect(() => {
    if (files.length === 0) return;

    const statusMap = new Map<string, IndexingStatus>();

    // Check each file in the current view against indexed paths
    files.forEach((file) => {
      if (file.resource_id) {
        const filePath = file.inode_path?.path;
        if (filePath && indexedFilePaths.includes(filePath)) {
          statusMap.set(file.resource_id, "indexed");
        } else {
          statusMap.set(file.resource_id, "not_indexed");
        }
      }
    });

    setFileIndexingStatus(statusMap);
  }, [files, indexedFilePaths, setFileIndexingStatus]);
}

// Update files with selected parent when selections or file structure changes
export function useFilesWithSelectedParent(
  selectedFiles: Set<string>,
  files: (StackFile | StackDirectory)[],
  folderContents: Map<string, (StackFile | StackDirectory)[]>,
  expandedFolders: Set<string>,
  setFilesWithSelectedParent: (files: Set<string>) => void
) {
  useEffect(() => {
    const computeFilesWithSelectedParent = () => {
      const newFilesWithSelectedParent = new Set<string>();

      // First, get all selected file paths and IDs for directories
      const selectedFolderPaths = new Set<string>();

      // Helper to find file by ID in all visible files
      const findFileById = (
        targetId: string,
        fileList: (StackFile | StackDirectory)[] = files
      ): StackFile | StackDirectory | null => {
        for (const file of fileList) {
          if (file.resource_id === targetId) return file;
          // Also check in folder contents
          if (file.inode_type === "directory") {
            const children = folderContents.get(file.resource_id || "");
            if (children) {
              const found = findFileById(targetId, children);
              if (found) return found;
            }
          }
        }
        return null;
      };

      // Collect paths of selected folders
      selectedFiles.forEach((selectedId) => {
        const selectedFile = findFileById(selectedId);
        if (
          selectedFile?.inode_type === "directory" &&
          selectedFile.inode_path?.path
        ) {
          selectedFolderPaths.add(selectedFile.inode_path.path);
        }
      });

      // Helper to check if a file path has any selected parent
      const hasSelectedParent = (filePath: string): boolean => {
        if (!filePath) return false;

        // Check if any selected folder path is a parent of this file
        for (const selectedFolderPath of selectedFolderPaths) {
          if (filePath.startsWith(selectedFolderPath + "/")) {
            return true;
          }
        }
        return false;
      };

      // Check all visible files (including in expanded folders)
      const checkFiles = (fileList: (StackFile | StackDirectory)[]) => {
        fileList.forEach((file) => {
          if (file.resource_id && file.inode_path?.path) {
            if (hasSelectedParent(file.inode_path.path)) {
              newFilesWithSelectedParent.add(file.resource_id);
            }
          }

          // Also check expanded folder contents
          if (
            file.inode_type === "directory" &&
            file.resource_id &&
            expandedFolders.has(file.resource_id)
          ) {
            const children = folderContents.get(file.resource_id);
            if (children) {
              checkFiles(children);
            }
          }
        });
      };

      checkFiles(files);

      setFilesWithSelectedParent(newFilesWithSelectedParent);
    };

    computeFilesWithSelectedParent();
  }, [
    selectedFiles,
    files,
    folderContents,
    expandedFolders,
    setFilesWithSelectedParent,
  ]);
}

// Reset pagination when search/filter changes
export function usePaginationReset(
  debouncedSearchQuery: string,
  nameFilter: string,
  setCurrentPage: (page: number) => void,
  setCursor: (cursor: string | undefined) => void,
  setSelectedFiles: (files: Set<string>) => void
) {
  useEffect(() => {
    setCurrentPage(1);
    setCursor(undefined);
    setSelectedFiles(new Set());
  }, [
    debouncedSearchQuery,
    nameFilter,
    setCurrentPage,
    setCursor,
    setSelectedFiles,
  ]);
}
