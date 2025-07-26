/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeedbackAPIParams } from '../models/FeedbackAPIParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class RunFlowService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Run Deployed Flow
     * Run a flow and get the result.
     * @param orgId
     * @param flowId The flow ID. [Learn how to get it](/docs/api-reference/how-to-get-flow-id).
     * @param requestBody
     * @param version Version of the flow
     * @param verbose Return the full model
     * @returns any Successful Response
     * @throws ApiError
     */
    public runDeployedFlowInferenceV0RunOrgIdFlowIdPost(
        orgId: string,
        flowId: string,
        requestBody: Record<string, any>,
        version: number = -1,
        verbose: boolean = true,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/inference/v0/run/{org_id}/{flow_id}',
            path: {
                'org_id': orgId,
                'flow_id': flowId,
            },
            query: {
                'version': version,
                'verbose': verbose,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Stream Deployed Flow
     * Run a flow and get the result streamed while the flow is running.
     * @param orgId
     * @param flowId The flow ID. [Learn how to get it](/docs/api-reference/how-to-get-flow-id).
     * @param requestBody
     * @param version Version of the flow. -1 for the latest published version.
     * @param prefix Add a prefix to the output
     * @param delta Stream deltas instead of full output
     * @param sse Use server sent events instead of streaming response
     * @param verbose Return the full model
     * @param runDraft Run the draft version of the flow instead of the published one.
     * @returns any Successful Response
     * @throws ApiError
     */
    public streamDeployedFlowInferenceV0StreamOrgIdFlowIdPost(
        orgId: string,
        flowId: string,
        requestBody: Record<string, any>,
        version: number = -1,
        prefix: boolean = false,
        delta: boolean = true,
        sse: boolean = false,
        verbose: boolean = true,
        runDraft: boolean = false,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/inference/v0/stream/{org_id}/{flow_id}',
            path: {
                'org_id': orgId,
                'flow_id': flowId,
            },
            query: {
                'version': version,
                'prefix': prefix,
                'delta': delta,
                'sse': sse,
                'verbose': verbose,
                'run_draft': runDraft,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Stream Deployed Flow With Sso
     * Run a flow and get the result streamed while the flow is running.
     * @param orgId The organization ID. [Learn how to get it](/docs/api-reference/how-to-get-credentials).
     * @param flowId The flow ID. [Learn how to get it](/docs/api-reference/how-to-get-flow-id).
     * @param token Token for authorization
     * @param requestBody
     * @param version Version of the flow. -1 for the latest published version.
     * @param prefix Add a prefix to the output
     * @param delta Stream deltas instead of full output
     * @param sse Use server sent events instead of streaming response
     * @param verbose Return the full model
     * @param runDraft Run the draft version of the flow instead of the published one.
     * @returns any Successful Response
     * @throws ApiError
     */
    public streamDeployedFlowWithSsoInferenceV0SsoStreamOrgIdFlowIdPost(
        orgId: string,
        flowId: string,
        token: string,
        requestBody: Record<string, any>,
        version: number = -1,
        prefix: boolean = false,
        delta: boolean = true,
        sse: boolean = false,
        verbose: boolean = true,
        runDraft: boolean = false,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/inference/v0/sso/stream/{org_id}/{flow_id}',
            path: {
                'org_id': orgId,
                'flow_id': flowId,
            },
            query: {
                'version': version,
                'prefix': prefix,
                'delta': delta,
                'sse': sse,
                'verbose': verbose,
                'run_draft': runDraft,
                'token': token,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Give Feedback
     * Send a feedback message for a given run.
     * @param flowId The flow ID. [Learn how to get it](/docs/api-reference/how-to-get-flow-id).
     * @param orgId
     * @param requestBody
     * @returns number Successful Response
     * @throws ApiError
     */
    public giveFeedbackInferenceV0FeedbackOrgIdFlowIdPost(
        flowId: string,
        orgId: string,
        requestBody: FeedbackAPIParams,
    ): CancelablePromise<Record<string, number>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/inference/v0/feedback/{org_id}/{flow_id}',
            path: {
                'flow_id': flowId,
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
