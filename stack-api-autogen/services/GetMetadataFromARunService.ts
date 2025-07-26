/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class GetMetadataFromARunService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Run From Id
     * Gets the logged metadata of a run.
     * @param orgId
     * @param flowId The flow ID. [Learn how to get it](/docs/api-reference/how-to-get-flow-id).
     * @param runId Run ID of the flow
     * @returns any Successful Response
     * @throws ApiError
     */
    public getRunFromIdInferenceV0RunOrgIdFlowIdMetadataGet(
        orgId: string,
        flowId: string,
        runId?: string,
    ): CancelablePromise<Record<string, any>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/inference/v0/run/{org_id}/{flow_id}/metadata',
            path: {
                'org_id': orgId,
                'flow_id': flowId,
            },
            query: {
                'run_id': runId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
