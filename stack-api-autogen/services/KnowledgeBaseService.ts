/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_upload_documents_indexing_v0_documents__flow_id___org_id___node_id__post } from '../models/Body_upload_documents_indexing_v0_documents__flow_id___org_id___node_id__post';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class KnowledgeBaseService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List Knowledge Base
     * List all the information uploaded to the knowledge base, including files, websites and data.
     * @param orgId The organization ID. [Learn how to get it](/docs/api-reference/how-to-get-credentials).
     * @param flowId The flow ID. [Learn how to get it](/docs/api-reference/how-to-get-flow-id).
     * @param nodeId The node ID. [Learn how to get it](/docs/api-reference/how-to-get-node-id).
     * @returns string Successful Response
     * @throws ApiError
     */
    public listIndexingV0FlowIdOrgIdNodeIdGet(
        orgId: string,
        flowId: string,
        nodeId: string,
    ): CancelablePromise<Array<string>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/indexing/v0/{flow_id}/{org_id}/{node_id}',
            path: {
                'org_id': orgId,
                'flow_id': flowId,
                'node_id': nodeId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Knowledge Base
     * Deletes selected information from the knowledge base, including files, websites and data.
     * @param orgId The organization ID. [Learn how to get it](/docs/api-reference/how-to-get-credentials).
     * @param flowId The flow ID. [Learn how to get it](/docs/api-reference/how-to-get-flow-id).
     * @param nodeId The node ID. [Learn how to get it](/docs/api-reference/how-to-get-node-id).
     * @param requestBody
     * @returns string Successful Response
     * @throws ApiError
     */
    public deleteIndexingV0FlowIdOrgIdNodeIdDelete(
        orgId: string,
        flowId: string,
        nodeId: string,
        requestBody: Array<string>,
    ): CancelablePromise<Array<string>> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/indexing/v0/{flow_id}/{org_id}/{node_id}',
            path: {
                'org_id': orgId,
                'flow_id': flowId,
                'node_id': nodeId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Upload Documents
     * Uploads documents to the knowledge base.
     * @param orgId The organization ID. [Learn how to get it](/docs/api-reference/how-to-get-credentials).
     * @param flowId The flow ID. [Learn how to get it](/docs/api-reference/how-to-get-flow-id).
     * @param nodeId The node ID. [Learn how to get it](/docs/api-reference/how-to-get-node-id).
     * @param formData
     * @returns any Successful Response
     * @throws ApiError
     */
    public uploadDocumentsIndexingV0DocumentsFlowIdOrgIdNodeIdPost(
        orgId: string,
        flowId: string,
        nodeId: string,
        formData: Body_upload_documents_indexing_v0_documents__flow_id___org_id___node_id__post,
    ): CancelablePromise<Record<string, any>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/indexing/v0/documents/{flow_id}/{org_id}/{node_id}',
            path: {
                'org_id': orgId,
                'flow_id': flowId,
                'node_id': nodeId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get File Binary
     * List all the documents uploaded to the knowledge base.
     * @param orgId The organization ID. [Learn how to get it](/docs/api-reference/how-to-get-credentials).
     * @param flowId The flow ID. [Learn how to get it](/docs/api-reference/how-to-get-flow-id).
     * @param nodeId The node ID. [Learn how to get it](/docs/api-reference/how-to-get-node-id).
     * @param filename Name of the file to de-index
     * @returns any Successful Response
     * @throws ApiError
     */
    public getFileBinaryIndexingV0DocumentsFlowIdOrgIdNodeIdGet(
        orgId: string,
        flowId: string,
        nodeId: string,
        filename?: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/indexing/v0/documents/{flow_id}/{org_id}/{node_id}',
            path: {
                'org_id': orgId,
                'flow_id': flowId,
                'node_id': nodeId,
            },
            query: {
                'filename': filename,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Documents
     * Updates existing documents in the knowledge base.
     * @param orgId The organization ID. [Learn how to get it](/docs/api-reference/how-to-get-credentials).
     * @param flowId The flow ID. [Learn how to get it](/docs/api-reference/how-to-get-flow-id).
     * @param nodeId The node ID. [Learn how to get it](/docs/api-reference/how-to-get-node-id).
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public updateDocumentsIndexingV0DocumentsFlowIdOrgIdNodeIdPatch(
        orgId: string,
        flowId: string,
        nodeId: string,
        requestBody: Array<Blob>,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/indexing/v0/documents/{flow_id}/{org_id}/{node_id}',
            path: {
                'org_id': orgId,
                'flow_id': flowId,
                'node_id': nodeId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Upload Websites
     * Uploads websites to the knowledge base.
     * @param orgId The organization ID. [Learn how to get it](/docs/api-reference/how-to-get-credentials).
     * @param flowId The flow ID. [Learn how to get it](/docs/api-reference/how-to-get-flow-id).
     * @param nodeId The node ID. [Learn how to get it](/docs/api-reference/how-to-get-node-id).
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public uploadWebsitesIndexingV0UrlsFlowIdOrgIdNodeIdPost(
        orgId: string,
        flowId: string,
        nodeId: string,
        requestBody: Array<string>,
    ): CancelablePromise<Record<string, any>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/indexing/v0/urls/{flow_id}/{org_id}/{node_id}',
            path: {
                'org_id': orgId,
                'flow_id': flowId,
                'node_id': nodeId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Websites
     * Updates existing websites to the knowledge base.
     * @param orgId The organization ID. [Learn how to get it](/docs/api-reference/how-to-get-credentials).
     * @param flowId The flow ID. [Learn how to get it](/docs/api-reference/how-to-get-flow-id).
     * @param nodeId The node ID. [Learn how to get it](/docs/api-reference/how-to-get-node-id).
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public updateWebsitesIndexingV0UrlsFlowIdOrgIdNodeIdPatch(
        orgId: string,
        flowId: string,
        nodeId: string,
        requestBody: Array<string>,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/indexing/v0/urls/{flow_id}/{org_id}/{node_id}',
            path: {
                'org_id': orgId,
                'flow_id': flowId,
                'node_id': nodeId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Upload Data
     * Upload raw string-like data to the knowledge base.
     * @param orgId The organization ID. [Learn how to get it](/docs/api-reference/how-to-get-credentials).
     * @param flowId The flow ID. [Learn how to get it](/docs/api-reference/how-to-get-flow-id).
     * @param nodeId The node ID. [Learn how to get it](/docs/api-reference/how-to-get-node-id).
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public uploadDataIndexingV0DataFlowIdOrgIdNodeIdPost(
        orgId: string,
        flowId: string,
        nodeId: string,
        requestBody: Array<Record<string, any>>,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/indexing/v0/data/{flow_id}/{org_id}/{node_id}',
            path: {
                'org_id': orgId,
                'flow_id': flowId,
                'node_id': nodeId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Data
     * Update existing data in the knowledge base.
     * @param orgId The organization ID. [Learn how to get it](/docs/api-reference/how-to-get-credentials).
     * @param flowId The flow ID. [Learn how to get it](/docs/api-reference/how-to-get-flow-id).
     * @param nodeId The node ID. [Learn how to get it](/docs/api-reference/how-to-get-node-id).
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public updateDataIndexingV0DataFlowIdOrgIdNodeIdPatch(
        orgId: string,
        flowId: string,
        nodeId: string,
        requestBody: Array<Record<string, any>>,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/indexing/v0/data/{flow_id}/{org_id}/{node_id}',
            path: {
                'org_id': orgId,
                'flow_id': flowId,
                'node_id': nodeId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
