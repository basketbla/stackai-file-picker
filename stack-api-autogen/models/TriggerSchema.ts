/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiToolInfo } from './ApiToolInfo';
import type { ToolInputParameterSchema } from './ToolInputParameterSchema';
import type { ToolOutputParameterSchema } from './ToolOutputParameterSchema';
export type TriggerSchema = {
    trigger_id: string;
    provider_id: string;
    name: string;
    description: string;
    instructions?: (string | null);
    input_params: Array<ToolInputParameterSchema>;
    output_params: Array<ToolOutputParameterSchema>;
    api_tool_info: (ApiToolInfo | null);
};

