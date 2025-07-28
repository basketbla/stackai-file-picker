import { Check, X } from "lucide-react";
import { Button } from "../ui/button";

interface ActionPanelProps {
  selectedFilesCount: number;
  isOperationInProgress: boolean;
  onIndexFiles: () => void;
  onUnindexFiles: () => void;
}

export function ActionPanel({
  selectedFilesCount,
  isOperationInProgress,
  onIndexFiles,
  onUnindexFiles,
}: ActionPanelProps) {
  if (selectedFilesCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 min-w-96">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 mr-4">
            <span className="text-sm font-medium text-gray-900">
              {selectedFilesCount} resource
              {selectedFilesCount !== 1 ? "s" : ""} selected
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="default"
              size="sm"
              onClick={onIndexFiles}
              disabled={isOperationInProgress}
            >
              <Check className="h-4 w-4 mr-1" />
              Index Files
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onUnindexFiles}
              disabled={isOperationInProgress}
            >
              <X className="h-4 w-4 mr-1" />
              Unindex Files
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 