/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Model representing a tool call that is streamed by a tool action.
 *
 * This model contains real-time information about the tool call execution,
 * including its inputs, outputs and status. It is not meant for tracking
 * purposes but rather for streaming the current state of the tool call.
 */
export type ToolCall = {
    tool_call_id?: string;
    action_id: string;
    action_name: string;
    provider_id: string;
    description: string;
    inputs: Record<string, any>;
    outputs: (Record<string, any> | null);
};

