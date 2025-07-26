/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChunkerType } from './ChunkerType';
/**
 * Chunking configuration parameters.
 *
 * Please keep in mind that this is used in the supabase knowledge_bases table, so you should always provide a default
 * value and try to make things as backward compatible as possible.
 */
export type ChunkerData_Input = {
    chunk_len?: number;
    overlap?: number;
    chunker?: ChunkerType;
};

