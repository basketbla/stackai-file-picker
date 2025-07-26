/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AgentBuilderRequest } from '../models/AgentBuilderRequest';
import type { ProjectUpdateResult } from '../models/ProjectUpdateResult';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AgentBuilderService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Post Agent Builder Public
     * Create a new project from the given template on the selected path.
     * @param orgId
     * @param userId
     * @param folderId
     * @param projectName
     * @returns ProjectUpdateResult Successful Response
     * @throws ApiError
     */
    public postAgentBuilderPublicAgentBuilderOrgOrgIdFlowPost(
        orgId: string,
        userId: string,
        folderId?: (string | null),
        projectName?: (string | null),
    ): CancelablePromise<ProjectUpdateResult> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/agent-builder/org/{org_id}/flow',
            path: {
                'org_id': orgId,
            },
            query: {
                'user_id': userId,
                'folder_id': folderId,
                'project_name': projectName,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Patch Agent Builder Public
     * Update agent builder and publish changes.
     * @param orgId
     * @param flowId
     * @param userId
     * @param requestBody
     * @returns ProjectUpdateResult Successful Response
     * @throws ApiError
     */
    public patchAgentBuilderPublicAgentBuilderOrgOrgIdFlowFlowIdPatch(
        orgId: string,
        flowId: string,
        userId: string,
        requestBody: AgentBuilderRequest,
    ): CancelablePromise<ProjectUpdateResult> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/agent-builder/org/{org_id}/flow/{flow_id}',
            path: {
                'org_id': orgId,
                'flow_id': flowId,
            },
            query: {
                'user_id': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Agent Builder Public
     * @param orgId
     * @param flowId
     * @returns any Successful Response
     * @throws ApiError
     */
    public deleteAgentBuilderPublicAgentBuilderOrgOrgIdFlowFlowIdDelete(
        orgId: string,
        flowId: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/agent-builder/org/{org_id}/flow/{flow_id}',
            path: {
                'org_id': orgId,
                'flow_id': flowId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
