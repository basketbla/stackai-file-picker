/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Embedding parameters.
 *
 * Please keep in mind that this is used in the supabase knowledge_bases table, so you should always provide a default
 * value and try to make things as backward compatible as possible.
 */
export type EmbeddingsData_Output = {
    api?: (string | null);
    base_url?: (string | null);
    embedding_model?: string;
    batch_size?: number;
    track_usage?: boolean;
    timeout?: number;
};

