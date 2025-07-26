/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActionSchema } from '../models/ActionSchema';
import type { ToolProviderSchema } from '../models/ToolProviderSchema';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class StackaiToolsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
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
}
