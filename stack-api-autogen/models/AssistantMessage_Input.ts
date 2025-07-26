/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Citation_Input } from './Citation_Input';
import type { FeedbackMessage } from './FeedbackMessage';
import type { MessageStatusType } from './MessageStatusType';
import type { TextContentPart } from './TextContentPart';
import type { ToolCallContentPart_Input } from './ToolCallContentPart_Input';
export type AssistantMessage_Input = {
    id: string;
    type?: string;
    created_at: string;
    parent_id?: (string | null);
    metadata?: Record<string, any>;
    conversation_id?: (string | null);
    role?: string;
    content: Array<(TextContentPart | ToolCallContentPart_Input)>;
    status: MessageStatusType;
    error?: null;
    citations?: (Array<Citation_Input> | null);
    feedback?: (FeedbackMessage | null);
    run_id?: (string | null);
};

