/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Attachment } from './Attachment';
export type NewMessageRequest = {
    new_message_id: string;
    parent_message_id?: (string | null);
    user_id: string;
    message: string;
    conversation_id?: (string | null);
    is_client_side_generated_conversation_id?: boolean;
    attachments?: Array<Attachment>;
    stream?: boolean;
    draft?: boolean;
    additional_inputs?: Record<string, any>;
};

