/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChunkerData_Output } from './ChunkerData_Output';
import type { EmbeddingsData_Output } from './EmbeddingsData_Output';
/**
 * Parameters used for indexing a library.
 *
 * Please keep in mind that this is used in the supabase knowledge_bases table, so you should always provide a default
 * value and try to make things as backward compatible as possible.
 */
export type IndexingParams_Output = {
    ocr?: boolean;
    unstructured?: boolean;
    embedding_params?: EmbeddingsData_Output;
    chunker_params?: ChunkerData_Output;
};

