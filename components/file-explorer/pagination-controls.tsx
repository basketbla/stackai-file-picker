import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface PaginationControlsProps {
  currentPage: number;
  totalFiles: number;
  pageSize: number;
  hasMore: boolean;
  isLoading: boolean;
  debouncedSearchQuery: string;
  nameFilter: string;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export function PaginationControls({
  currentPage,
  totalFiles,
  pageSize,
  hasMore,
  isLoading,
  debouncedSearchQuery,
  nameFilter,
  onPrevPage,
  onNextPage,
}: PaginationControlsProps) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <div className="text-sm text-gray-700">
        {debouncedSearchQuery && (
          <span className="text-blue-600 mr-2">
            🔍 Search: &ldquo;{debouncedSearchQuery}&rdquo;
          </span>
        )}
        {nameFilter && (
          <span className="text-green-600 mr-2">
            🏷️ Filter: &ldquo;{nameFilter}&rdquo;
          </span>
        )}
        Page {currentPage} of {Math.ceil(totalFiles / pageSize)}
        {totalFiles > 0 && ` (${totalFiles} total files)`}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevPage}
          disabled={currentPage === 1 || isLoading}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onNextPage}
          disabled={!hasMore || isLoading}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
} 