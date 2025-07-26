/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StorageUsageResponse } from '../models/StorageUsageResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class StorageService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
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
