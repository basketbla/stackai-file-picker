/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A domain model representing a request to create a new Trigger.
 */
export type ProjectTriggerCreate = {
    provider_id: string;
    trigger_id: string;
    trigger_config_params: Record<string, any>;
    connection_id?: (string | null);
};

