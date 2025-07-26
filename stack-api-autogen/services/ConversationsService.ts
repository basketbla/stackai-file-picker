/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Conversation } from '../models/Conversation';
import type { InfinitePagination_Conversation_ } from '../models/InfinitePagination_Conversation_';
import type { RenameConversationRequest } from '../models/RenameConversationRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ConversationsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Conversations
     * @param projectId
     * @param xUserId
     * @returns InfinitePagination_Conversation_ Successful Response
     * @throws ApiError
     */
    public getConversationsProjectsProjectIdConversationsGet(
        projectId: string,
        xUserId: (string | null),
    ): CancelablePromise<InfinitePagination_Conversation_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/projects/{project_id}/conversations',
            path: {
                'project_id': projectId,
            },
            headers: {
                'X-User-Id': xUserId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Conversations Sso
     * @param projectId
     * @param xUserId
     * @returns InfinitePagination_Conversation_ Successful Response
     * @throws ApiError
     */
    public getConversationsSsoProjectsProjectIdSsoConversationsGet(
        projectId: string,
        xUserId: (string | null),
    ): CancelablePromise<InfinitePagination_Conversation_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/projects/{project_id}/sso/conversations',
            path: {
                'project_id': projectId,
            },
            headers: {
                'X-User-Id': xUserId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Archive Conversation
     * @param conversationId
     * @param projectId
     * @param xUserId
     * @param isArchived
     * @returns Conversation Successful Response
     * @throws ApiError
     */
    public archiveConversationProjectsProjectIdConversationsConversationIdArchivePost(
        conversationId: string,
        projectId: string,
        xUserId: (string | null),
        isArchived: boolean = true,
    ): CancelablePromise<Conversation> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/projects/{project_id}/conversations/{conversation_id}/archive',
            path: {
                'conversation_id': conversationId,
                'project_id': projectId,
            },
            headers: {
                'X-User-Id': xUserId,
            },
            query: {
                'is_archived': isArchived,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Conversation
     * @param conversationId
     * @param projectId
     * @param xUserId
     * @returns any Successful Response
     * @throws ApiError
     */
    public deleteConversationProjectsProjectIdConversationsConversationIdDelete(
        conversationId: string,
        projectId: string,
        xUserId: (string | null),
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/projects/{project_id}/conversations/{conversation_id}',
            path: {
                'conversation_id': conversationId,
                'project_id': projectId,
            },
            headers: {
                'X-User-Id': xUserId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Rename Conversation
     * Rename a conversation.
     *
     * Args:
     * conversation_id: The ID of the conversation to rename
     * request: The request containing the new title
     * project_metadata: The metadata of the project the conversation belongs to
     * conversation_service: Service for managing conversations
     * user_id: ID of the authenticated user
     *
     * Returns:
     * The updated conversation
     * @param conversationId
     * @param projectId
     * @param xUserId
     * @param requestBody
     * @returns Conversation Successful Response
     * @throws ApiError
     */
    public renameConversationProjectsProjectIdConversationsConversationIdRenamePost(
        conversationId: string,
        projectId: string,
        xUserId: (string | null),
        requestBody: RenameConversationRequest,
    ): CancelablePromise<Conversation> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/projects/{project_id}/conversations/{conversation_id}/rename',
            path: {
                'conversation_id': conversationId,
                'project_id': projectId,
            },
            headers: {
                'X-User-Id': xUserId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
