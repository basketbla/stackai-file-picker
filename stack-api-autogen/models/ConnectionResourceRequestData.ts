/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseConnectionDataModel_Input } from './BaseConnectionDataModel_Input';
/**
 * Request model for creating/updating a connection.
 */
export type ConnectionResourceRequestData = {
    name?: string;
    connection_provider: string;
    connection_provider_data: BaseConnectionDataModel_Input;
};

