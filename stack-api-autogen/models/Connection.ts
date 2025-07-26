/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseConnectionDataModel_Output } from './BaseConnectionDataModel_Output';
/**
 * Model for the connections table.
 */
export type Connection = {
    name?: string;
    connection_id?: string;
    user_id: string;
    org_id: string;
    share_with_org?: boolean;
    created_at?: string;
    updated_at?: string;
    connection_provider: string;
    connection_provider_data: BaseConnectionDataModel_Output;
};

