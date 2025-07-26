/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResumeRequest } from '../models/ResumeRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class WorkflowService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Resume
     * Resume a paused workflow execution.
     * @param runId
     * @param projectId
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public resumeWorkflowV1ProjectIdRunRunIdResumePost(
        runId: string,
        projectId: string,
        requestBody: ResumeRequest,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/workflow/v1/{project_id}/run/{run_id}/resume',
            path: {
                'run_id': runId,
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
