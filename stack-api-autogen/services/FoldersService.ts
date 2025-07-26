/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFolderRequest } from '../models/CreateFolderRequest';
import type { Folder } from '../models/Folder';
import type { FolderQuery } from '../models/FolderQuery';
import type { FolderUpdate } from '../models/FolderUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class FoldersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get User Personal Folder
     * Get the user's personal folder if it exists.
     * @returns any Successful Response
     * @throws ApiError
     */
    public getUserPersonalFolderFoldersMeGet(): CancelablePromise<(Folder | null)> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/folders/me',
        });
    }
    /**
     * Get Folder
     * @param folderId
     * @returns Folder Successful Response
     * @throws ApiError
     */
    public getFolderFoldersFolderIdGet(
        folderId: string,
    ): CancelablePromise<Folder> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/folders/{folder_id}',
            path: {
                'folder_id': folderId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Patch Folder
     * Update a folder in the current organization.
     * @param folderId
     * @param requestBody
     * @returns Folder Successful Response
     * @throws ApiError
     */
    public patchFolderFoldersFolderIdPatch(
        folderId: string,
        requestBody: FolderUpdate,
    ): CancelablePromise<Folder> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/folders/{folder_id}',
            path: {
                'folder_id': folderId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Folder
     * Delete a folder in the current organization.
     * @param folderId
     * @returns void
     * @throws ApiError
     */
    public deleteFolderFoldersFolderIdDelete(
        folderId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/folders/{folder_id}',
            path: {
                'folder_id': folderId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Folder
     * Create a new folder in the current organization.
     * @param requestBody
     * @returns Folder Successful Response
     * @throws ApiError
     */
    public createFolderFoldersPut(
        requestBody: CreateFolderRequest,
    ): CancelablePromise<Folder> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/folders',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Query Folders
     * Get all folders for the current user organization.
     *
     * Args:
     * offset (int): The offset of the folders to return as a number of rows. Defaults to 0.
     * limit (int): The limit of the folders to return as a number of rows. Defaults to 100.
     * query (str): The search query to filter folders by name. If provided, only folders whose names contain the query
     * string will be returned.
     * @param requestBody
     * @returns Folder Successful Response
     * @throws ApiError
     */
    public queryFoldersFoldersPost(
        requestBody?: FolderQuery,
    ): CancelablePromise<Array<Folder>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/folders',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
