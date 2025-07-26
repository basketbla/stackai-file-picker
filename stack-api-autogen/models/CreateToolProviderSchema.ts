/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiEndpointSchema } from './ApiEndpointSchema';
import type { HeaderSchema } from './HeaderSchema';
export type CreateToolProviderSchema = {
    name: string;
    icon: (string | null);
    api_schema: string;
    apis: Array<ApiEndpointSchema>;
    headers: Array<HeaderSchema>;
    dereferenced_schema: any;
};

