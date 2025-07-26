/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProviderType } from './ProviderType';
export type SelectedTool = {
    provider_id: string;
    provider_name?: (string | null);
    provider_type?: (ProviderType | null);
    tool_id: string;
    tool_name?: (string | null);
    tool_configurations: Record<string, any>;
    tool_parameters: Record<string, any>;
};

