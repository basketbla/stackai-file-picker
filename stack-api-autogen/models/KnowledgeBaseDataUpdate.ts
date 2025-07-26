/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IndexingParams_Input } from './IndexingParams_Input';
import type { KnowledgeBaseRole } from './KnowledgeBaseRole';
import type { SelectedWebsiteSource } from './SelectedWebsiteSource';
export type KnowledgeBaseDataUpdate = {
    connection_id: (string | null);
    connection_source_ids: Array<string>;
    website_sources: Array<SelectedWebsiteSource>;
    name?: string;
    description?: string;
    indexing_params: IndexingParams_Input;
    org_level_role?: (KnowledgeBaseRole | null);
    cron_job_id?: (string | null);
};

