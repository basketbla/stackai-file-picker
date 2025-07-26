/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WorkflowState } from './WorkflowState';
/**
 * A row with information about a run log.
 */
export type ProjectRunSummary = {
    run_id: string;
    conversation_id?: (string | null);
    date: string;
    is_flow_successful: (boolean | null);
    state: (WorkflowState | null);
    error: (string | null);
    latency: (number | null);
    total_tokens: number;
    user_id: (string | null);
    inputs: (string | null);
    outputs: (string | null);
    llms: (string | null);
    feedback: (string | null);
};

