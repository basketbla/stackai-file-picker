/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ToolCall } from './ToolCall';
import type { ToolCallContentPartStatus } from './ToolCallContentPartStatus';
export type ToolCallContentPart_Output = {
    type?: string;
    status: ToolCallContentPartStatus;
    tool_call: ToolCall;
};

