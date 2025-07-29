import { Button } from "../ui/button";

interface NoResultsProps {
  debouncedSearchQuery: string;
  nameFilter: string;
  onClearSearch: () => void;
  onClearFilter: () => void;
}

export function NoResults({
  debouncedSearchQuery,
  nameFilter,
  onClearSearch,
  onClearFilter,
}: NoResultsProps) {
  return (
    <div className="text-center py-8 text-muted-foreground">
      <p>No files match your current filters.</p>
      <div className="flex justify-center space-x-2 mt-2">
        {debouncedSearchQuery && (
          <Button variant="outline" size="sm" onClick={onClearSearch}>
            Clear search
          </Button>
        )}
        {nameFilter && (
          <Button variant="outline" size="sm" onClick={onClearFilter}>
            Clear filter
          </Button>
        )}
      </div>
    </div>
  );
} 