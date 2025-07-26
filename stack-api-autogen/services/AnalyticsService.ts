/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProjectRunSummary } from '../models/ProjectRunSummary';
import type { StorageUsageResponse } from '../models/StorageUsageResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AnalyticsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Analytics Data Api
     * List with the flow run logs matching the given filters.
     * @param flowId
     * @param orgId
     * @param page
     * @param pageSize
     * @param startDate
     * @param endDate
     * @returns ProjectRunSummary Successful Response
     * @throws ApiError
     */
    public getAnalyticsDataApiAnalyticsOrgOrgIdFlowsFlowIdGet(
        flowId: string,
        orgId: string,
        page?: number,
        pageSize: number = 25,
        startDate?: (string | null),
        endDate?: (string | null),
    ): CancelablePromise<Array<ProjectRunSummary>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/analytics/org/{org_id}/flows/{flow_id}',
            path: {
                'flow_id': flowId,
                'org_id': orgId,
            },
            query: {
                'page': page,
                'page_size': pageSize,
                'start_date': startDate,
                'end_date': endDate,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Storage Usage
     * @returns any Successful Response
     * @throws ApiError
     */
    public getStorageUsageAnalyticsStorageTotalUsageGet(): CancelablePromise<(StorageUsageResponse | null)> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/analytics/storage/total-usage',
        });
    }
}
