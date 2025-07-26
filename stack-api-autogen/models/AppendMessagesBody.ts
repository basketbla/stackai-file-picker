/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AssistantMessage_Input } from './AssistantMessage_Input';
import type { UserMessage_Input } from './UserMessage_Input';
export type AppendMessagesBody = {
    messages: Array<(UserMessage_Input | AssistantMessage_Input)>;
    user_id: string;
};

