/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HttpMethod } from './HttpMethod';
export type CustomApiHttpRequest = {
    url: string;
    method: HttpMethod;
    headers: Record<string, string>;
    input_type: CustomApiHttpRequest.input_type;
    description?: (string | null);
    input_data?: (Record<string, any> | null);
};
export namespace CustomApiHttpRequest {
    export enum input_type {
        BODY = 'body',
        QUERY = 'query',
    }
}

