/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TriggerType } from './TriggerType';
export type TriggerDefinition = {
    trigger_type: TriggerType;
    /**
     * The id of the provider
     */
    provider_id: string;
    /**
     * The id of the trigger.
     */
    trigger_id: string;
    /**
     * The name of the trigger.
     */
    trigger_name: string;
    description: string;
    /**
     * The instructions of the trigger.
     */
    instructions?: (string | null);
    /**
     * The icon of the trigger.
     */
    icon: string;
    /**
     * The tags of the trigger
     */
    tags?: (Array<string> | null);
    /**
     * Whether the webhook requires to be verified by the provider witha challenge request before being created. (e.g. Microsoft Graph Outlook & Slack webhooks requires it)
     */
    webhook_requires_verification?: boolean;
};

