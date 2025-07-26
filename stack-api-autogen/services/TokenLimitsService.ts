/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTokenLimitRequest } from '../models/CreateTokenLimitRequest';
import type { UsageLimitMetadata } from '../models/UsageLimitMetadata';
import type { UsageLimitType } from '../models/UsageLimitType';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class TokenLimitsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List Token Limits
     * List token limits with optional filtering.
     * @param type Type of usage limit
     * @param page Page number for pagination
     * @param pageSize Number of items per page
     * @returns UsageLimitMetadata Successful Response
     * @throws ApiError
     */
    public listTokenLimitsTokenLimitsGet(
        type?: (UsageLimitType | null),
        page?: number,
        pageSize: number = 25,
    ): CancelablePromise<Array<UsageLimitMetadata>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/token-limits',
            query: {
                'type': type,
                'page': page,
                'page_size': pageSize,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Token Limit
     * Create a new token limit.
     * @param requestBody
     * @returns UsageLimitMetadata Successful Response
     * @throws ApiError
     */
    public createTokenLimitTokenLimitsPost(
        requestBody: CreateTokenLimitRequest,
    ): CancelablePromise<Array<UsageLimitMetadata>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/token-limits',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Token Limit
     * Permanently delete a token limit.
     * @param tokenResourceId
     * @param resourceType
     * @returns void
     * @throws ApiError
     */
    public deleteTokenLimitTokenLimitsTokenResourceIdDelete(
        tokenResourceId: string,
        resourceType: UsageLimitType,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/token-limits/{token_resource_id}',
            path: {
                'token_resource_id': tokenResourceId,
            },
            query: {
                'resource_type': resourceType,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
