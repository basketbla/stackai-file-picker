/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CitationSourceType } from './CitationSourceType';
/**
 * A fragment of text with information about where it comes from.
 */
export type EnrichedChunk = {
    id?: string;
    source_type: CitationSourceType;
    doc_name: string;
    lib_idx: string;
    page_idx: string;
    chunk_idx: string;
    node_id?: (string | null);
    knowledge_base_id?: (string | null);
    inode_id?: (string | null);
    text: string;
    score?: (number | null);
    metadata?: Record<string, any>;
};

