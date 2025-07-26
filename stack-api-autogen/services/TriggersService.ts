/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProjectTrigger } from '../models/ProjectTrigger';
import type { ProjectTriggerCreate } from '../models/ProjectTriggerCreate';
import type { TriggerDefinition } from '../models/TriggerDefinition';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class TriggersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Triggers
     * @param projectId
     * @returns ProjectTrigger Successful Response
     * @throws ApiError
     */
    public getTriggersProjectsProjectIdTriggersGet(
        projectId: string,
    ): CancelablePromise<Array<ProjectTrigger>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/projects/{project_id}/triggers',
            path: {
                'project_id': projectId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Trigger
     * @param projectId
     * @param requestBody
     * @returns ProjectTrigger Successful Response
     * @throws ApiError
     */
    public createTriggerProjectsProjectIdTriggersPost(
        projectId: string,
        requestBody: ProjectTriggerCreate,
    ): CancelablePromise<ProjectTrigger> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/projects/{project_id}/triggers',
            path: {
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Trigger
     * @param projectTriggerId
     * @returns ProjectTrigger Successful Response
     * @throws ApiError
     */
    public getTriggerTriggersProjectTriggerIdGet(
        projectTriggerId: string,
    ): CancelablePromise<ProjectTrigger> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/triggers/{project_trigger_id}',
            path: {
                'project_trigger_id': projectTriggerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Trigger
     * @param projectTriggerId
     * @returns void
     * @throws ApiError
     */
    public deleteTriggerTriggersProjectTriggerIdDelete(
        projectTriggerId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/triggers/{project_trigger_id}',
            path: {
                'project_trigger_id': projectTriggerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Enable Trigger
     * @param projectTriggerId
     * @returns any Successful Response
     * @throws ApiError
     */
    public enableTriggerTriggersProjectTriggerIdEnablePost(
        projectTriggerId: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/triggers/{project_trigger_id}/enable',
            path: {
                'project_trigger_id': projectTriggerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Disable Trigger
     * @param projectTriggerId
     * @returns any Successful Response
     * @throws ApiError
     */
    public disableTriggerTriggersProjectTriggerIdDisablePost(
        projectTriggerId: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/triggers/{project_trigger_id}/disable',
            path: {
                'project_trigger_id': projectTriggerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Available Triggers By Provider
     * Get the list of native triggers available and implemented by Stack AI.
     * @param providerId
     * @returns TriggerDefinition Successful Response
     * @throws ApiError
     */
    public getAvailableTriggersByProviderProvidersProviderIdTriggersGet(
        providerId: string,
    ): CancelablePromise<Array<TriggerDefinition>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/providers/{provider_id}/triggers',
            path: {
                'provider_id': providerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Specific Trigger From Provider
     * Get the data for a specific native trigger available and implemented by Stack AI.
     * @param providerId
     * @param triggerId
     * @returns TriggerDefinition Successful Response
     * @throws ApiError
     */
    public getSpecificTriggerFromProviderProvidersProviderIdTriggersTriggerIdGet(
        providerId: string,
        triggerId: string,
    ): CancelablePromise<TriggerDefinition> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/providers/{provider_id}/triggers/{trigger_id}/',
            path: {
                'provider_id': providerId,
                'trigger_id': triggerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Webhook Trigger
     * @param projectTriggerId
     * @param apiKey
     * @param orgId
     * @param triggerId
     * @param providerId
     * @returns any Successful Response
     * @throws ApiError
     */
    public webhookTriggerOrganizationsOrgIdTriggersProjectTriggerIdWebhookKeyApiKeyPost(
        projectTriggerId: string,
        apiKey: string,
        orgId: string,
        triggerId?: (string | null),
        providerId?: (string | null),
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/organizations/{org_id}/triggers/{project_trigger_id}/webhook/key/{api_key}',
            path: {
                'project_trigger_id': projectTriggerId,
                'api_key': apiKey,
                'org_id': orgId,
            },
            query: {
                'trigger_id': triggerId,
                'provider_id': providerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Webhook Trigger Deprecated
     * @param projectTriggerId
     * @param apiKey
     * @param orgId
     * @param triggerId
     * @param providerId
     * @returns any Successful Response
     * @throws ApiError
     */
    public webhookTriggerDeprecatedOrganizationsOrgIdTriggersProjectTriggerIdWebookKeyApiKeyPost(
        projectTriggerId: string,
        apiKey: string,
        orgId: string,
        triggerId?: (string | null),
        providerId?: (string | null),
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/organizations/{org_id}/triggers/{project_trigger_id}/webook/key/{api_key}',
            path: {
                'project_trigger_id': projectTriggerId,
                'api_key': apiKey,
                'org_id': orgId,
            },
            query: {
                'trigger_id': triggerId,
                'provider_id': providerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Polling Trigger
     * @param projectTriggerId
     * @param apiKey
     * @param orgId
     * @returns any Successful Response
     * @throws ApiError
     */
    public pollingTriggerOrganizationsOrgIdTriggersProjectTriggerIdPollingKeyApiKeyPost(
        projectTriggerId: string,
        apiKey: string,
        orgId: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/organizations/{org_id}/triggers/{project_trigger_id}/polling/key/{api_key}',
            path: {
                'project_trigger_id': projectTriggerId,
                'api_key': apiKey,
                'org_id': orgId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Scheduled Trigger
     * @param projectTriggerId
     * @param apiKey
     * @param orgId
     * @returns any Successful Response
     * @throws ApiError
     */
    public scheduledTriggerOrganizationsOrgIdTriggersProjectTriggerIdScheduledKeyApiKeyPost(
        projectTriggerId: string,
        apiKey: string,
        orgId: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/organizations/{org_id}/triggers/{project_trigger_id}/scheduled/key/{api_key}',
            path: {
                'project_trigger_id': projectTriggerId,
                'api_key': apiKey,
                'org_id': orgId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
