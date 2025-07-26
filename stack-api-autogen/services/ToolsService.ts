/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActionSchema } from '../models/ActionSchema';
import type { CreateToolProviderSchema } from '../models/CreateToolProviderSchema';
import type { ToolConfigOption } from '../models/ToolConfigOption';
import type { ToolOptionsRequest } from '../models/ToolOptionsRequest';
import type { ToolProviderSchema } from '../models/ToolProviderSchema';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ToolsService {
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
    /**
     * Get Stackai Tools
     * Get all providers with tools created by StackAI's team.
     * @returns ToolProviderSchema Successful Response
     * @throws ApiError
     */
    public getStackaiToolsToolsStackaiGet(): CancelablePromise<Array<ToolProviderSchema>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/tools/stackai',
        });
    }
    /**
     * Get Stackai Providers
     * Get all providers with tools created by StackAI's team.
     * @returns any Successful Response
     * @throws ApiError
     */
    public getStackaiProvidersToolsStackaiActionsGet(): CancelablePromise<Array<Record<string, (string | Array<string>)>>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/tools/stackai/actions',
        });
    }
    /**
     * Get Action By Provider And Id
     * Get the data for a specific native action available and implemented by StackAI.
     * @param providerId
     * @param actionId
     * @returns ActionSchema Successful Response
     * @throws ApiError
     */
    public getActionByProviderAndIdToolsStackaiProvidersProviderIdActionsActionIdGet(
        providerId: string,
        actionId: string,
    ): CancelablePromise<ActionSchema> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/tools/stackai/providers/{provider_id}/actions/{action_id}',
            path: {
                'provider_id': providerId,
                'action_id': actionId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Action Inputs
     * Get the input parameters for an action as a JSON schema.
     * @param providerId
     * @param actionId
     * @returns any Successful Response
     * @throws ApiError
     */
    public getActionInputsToolsStackaiProvidersProviderIdActionsActionIdInputsGet(
        providerId: string,
        actionId: string,
    ): CancelablePromise<Record<string, any>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/tools/stackai/providers/{provider_id}/actions/{action_id}/inputs',
            path: {
                'provider_id': providerId,
                'action_id': actionId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Action Outputs
     * Get the output parameters for an action as a JSON schema.
     * @param providerId
     * @param actionId
     * @returns any Successful Response
     * @throws ApiError
     */
    public getActionOutputsToolsStackaiProvidersProviderIdActionsActionIdOutputsGet(
        providerId: string,
        actionId: string,
    ): CancelablePromise<Record<string, any>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/tools/stackai/providers/{provider_id}/actions/{action_id}/outputs',
            path: {
                'provider_id': providerId,
                'action_id': actionId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Provider Icon
     * Get the icon for a specific provider.
     * @param providerId
     * @returns any Successful Response
     * @throws ApiError
     */
    public getProviderIconToolsStackaiProviderIdIconGet(
        providerId: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/tools/stackai/{provider_id}/icon',
            path: {
                'provider_id': providerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Action Options
     * Get action options for a specific action and provider.
     *
     * Args:
     * options_request: Action and provider identifiers
     * user_organization: The user organization
     *
     * Returns:
     * List of schema strings for the action
     * @param requestBody
     * @returns ToolConfigOption Successful Response
     * @throws ApiError
     */
    public getActionOptionsToolsOptionsPost(
        requestBody: ToolOptionsRequest,
    ): CancelablePromise<Array<ToolConfigOption>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/tools/options',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
