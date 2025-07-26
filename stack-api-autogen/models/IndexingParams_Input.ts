/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChunkerData_Input } from './ChunkerData_Input';
import type { EmbeddingsData_Input } from './EmbeddingsData_Input';
/**
 * Parameters used for indexing a library.
 *
 * Please keep in mind that this is used in the supabase knowledge_bases table, so you should always provide a default
 * value and try to make things as backward compatible as possible.
 */
export type IndexingParams_Input = {
    ocr?: boolean;
    unstructured?: boolean;
    embedding_params?: EmbeddingsData_Input;
    chunker_params?: ChunkerData_Input;
};

