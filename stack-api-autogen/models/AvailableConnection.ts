/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConnectionParameter } from './ConnectionParameter';
import type { ConnectionType } from './ConnectionType';
export type AvailableConnection = {
    icon: string;
    id: string;
    name: string;
    description: string;
    labels: Array<string>;
    params: Array<ConnectionParameter>;
    minimum_plan: string;
    is_marketing_stunt?: boolean;
    connection_type?: ConnectionType;
};

