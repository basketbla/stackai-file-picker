/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActionSchema } from './ActionSchema';
import type { HeaderSchema } from './HeaderSchema';
import type { ProviderConnectionType } from './ProviderConnectionType';
import type { TriggerSchema } from './TriggerSchema';
export type ToolProviderSchema = {
    provider_id: string;
    name: string;
    description: string;
    icon: string;
    tags: Array<string>;
    triggers: Array<TriggerSchema>;
    actions: Array<ActionSchema>;
    connection: (ProviderConnectionType | null);
    openapi_schema: (string | null);
    headers: (Array<HeaderSchema> | null);
};

