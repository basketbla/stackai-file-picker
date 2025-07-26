/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FormLogResponse } from '../models/FormLogResponse';
import type { FormLogSummariesResponse } from '../models/FormLogSummariesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class FormService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Form Log Summaries
     * Get form submission log summaries for a specific user.
     *
     * This endpoint returns lightweight summaries without the potentially large input/output data.
     *
     * Args:
     * project_id (str): The ID of the flow/form
     * user_id (str): The ID of the user whose logs to retrieve
     * org_id (str): The organization ID
     * page (int): The page number to retrieve
     * page_size (int): The number of logs per page
     * service (FormService): The form service instance
     *
     * Returns:
     * A FormLogSummariesResponse object containing metadata about the user's form submissions
     * @param orgId
     * @param projectId The ID of the flow/form
     * @param userId The ID of the user whose logs to retrieve
     * @param page The page number to retrieve
     * @param pageSize The number of logs per page
     * @returns FormLogSummariesResponse Successful Response
     * @throws ApiError
     */
    public getFormLogSummariesFormOrgOrgIdLogsSummariesGet(
        orgId: string,
        projectId: string,
        userId: string,
        page?: number,
        pageSize: number = 30,
    ): CancelablePromise<FormLogSummariesResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/form/org/{org_id}/logs/summaries',
            path: {
                'org_id': orgId,
            },
            query: {
                'project_id': projectId,
                'user_id': userId,
                'page': page,
                'page_size': pageSize,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Form Log By Id
     * Get a detailed form submission log by its ID.
     *
     * This endpoint returns the full log including the potentially large input/output data.
     *
     * Args:
     * run_id (str): The ID of the run to retrieve
     * project_id (str): The ID of the flow/form
     * org_id (str): The organization ID
     * service (FormService): The form service instance
     *
     * Returns:
     * A FormLogResponse object containing the details of the form submission
     * @param runId The ID of the run to retrieve
     * @param orgId
     * @param projectId The ID of the flow/form
     * @returns FormLogResponse Successful Response
     * @throws ApiError
     */
    public getFormLogByIdFormOrgOrgIdLogsRunIdGet(
        runId: string,
        orgId: string,
        projectId: string,
    ): CancelablePromise<FormLogResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/form/org/{org_id}/logs/{run_id}',
            path: {
                'run_id': runId,
                'org_id': orgId,
            },
            query: {
                'project_id': projectId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
