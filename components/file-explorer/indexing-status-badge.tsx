import { formatDate } from "@/lib/file-explorer-helpers";
import { Badge } from "../ui/badge";

type IndexingStatus = "indexed" | "not_indexed" | "indexing" | "unindexing";

interface IndexingStatusBadgeProps {
  status: IndexingStatus;
  indexedAt?: string;
}

export function IndexingStatusBadge({ status, indexedAt }: IndexingStatusBadgeProps) {
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