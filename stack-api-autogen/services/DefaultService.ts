/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DefaultService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Root
     * @returns any Successful Response
     * @throws ApiError
     */
    public rootGet(): CancelablePromise<Record<string, any>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/',
        });
    }
    /**
     * Teams Messages Endpoint
     * @param projectId
     * @param apiKey
     * @returns any Successful Response
     * @throws ApiError
     */
    public teamsMessagesEndpointMsftTeamsProjectIdMessagesPost(
        projectId: string,
        apiKey?: (string | null),
    ): CancelablePromise<Record<string, any>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/msft-teams/{project_id}/messages',
            path: {
                'project_id': projectId,
            },
            query: {
                'api_key': apiKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Health Check
     * Check if all critical system components are healthy.
     * @returns string Successful Response
     * @throws ApiError
     */
    public healthCheckHealthzGet(): CancelablePromise<Record<string, string>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/healthz',
        });
    }
}
