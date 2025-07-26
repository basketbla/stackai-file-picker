/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Citation_Output } from './Citation_Output';
import type { RunFeedback } from './RunFeedback';
import type { WorkflowState } from './WorkflowState';
/**
 * Pydantic model for a flow run.
 *
 * Stores information about individual flow runs including performance metrics,
 * inputs/outputs, and user feedback.
 */
export type Run = {
    id: string;
    latency_in_seconds: number;
    user_id: (string | null);
    state: (WorkflowState | null);
    input: (Record<string, any> | null);
    output: (Record<string, any> | null);
    error: (string | null);
    created_at: string;
    project_id: (string | null);
    feedback?: (RunFeedback | null);
    org_id: (string | null);
    /**
     * List of citations used in the run from Analytics logs
     */
    citations?: (Array<Citation_Output> | null);
};

