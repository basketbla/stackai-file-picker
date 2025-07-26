/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CursorPaginated_Union_StackFile__StackDirectory__ } from '../models/CursorPaginated_Union_StackFile__StackDirectory__';
import type { StackDirectory } from '../models/StackDirectory';
import type { StackFile } from '../models/StackFile';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ResourcesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
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
