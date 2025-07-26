/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConnectionCard } from '../models/ConnectionCard';
import type { ConnectionResourceRequestData } from '../models/ConnectionResourceRequestData';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class OauthService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Oauth Url
     * Return the OAuth URL for a connection provider.
     * @param requestBody
     * @returns string Successful Response
     * @throws ApiError
     */
    public getOauthUrlConnectionsOauthStartPost(
        requestBody: ConnectionResourceRequestData,
    ): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/connections/oauth/start',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Connection From Callback
     * Create a new connection from an OAuth callback.
     *
     * This endpoint is used to create a new connection for providers that use the OAuth protocol. The OAuth
     * flow is initialized by the stack frontend, where the user is redirected to the provider's authorization
     * page. Once the user authorizes the application, they are redirected back to the stack frontend with
     * a code parameter. This code is then sent to this endpoint, which uses it to create a new connection
     * for said provider completing the OAuth flow.
     * @param code
     * @param requestBody
     * @returns ConnectionCard Successful Response
     * @throws ApiError
     */
    public createConnectionFromCallbackConnectionsOauthCallbackPost(
        code: string,
        requestBody: ConnectionResourceRequestData,
    ): CancelablePromise<ConnectionCard> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/connections/oauth/callback',
            query: {
                'code': code,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
