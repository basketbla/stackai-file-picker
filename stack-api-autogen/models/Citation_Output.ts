/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CitationSourceType } from './CitationSourceType';
import type { PositionInDocument } from './PositionInDocument';
export type Citation_Output = {
    /**
     * An unique identifier for the citation.
     */
    id: string;
    /**
     * The id of the source document/website/kb file. Multiple citations may share the same source_id but reference different pages/chunks of that document.
     */
    source_id: string;
    /**
     * The title of the source of the citation.
     */
    title: string;
    /**
     * The text of the citation.
     */
    text: string;
    /**
     * The type of source of the citation.
     */
    citation_source_type?: CitationSourceType;
    /**
     * Whether the source is a website.
     */
    source_is_website?: boolean;
    /**
     * The MIME type of the source of the citation.
     */
    source_mime_type?: (string | null);
    /**
     * A URL link to the source of the citation in gdrive/a website/etc.
     */
    external_source_url?: (string | null);
    /**
     * A signed URL to download/preview the file coming from StackAI document storage.
     */
    supabase_signed_url?: (string | null);
    /**
     * Indicates the specific location within the source document where the citation is located.
     */
    position?: (PositionInDocument | null);
};

