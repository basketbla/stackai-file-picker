/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Attachment } from './Attachment';
import type { FileContentPart } from './FileContentPart';
import type { ImageContentPart } from './ImageContentPart';
import type { TextContentPart } from './TextContentPart';
export type UserMessage_Input = {
    id: string;
    type?: string;
    created_at: string;
    parent_id?: (string | null);
    metadata?: Record<string, any>;
    conversation_id?: (string | null);
    role?: string;
    content: Array<(TextContentPart | ImageContentPart | FileContentPart)>;
    attachments?: Array<Attachment>;
};

