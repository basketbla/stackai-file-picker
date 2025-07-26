/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AvailableConnection } from '../models/AvailableConnection';
import type { Connection } from '../models/Connection';
import type { ConnectionCard } from '../models/ConnectionCard';
import type { ConnectionResourceRequestData } from '../models/ConnectionResourceRequestData';
import type { CursorPaginated_Union_StackFile__StackDirectory__ } from '../models/CursorPaginated_Union_StackFile__StackDirectory__';
import type { StackDirectory } from '../models/StackDirectory';
import type { StackFile } from '../models/StackFile';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ConnectionsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Available Connections
     * List all available connections that can be configured.
     *
     * Returns a list of available connection types with their configuration parameters.
     * @returns AvailableConnection Successful Response
     * @throws ApiError
     */
    public getAvailableConnectionsConnectionsAvailableGet(): CancelablePromise<Array<AvailableConnection>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/connections/available',
        });
    }
    /**
     * Get Connections
     * List all available connections for the user in his current organization.
     * @param connectionProvider
     * @param limit
     * @param offset
     * @returns ConnectionCard Successful Response
     * @throws ApiError
     */
    public getConnectionsConnectionsGet(
        connectionProvider?: (string | null),
        limit: number = 100,
        offset?: number,
    ): CancelablePromise<Array<ConnectionCard>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/connections',
            query: {
                'connection_provider': connectionProvider,
                'limit': limit,
                'offset': offset,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Connection
     * Create a new connection. The connection will be created in the user's current organization.
     * @param requestBody
     * @returns ConnectionCard Successful Response
     * @throws ApiError
     */
    public createConnectionConnectionsPost(
        requestBody: ConnectionResourceRequestData,
    ): CancelablePromise<ConnectionCard> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/connections',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Connection By Id
     * Retrieve a connection by its ID.
     * @param connectionId
     * @param refreshOauthTokens
     * @returns Connection Successful Response
     * @throws ApiError
     */
    public getConnectionByIdConnectionsConnectionIdGet(
        connectionId: string,
        refreshOauthTokens: boolean = false,
    ): CancelablePromise<Connection> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/connections/{connection_id}',
            path: {
                'connection_id': connectionId,
            },
            query: {
                'refresh_oauth_tokens': refreshOauthTokens,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Connection
     * Update the connection with the given id.
     * @param connectionId
     * @param requestBody
     * @returns ConnectionCard Successful Response
     * @throws ApiError
     */
    public updateConnectionConnectionsConnectionIdPut(
        connectionId: string,
        requestBody: ConnectionResourceRequestData,
    ): CancelablePromise<ConnectionCard> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/connections/{connection_id}',
            path: {
                'connection_id': connectionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Connection
     * Delete a connection given its ID.
     * @param connectionId
     * @returns void
     * @throws ApiError
     */
    public deleteConnectionConnectionsConnectionIdDelete(
        connectionId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/connections/{connection_id}',
            path: {
                'connection_id': connectionId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Connection Health
     * Check the health of a connection.
     * @param connectionId
     * @param refreshOauthTokens
     * @returns any Successful Response
     * @throws ApiError
     */
    public getConnectionHealthConnectionsConnectionIdHealthGet(
        connectionId: string,
        refreshOauthTokens: boolean = false,
    ): CancelablePromise<Record<string, any>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/connections/{connection_id}/health',
            path: {
                'connection_id': connectionId,
            },
            query: {
                'refresh_oauth_tokens': refreshOauthTokens,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Share With Org
     * Share the connection with the current organization.
     * @param connectionId
     * @param share
     * @param refreshOauthTokens
     * @returns Connection Successful Response
     * @throws ApiError
     */
    public shareWithOrgConnectionsConnectionIdShareWithCurrentOrgPatch(
        connectionId: string,
        share: boolean,
        refreshOauthTokens: boolean = false,
    ): CancelablePromise<Connection> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/connections/{connection_id}/share-with-current-org',
            path: {
                'connection_id': connectionId,
            },
            query: {
                'share': share,
                'refresh_oauth_tokens': refreshOauthTokens,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
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
    /**
     * Get Connection Resources
     * Get the resources associated with a connection.
     *
     * This endpoint returns the information for the selected resource in the connection.
     * @param connectionId
     * @param resourceIds
     * @param refreshOauthTokens
     * @returns any Successful Response
     * @throws ApiError
     */
    public getConnectionResourcesConnectionsConnectionIdResourcesGet(
        connectionId: string,
        resourceIds?: Array<string>,
        refreshOauthTokens: boolean = false,
    ): CancelablePromise<Record<string, (StackFile | StackDirectory | null)>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/connections/{connection_id}/resources',
            path: {
                'connection_id': connectionId,
            },
            query: {
                'resource_ids': resourceIds,
                'refresh_oauth_tokens': refreshOauthTokens,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Children Resources
     * Get the children of a resource associated with a connection.
     *
     * This endpoint can be used to navigate the resources in the connection. If no resource_id is provided, it will return
     * the list of resources at the root of the connection. If a resource_id is provided, it will return the children of
     * that resource. If the resource_id corresponds to a file, an empty list will be returned.
     * @param connectionId
     * @param resourceId
     * @param cursor Optional identifier for the page that should be returned. If it is not provided, the first page will be returned.
     * @param pageSize Number of items to be returned in the page.
     * @param refreshOauthTokens
     * @returns CursorPaginated_Union_StackFile__StackDirectory__ Successful Response
     * @throws ApiError
     */
    public getChildrenResourcesConnectionsConnectionIdResourcesChildrenGet(
        connectionId: string,
        resourceId?: (string | null),
        cursor?: (string | null),
        pageSize: number = 50,
        refreshOauthTokens: boolean = false,
    ): CancelablePromise<CursorPaginated_Union_StackFile__StackDirectory__> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/connections/{connection_id}/resources/children',
            path: {
                'connection_id': connectionId,
            },
            query: {
                'resource_id': resourceId,
                'cursor': cursor,
                'page_size': pageSize,
                'refresh_oauth_tokens': refreshOauthTokens,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Search Connection Resources
     * Search for resources in the connection that match the query.
     * @param connectionId
     * @param query Search query string
     * @param cursor Optional identifier for the page that should be returned. If it is not provided, the first page will be returned.
     * @param pageSize Number of items to be returned in the page.
     * @param refreshOauthTokens
     * @returns CursorPaginated_Union_StackFile__StackDirectory__ Successful Response
     * @throws ApiError
     */
    public searchConnectionResourcesConnectionsConnectionIdResourcesSearchGet(
        connectionId: string,
        query: string,
        cursor?: (string | null),
        pageSize: number = 50,
        refreshOauthTokens: boolean = false,
    ): CancelablePromise<CursorPaginated_Union_StackFile__StackDirectory__> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/connections/{connection_id}/resources/search',
            path: {
                'connection_id': connectionId,
            },
            query: {
                'query': query,
                'cursor': cursor,
                'page_size': pageSize,
                'refresh_oauth_tokens': refreshOauthTokens,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
