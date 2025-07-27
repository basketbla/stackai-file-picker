import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { USER_SETTINGS } from "@/lib/constants";
import { ArrowLeft, Database, HardDrive } from "lucide-react";
import Link from "next/link";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Files
                </Button>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-semibold text-gray-900">
                  User Settings
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Knowledge Base Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-blue-600" />
                <CardTitle>Knowledge Base</CardTitle>
              </div>
              <CardDescription>
                Information about your current knowledge base configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Name
                  </label>
                  <p className="text-sm text-gray-900">{USER_SETTINGS.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Description
                  </label>
                  <p className="text-sm text-gray-900">
                    {USER_SETTINGS.description}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Knowledge Base ID
                  </label>
                  <p className="text-sm text-gray-900 font-mono">
                    {USER_SETTINGS.knowledge_base_id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Organization ID
                  </label>
                  <p className="text-sm text-gray-900 font-mono">
                    {USER_SETTINGS.org_id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <div>
                    <Badge
                      variant={USER_SETTINGS.is_empty ? "outline" : "default"}
                    >
                      {USER_SETTINGS.is_empty ? "Empty" : "Contains Data"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Total Size
                  </label>
                  <p className="text-sm text-gray-900">
                    {formatBytes(USER_SETTINGS.total_size)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Created
                  </label>
                  <p className="text-sm text-gray-900">
                    {formatDate(USER_SETTINGS.created_at)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Last Updated
                  </label>
                  <p className="text-sm text-gray-900">
                    {formatDate(USER_SETTINGS.updated_at)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Connection Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <HardDrive className="h-5 w-5 text-green-600" />
                <CardTitle>Connection</CardTitle>
              </div>
              <CardDescription>
                Details about your connected data source
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Connection ID
                  </label>
                  <p className="text-sm text-gray-900 font-mono">
                    {USER_SETTINGS.connection_id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Provider Type
                  </label>
                  <div>
                    <Badge variant="secondary" className="capitalize">
                      {USER_SETTINGS.connection_provider_type}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Source IDs
                  </label>
                  <p className="text-sm text-gray-900">
                    {USER_SETTINGS.connection_source_ids.length > 0
                      ? USER_SETTINGS.connection_source_ids.join(", ")
                      : "None configured"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Website Sources
                  </label>
                  <p className="text-sm text-gray-900">
                    {USER_SETTINGS.website_sources.length > 0
                      ? USER_SETTINGS.website_sources.join(", ")
                      : "None configured"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Indexing Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Indexing Configuration</CardTitle>
              <CardDescription>
                Settings for how your content is processed and indexed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Processing Options
                  </h4>
                  <div className="flex space-x-4">
                    <Badge
                      variant={
                        USER_SETTINGS.indexing_params.ocr
                          ? "default"
                          : "outline"
                      }
                    >
                      OCR:{" "}
                      {USER_SETTINGS.indexing_params.ocr
                        ? "Enabled"
                        : "Disabled"}
                    </Badge>
                    <Badge
                      variant={
                        USER_SETTINGS.indexing_params.unstructured
                          ? "default"
                          : "outline"
                      }
                    >
                      Unstructured:{" "}
                      {USER_SETTINGS.indexing_params.unstructured
                        ? "Enabled"
                        : "Disabled"}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Embedding Parameters
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Model
                      </label>
                      <p className="text-sm text-gray-900">
                        {
                          USER_SETTINGS.indexing_params.embedding_params
                            .embedding_model
                        }
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Batch Size
                      </label>
                      <p className="text-sm text-gray-900">
                        {
                          USER_SETTINGS.indexing_params.embedding_params
                            .batch_size
                        }
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Timeout
                      </label>
                      <p className="text-sm text-gray-900">
                        {USER_SETTINGS.indexing_params.embedding_params.timeout}
                        s
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Track Usage
                      </label>
                      <Badge
                        className="ml-2"
                        variant={
                          USER_SETTINGS.indexing_params.embedding_params
                            .track_usage
                            ? "default"
                            : "outline"
                        }
                      >
                        {USER_SETTINGS.indexing_params.embedding_params
                          .track_usage
                          ? "Enabled"
                          : "Disabled"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Chunker Parameters
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Chunk Size
                      </label>
                      <p className="text-sm text-gray-900">
                        {
                          USER_SETTINGS.indexing_params.chunker_params
                            .chunk_size
                        }
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Chunk Overlap
                      </label>
                      <p className="text-sm text-gray-900">
                        {
                          USER_SETTINGS.indexing_params.chunker_params
                            .chunk_overlap
                        }
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Chunker Type
                      </label>
                      <Badge variant="secondary" className="capitalize">
                        {
                          USER_SETTINGS.indexing_params.chunker_params
                            .chunker_type
                        }
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
