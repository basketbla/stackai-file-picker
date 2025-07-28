import { Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SortOption = "name-asc" | "name-desc" | "date-asc" | "date-desc";

interface SearchSortFilterState {
  searchQuery: string;
  sortBy: SortOption;
  nameFilter: string;
}

interface SearchControlsProps {
  searchSortFilter: SearchSortFilterState;
  setSearchSortFilter: (state: SearchSortFilterState | ((prev: SearchSortFilterState) => SearchSortFilterState)) => void;
  isOperationInProgress: boolean;
}

export function SearchControls({
  searchSortFilter,
  setSearchSortFilter,
  isOperationInProgress,
}: SearchControlsProps) {
  return (
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
  );
} 