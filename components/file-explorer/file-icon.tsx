import { StackDirectory, StackFile } from "@/stack-api-autogen";
import { File, FileText, Folder } from "lucide-react";

interface FileIconProps {
  file: StackFile | StackDirectory;
}

export function FileIcon({ file }: FileIconProps) {
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