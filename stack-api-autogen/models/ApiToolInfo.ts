/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HeaderSchema } from './HeaderSchema';
import type { ToolInputParameterSchema } from './ToolInputParameterSchema';
/**
 * Class for storing API tool schema information.
 *
 * Stores metadata about an API-based tool including:
 * - Server URL
 * - Operation ID
 * - HTTP method
 * - Summary
 * - Parameters
 * - OpenAPI operation details
 */
export type ApiToolInfo = {
    id: string;
    server_url_with_path: string;
    method: string;
    path: string;
    description?: (string | null);
    parameters?: Array<ToolInputParameterSchema>;
    headers?: Array<HeaderSchema>;
};

