/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_upload_to_user_bucket_documents__org_id___flow_id___node_id___user_id__post } from '../models/Body_upload_to_user_bucket_documents__org_id___flow_id___node_id___user_id__post';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DocumentsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Upload To User Bucket
     * Upload the file to the user bucket for a document node.
     * @param orgId The organization ID
     * @param userId The user ID
     * @param flowId The flow ID of the document
     * @param nodeId The node ID of the document
     * @param formData
     * @returns any Successful Response
     * @throws ApiError
     */
    public uploadToUserBucketDocumentsOrgIdFlowIdNodeIdUserIdPost(
        orgId: string,
        userId: string,
        flowId: string,
        nodeId: string,
        formData?: Body_upload_to_user_bucket_documents__org_id___flow_id___node_id___user_id__post,
    ): CancelablePromise<Record<string, any>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/documents/{org_id}/{flow_id}/{node_id}/{user_id}',
            path: {
                'org_id': orgId,
                'user_id': userId,
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
     * Delete From User Bucket
     * Delete the file from the user bucket.
     * @param orgId The organization ID
     * @param userId The user ID
     * @param flowId The flow ID of the document
     * @param nodeId The node ID of the document
     * @param filename
     * @returns boolean Successful Response
     * @throws ApiError
     */
    public deleteFromUserBucketDocumentsOrgIdFlowIdNodeIdUserIdDelete(
        orgId: string,
        userId: string,
        flowId: string,
        nodeId: string,
        filename: string,
    ): CancelablePromise<Record<string, boolean>> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/documents/{org_id}/{flow_id}/{node_id}/{user_id}',
            path: {
                'org_id': orgId,
                'user_id': userId,
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
     * List Files In User Bucket
     * List the files in the user bucket.
     * @param orgId The organization ID
     * @param userId The user ID
     * @param flowId The flow ID of the document
     * @param nodeId The node ID of the document
     * @returns string Successful Response
     * @throws ApiError
     */
    public listFilesInUserBucketDocumentsOrgIdFlowIdNodeIdUserIdGet(
        orgId: string,
        userId: string,
        flowId: string,
        nodeId: string,
    ): CancelablePromise<Array<string>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/documents/{org_id}/{flow_id}/{node_id}/{user_id}',
            path: {
                'org_id': orgId,
                'user_id': userId,
                'flow_id': flowId,
                'node_id': nodeId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Download From User Bucket
     * Download the file from the user bucket.
     * @param orgId The organization ID
     * @param userId The user ID
     * @param flowId The flow ID of the document
     * @param nodeId The node ID of the document
     * @param filename
     * @returns any Successful Response
     * @throws ApiError
     */
    public downloadFromUserBucketDocumentsOrgIdFlowIdNodeIdUserIdFileGet(
        orgId: string,
        userId: string,
        flowId: string,
        nodeId: string,
        filename: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/documents/{org_id}/{flow_id}/{node_id}/{user_id}/file',
            path: {
                'org_id': orgId,
                'user_id': userId,
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
}
