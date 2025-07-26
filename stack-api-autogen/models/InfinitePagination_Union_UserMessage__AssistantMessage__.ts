/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AssistantMessage_Output } from './AssistantMessage_Output';
import type { UserMessage_Output } from './UserMessage_Output';
export type InfinitePagination_Union_UserMessage__AssistantMessage__ = {
    data: Array<(UserMessage_Output | AssistantMessage_Output)>;
    has_more: boolean;
    first_id?: (string | null);
    last_id?: (string | null);
};

