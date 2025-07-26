/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrganizationPrompt } from '../models/OrganizationPrompt';
import type { OrganizationPromptCreate } from '../models/OrganizationPromptCreate';
import type { OrganizationPromptUpdate } from '../models/OrganizationPromptUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class OrganizationPromptsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Prompt
     * Get a single organization prompt by from its prompt id.
     * @param orgId
     * @param promptId
     * @returns OrganizationPrompt Successful Response
     * @throws ApiError
     */
    public getPromptApiV1OrganizationsOrgIdPromptsPromptIdGet(
        orgId: string,
        promptId: string,
    ): CancelablePromise<OrganizationPrompt> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/organizations/{org_id}/prompts/{prompt_id}',
            path: {
                'org_id': orgId,
                'prompt_id': promptId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Prompt
     * Update an existing organization prompt.
     * @param orgId
     * @param promptId
     * @param requestBody
     * @returns OrganizationPrompt Successful Response
     * @throws ApiError
     */
    public updatePromptApiV1OrganizationsOrgIdPromptsPromptIdPut(
        orgId: string,
        promptId: string,
        requestBody: OrganizationPromptUpdate,
    ): CancelablePromise<OrganizationPrompt> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/organizations/{org_id}/prompts/{prompt_id}',
            path: {
                'org_id': orgId,
                'prompt_id': promptId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Prompt
     * Delete an organization prompt.
     * @param orgId
     * @param promptId
     * @returns void
     * @throws ApiError
     */
    public deletePromptApiV1OrganizationsOrgIdPromptsPromptIdDelete(
        orgId: string,
        promptId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/organizations/{org_id}/prompts/{prompt_id}',
            path: {
                'org_id': orgId,
                'prompt_id': promptId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * List Prompts
     * List all prompts for the user's organization.
     * @param orgId
     * @returns OrganizationPrompt Successful Response
     * @throws ApiError
     */
    public listPromptsApiV1OrganizationsOrgIdPromptsGet(
        orgId: string,
    ): CancelablePromise<Array<OrganizationPrompt>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/organizations/{org_id}/prompts/',
            path: {
                'org_id': orgId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Prompt
     * Create a new prompt within the user's organization.
     * @param orgId
     * @param requestBody
     * @returns OrganizationPrompt Successful Response
     * @throws ApiError
     */
    public createPromptApiV1OrganizationsOrgIdPromptsPost(
        orgId: string,
        requestBody: OrganizationPromptCreate,
    ): CancelablePromise<OrganizationPrompt> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/organizations/{org_id}/prompts/',
            path: {
                'org_id': orgId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
