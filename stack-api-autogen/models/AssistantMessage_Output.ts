/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Citation_Output } from './Citation_Output';
import type { FeedbackMessage } from './FeedbackMessage';
import type { MessageStatusType } from './MessageStatusType';
import type { TextContentPart } from './TextContentPart';
import type { ToolCallContentPart_Output } from './ToolCallContentPart_Output';
export type AssistantMessage_Output = {
    id: string;
    type?: string;
    created_at: number;
    parent_id?: (string | null);
    metadata?: Record<string, any>;
    conversation_id?: (string | null);
    role?: string;
    content: Array<(TextContentPart | ToolCallContentPart_Output)>;
    status: MessageStatusType;
    error?: null;
    citations?: (Array<Citation_Output> | null);
    feedback?: (FeedbackMessage | null);
    run_id?: (string | null);
};

