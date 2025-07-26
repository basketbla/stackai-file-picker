/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActionDescription } from './ActionDescription';
import type { ApiToolInfo } from './ApiToolInfo';
import type { ToolInputParameterSchema } from './ToolInputParameterSchema';
import type { ToolOutputParameterSchema } from './ToolOutputParameterSchema';
export type ActionSchema = {
    action_id: string;
    provider_id: string;
    name: string;
    description: ActionDescription;
    input_params: Array<ToolInputParameterSchema>;
    output_params: Array<ToolOutputParameterSchema>;
    api_tool_info: (ApiToolInfo | null);
};

