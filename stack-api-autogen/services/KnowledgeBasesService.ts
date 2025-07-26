/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_create_resource_knowledge_bases__knowledge_base_id__resources_post } from '../models/Body_create_resource_knowledge_bases__knowledge_base_id__resources_post';
import type { CreateKnowledgeBaseRequest } from '../models/CreateKnowledgeBaseRequest';
import type { CronWebhook } from '../models/CronWebhook';
import type { CursorPaginated_Union_StackFile__StackDirectory__ } from '../models/CursorPaginated_Union_StackFile__StackDirectory__';
import type { FileMetadatasResponse } from '../models/FileMetadatasResponse';
import type { FileUserMetadataUpdateRequest } from '../models/FileUserMetadataUpdateRequest';
import type { KBMetadataSchemaResponse } from '../models/KBMetadataSchemaResponse';
import type { KnowledgeBaseData } from '../models/KnowledgeBaseData';
import type { KnowledgeBaseDataUpdate } from '../models/KnowledgeBaseDataUpdate';
import type { KnowledgeBaseRBA } from '../models/KnowledgeBaseRBA';
import type { ProjectMetadata } from '../models/ProjectMetadata';
import type { StackDirectory } from '../models/StackDirectory';
import type { StackFile } from '../models/StackFile';
import type { StackFileStatusEnum } from '../models/StackFileStatusEnum';
import type { UpdateKnowledgeBaseRBACRequest } from '../models/UpdateKnowledgeBaseRBACRequest';
import type { UpdateUserMetadataSchemaRequest } from '../models/UpdateUserMetadataSchemaRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class KnowledgeBasesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Knowledge Bases
     * List all available knowledge bases for the specified flow.
     * @returns KnowledgeBaseData Successful Response
     * @throws ApiError
     */
    public getKnowledgeBasesKnowledgeBasesGet(): CancelablePromise<Record<string, Array<KnowledgeBaseData>>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/knowledge_bases',
        });
    }
    /**
     * Create Knowledge Base
     * Create a new knowledge base.
     * @param requestBody
     * @returns KnowledgeBaseData Successful Response
     * @throws ApiError
     */
    public createKnowledgeBaseKnowledgeBasesPost(
        requestBody: CreateKnowledgeBaseRequest,
    ): CancelablePromise<KnowledgeBaseData> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/knowledge_bases',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Knowledge Base By Id
     * Get a knowledge base by its ID in the current organization.
     * @param knowledgeBaseId
     * @returns KnowledgeBaseData Successful Response
     * @throws ApiError
     */
    public getKnowledgeBaseByIdKnowledgeBasesKnowledgeBaseIdGet(
        knowledgeBaseId: string,
    ): CancelablePromise<KnowledgeBaseData> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/knowledge_bases/{knowledge_base_id}',
            path: {
                'knowledge_base_id': knowledgeBaseId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Knowledge Base
     * Update a knowledge base.
     * @param knowledgeBaseId
     * @param requestBody
     * @returns KnowledgeBaseData Successful Response
     * @throws ApiError
     */
    public updateKnowledgeBaseKnowledgeBasesKnowledgeBaseIdPut(
        knowledgeBaseId: string,
        requestBody: KnowledgeBaseDataUpdate,
    ): CancelablePromise<KnowledgeBaseData> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/knowledge_bases/{knowledge_base_id}',
            path: {
                'knowledge_base_id': knowledgeBaseId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Kowledge Base
     * Delete a knowledge base by its ID.
     * @param knowledgeBaseId
     * @returns void
     * @throws ApiError
     */
    public deleteKowledgeBaseKnowledgeBasesKnowledgeBaseIdDelete(
        knowledgeBaseId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/knowledge_bases/{knowledge_base_id}',
            path: {
                'knowledge_base_id': knowledgeBaseId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Knowledge Base Projects
     * Get the list of projects that use the given knowledge base if the user has access to it.
     * @param knowledgeBaseId
     * @returns ProjectMetadata Successful Response
     * @throws ApiError
     */
    public getKnowledgeBaseProjectsKnowledgeBasesKnowledgeBaseIdProjectsGet(
        knowledgeBaseId: string,
    ): CancelablePromise<Array<ProjectMetadata>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/knowledge_bases/{knowledge_base_id}/projects',
            path: {
                'knowledge_base_id': knowledgeBaseId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Synchronize Knowledge Base
     * Synchronize the knowledge base.
     * @param orgId
     * @param knowledgeBaseId
     * @returns any Successful Response
     * @throws ApiError
     */
    public synchronizeKnowledgeBaseKnowledgeBasesSyncTriggerKnowledgeBaseIdOrgIdGet(
        orgId: string,
        knowledgeBaseId: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/knowledge_bases/sync/trigger/{knowledge_base_id}/{org_id}',
            path: {
                'org_id': orgId,
                'knowledge_base_id': knowledgeBaseId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Reindex File Resource
     * Reindex a specific file resource in the knowledge base.
     *
     * This endpoint allows reindexing of a specific file without needing to reindex
     * the entire knowledge base. The file must already exist in the knowledge base.
     *
     * Args:
     * ----
     * knowledge_base_id: The UUID of the knowledge base
     * inode_id: The UUID of the file inode to reindex
     * kb_file_management_service: File management service dependency
     * user_org: Current user organization dependency
     *
     * Returns:
     * -------
     * dict: Status message indicating the reindexing task has been started
     *
     * Raises:
     * ------
     * HTTPException: If the knowledge base or file is not found, or user lacks permissions
     * @param knowledgeBaseId
     * @param inodeId
     * @returns string Successful Response
     * @throws ApiError
     */
    public reindexFileResourceKnowledgeBasesKnowledgeBaseIdResourcesInodeIdReindexPut(
        knowledgeBaseId: string,
        inodeId: string,
    ): CancelablePromise<Record<string, string>> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/knowledge_bases/{knowledge_base_id}/resources/{inode_id}/reindex',
            path: {
                'knowledge_base_id': knowledgeBaseId,
                'inode_id': inodeId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Sync Trigger
     * Create a sync trigger for the knowledge base.
     * @param knowledgeBaseId
     * @returns KnowledgeBaseData Successful Response
     * @throws ApiError
     */
    public createSyncTriggerKnowledgeBasesSyncKnowledgeBaseIdPost(
        knowledgeBaseId: string,
    ): CancelablePromise<KnowledgeBaseData> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/knowledge_bases/sync/{knowledge_base_id}',
            path: {
                'knowledge_base_id': knowledgeBaseId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Sync Trigger
     * Delete a sync trigger for the knowledge base.
     * @param knowledgeBaseId
     * @returns void
     * @throws ApiError
     */
    public deleteSyncTriggerKnowledgeBasesSyncKnowledgeBaseIdDelete(
        knowledgeBaseId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/knowledge_bases/sync/{knowledge_base_id}',
            path: {
                'knowledge_base_id': knowledgeBaseId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Sync Trigger Info
     * Get the sync trigger information for the knowledge base.
     * @param knowledgeBaseId
     * @returns CronWebhook Successful Response
     * @throws ApiError
     */
    public getSyncTriggerInfoKnowledgeBasesSyncKnowledgeBaseIdGet(
        knowledgeBaseId: string,
    ): CancelablePromise<CronWebhook> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/knowledge_bases/sync/{knowledge_base_id}',
            path: {
                'knowledge_base_id': knowledgeBaseId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Scraping Map
     * Get the scraping map for the knowledge base.
     * @param url
     * @returns CursorPaginated_Union_StackFile__StackDirectory__ Successful Response
     * @throws ApiError
     */
    public getScrapingMapKnowledgeBasesWebscrapingMapGet(
        url: string,
    ): CancelablePromise<CursorPaginated_Union_StackFile__StackDirectory__> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/knowledge_bases/webscraping/map',
            query: {
                'url': url,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Resources By Ids
     * Get the resources with the selected ids from the knowledge base.
     *
     * Returns a mapping with each of the requested ids and their corresponding metadata, or None if
     * the requested element does not exist.
     * @param knowledgeBaseId
     * @param inodeIds
     * @returns any Successful Response
     * @throws ApiError
     */
    public getResourcesByIdsKnowledgeBasesKnowledgeBaseIdResourcesGet(
        knowledgeBaseId: string,
        inodeIds?: Array<string>,
    ): CancelablePromise<Record<string, (StackFile | StackDirectory | null)>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/knowledge_bases/{knowledge_base_id}/resources',
            path: {
                'knowledge_base_id': knowledgeBaseId,
            },
            query: {
                'inode_ids': inodeIds,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Resource
     * Create a new resource in the knowledge base.
     * @param knowledgeBaseId
     * @param formData
     * @returns any Successful Response
     * @throws ApiError
     */
    public createResourceKnowledgeBasesKnowledgeBaseIdResourcesPost(
        knowledgeBaseId: string,
        formData: Body_create_resource_knowledge_bases__knowledge_base_id__resources_post,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/knowledge_bases/{knowledge_base_id}/resources',
            path: {
                'knowledge_base_id': knowledgeBaseId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Resource
     * Delete a resource from the knowledge base.
     * @param knowledgeBaseId
     * @param resourcePath
     * @returns void
     * @throws ApiError
     */
    public deleteResourceKnowledgeBasesKnowledgeBaseIdResourcesDelete(
        knowledgeBaseId: string,
        resourcePath: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/knowledge_bases/{knowledge_base_id}/resources',
            path: {
                'knowledge_base_id': knowledgeBaseId,
            },
            query: {
                'resource_path': resourcePath,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Children Resources
     * Get the children resources under a path in the knowledge base.
     * @param knowledgeBaseId
     * @param resourcePath
     * @returns CursorPaginated_Union_StackFile__StackDirectory__ Successful Response
     * @throws ApiError
     */
    public getChildrenResourcesKnowledgeBasesKnowledgeBaseIdResourcesChildrenGet(
        knowledgeBaseId: string,
        resourcePath?: string,
    ): CancelablePromise<CursorPaginated_Union_StackFile__StackDirectory__> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/knowledge_bases/{knowledge_base_id}/resources/children',
            path: {
                'knowledge_base_id': knowledgeBaseId,
            },
            query: {
                'resource_path': resourcePath,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Knowledge Base Rbac
     * Get the RBA info for the knowledge base.
     * @param knowledgeBaseId
     * @returns KnowledgeBaseRBA Successful Response
     * @throws ApiError
     */
    public getKnowledgeBaseRbacKnowledgeBasesKnowledgeBaseIdRbacGet(
        knowledgeBaseId: string,
    ): CancelablePromise<KnowledgeBaseRBA> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/knowledge_bases/{knowledge_base_id}/rbac',
            path: {
                'knowledge_base_id': knowledgeBaseId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Knowledge Base Rbac
     * Update the RBA info for the knowledge base.
     * @param knowledgeBaseId
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public updateKnowledgeBaseRbacKnowledgeBasesKnowledgeBaseIdRbacPut(
        knowledgeBaseId: string,
        requestBody: UpdateKnowledgeBaseRBACRequest,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/knowledge_bases/{knowledge_base_id}/rbac',
            path: {
                'knowledge_base_id': knowledgeBaseId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Knowledge Base Rbac
     * Delete the RBA info for the knowledge base.
     * @param subjectType
     * @param knowledgeBaseId
     * @param subjectId
     * @returns void
     * @throws ApiError
     */
    public deleteKnowledgeBaseRbacKnowledgeBasesKnowledgeBaseIdSubjectTypeRbacDelete(
        subjectType: 'user' | 'group',
        knowledgeBaseId: string,
        subjectId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/knowledge_bases/{knowledge_base_id}/{subject_type}/rbac',
            path: {
                'subject_type': subjectType,
                'knowledge_base_id': knowledgeBaseId,
            },
            query: {
                'subject_id': subjectId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Search Knowledge Base Files
     * Search for files in a knowledge base by filename.
     * @param knowledgeBaseId
     * @param searchQuery Search term to match against filenames
     * @param status Filter by file status
     * @returns CursorPaginated_Union_StackFile__StackDirectory__ Successful Response
     * @throws ApiError
     */
    public searchKnowledgeBaseFilesKnowledgeBasesKnowledgeBaseIdSearchGet(
        knowledgeBaseId: string,
        searchQuery?: (string | null),
        status?: (StackFileStatusEnum | null),
    ): CancelablePromise<CursorPaginated_Union_StackFile__StackDirectory__> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/knowledge_bases/{knowledge_base_id}/search',
            path: {
                'knowledge_base_id': knowledgeBaseId,
            },
            query: {
                'search_query': searchQuery,
                'status': status,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Fields In User Metadata Schema
     * @param knowledgeBaseId
     * @param requestBody
     * @returns KBMetadataSchemaResponse Successful Response
     * @throws ApiError
     */
    public updateFieldsInUserMetadataSchemaKnowledgeBasesKnowledgeBaseIdMetadataSchemaUserPost(
        knowledgeBaseId: string,
        requestBody: UpdateUserMetadataSchemaRequest,
    ): CancelablePromise<KBMetadataSchemaResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/knowledge_bases/{knowledge_base_id}/metadata/schema/user',
            path: {
                'knowledge_base_id': knowledgeBaseId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Replace User Metadata In File
     * @param knowledgeBaseId
     * @param inodeId
     * @param requestBody
     * @returns FileMetadatasResponse Successful Response
     * @throws ApiError
     */
    public replaceUserMetadataInFileKnowledgeBasesKnowledgeBaseIdMetadataInodeIdUserPut(
        knowledgeBaseId: string,
        inodeId: string,
        requestBody: FileUserMetadataUpdateRequest,
    ): CancelablePromise<FileMetadatasResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/knowledge_bases/{knowledge_base_id}/metadata/{inode_id}/user',
            path: {
                'knowledge_base_id': knowledgeBaseId,
                'inode_id': inodeId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
