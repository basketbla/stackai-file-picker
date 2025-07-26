/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../models/ApiResponse';
import type { CustomApiHttpRequest } from '../models/CustomApiHttpRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CustomApiService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Make Custom Api Request
     * Make a custom API request.
     *
     * Args:
     * request: The API request configuration
     * input_data: Optional input data for the request
     *
     * Returns:
     * The API response as either a string or dictionary
     *
     * Raises:
     * ValueError: If the URL is local network, headers are invalid JSON,
     * or input type is invalid
     * @param requestBody
     * @returns ApiResponse Successful Response
     * @throws ApiError
     */
    public makeCustomApiRequestCustomApiRequestPost(
        requestBody: CustomApiHttpRequest,
    ): CancelablePromise<ApiResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/custom-api/request',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
