/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IndexingParams_Output } from './IndexingParams_Output';
import type { KnowledgeBaseRole } from './KnowledgeBaseRole';
import type { MetadataSchema } from './MetadataSchema';
import type { SelectedWebsiteSource } from './SelectedWebsiteSource';
/**
 * A Knowledge Base is a collection of resources that are indexed in our vector database.
 */
export type KnowledgeBaseData = {
    knowledge_base_id: string;
    connection_id: (string | null);
    created_at: string;
    updated_at: string;
    connection_source_ids: Array<string>;
    website_sources: Array<SelectedWebsiteSource>;
    connection_provider_type?: (string | null);
    is_empty?: boolean;
    /**
     * Total size of all the files in the KB in bytes
     */
    total_size?: number;
    name?: string;
    description?: string;
    indexing_params: IndexingParams_Output;
    cron_job_id?: (string | null);
    org_id: string;
    org_level_role?: (KnowledgeBaseRole | null);
    user_metadata_schema?: (MetadataSchema | null);
    dataloader_metadata_schema?: (MetadataSchema | null);
};

