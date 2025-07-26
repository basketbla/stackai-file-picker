/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateToolProviderSchema } from '../models/CreateToolProviderSchema';
import type { ToolProviderSchema } from '../models/ToolProviderSchema';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CustomToolsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Custom Tools
     * Get all custom tool providers for the user's organization.
     *
     * Args:
     * user_org: Current authenticated user
     * service: Custom tool service instance
     *
     * Returns:
     * List of custom tool providers
     * @returns ToolProviderSchema Successful Response
     * @throws ApiError
     */
    public getCustomToolsToolsCustomGet(): CancelablePromise<Array<ToolProviderSchema>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/tools/custom',
        });
    }
    /**
     * Create Custom Tool
     * Create a new custom tool provider.
     *
     * Args:
     * data: Provider creation data
     * service: Custom tool service instance
     * user_org: Current user's organization
     * user: Current user profile
     *
     * Returns:
     * Created custom tool provider
     * @param requestBody
     * @returns ToolProviderSchema Successful Response
     * @throws ApiError
     */
    public createCustomToolToolsCustomPost(
        requestBody: CreateToolProviderSchema,
    ): CancelablePromise<ToolProviderSchema> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/tools/custom',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Custom Tool
     * Update an existing custom tool provider.
     *
     * Args:
     * provider_id: Provider ID to update
     * data: Provider update data
     * service: Custom tool service instance
     * user_org: Current user's organization
     * user: Current user profile
     *
     * Returns:
     * Updated custom tool provider
     * @param providerId
     * @param requestBody
     * @returns ToolProviderSchema Successful Response
     * @throws ApiError
     */
    public updateCustomToolToolsCustomProviderIdPut(
        providerId: string,
        requestBody: CreateToolProviderSchema,
    ): CancelablePromise<ToolProviderSchema> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/tools/custom/{provider_id}',
            path: {
                'provider_id': providerId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Custom Tool
     * Delete a custom tool provider.
     *
     * Args:
     * provider_id: Provider ID to delete
     * user_org: Current user's organization
     * service: Custom tool service instance
     *
     * Returns:
     * None
     * @param providerId
     * @returns void
     * @throws ApiError
     */
    public deleteCustomToolToolsCustomProviderIdDelete(
        providerId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/tools/custom/{provider_id}',
            path: {
                'provider_id': providerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
