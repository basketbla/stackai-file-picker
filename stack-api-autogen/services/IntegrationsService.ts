/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConnectionIDWrapper } from '../models/ConnectionIDWrapper';
import type { PostgresData } from '../models/PostgresData';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class IntegrationsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Postgres Schema
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public getPostgresSchemaPostgresDescriptionPost(
        requestBody: (PostgresData | ConnectionIDWrapper),
    ): CancelablePromise<Record<string, any>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/postgres/description',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Provider Icon
     * Get the icon for a specific provider.
     * @param integration
     * @param iconName
     * @returns any Successful Response
     * @throws ApiError
     */
    public getProviderIconIntegrationsIntegrationIconIconNameGet(
        integration: string,
        iconName: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/integrations/{integration}/icon/{icon_name}',
            path: {
                'integration': integration,
                'icon_name': iconName,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
