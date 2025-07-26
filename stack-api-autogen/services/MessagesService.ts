/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppendMessagesBody } from '../models/AppendMessagesBody';
import type { AssistantMessage_Output } from '../models/AssistantMessage_Output';
import type { FeedbackMessage } from '../models/FeedbackMessage';
import type { InfinitePagination_Union_UserMessage__AssistantMessage__ } from '../models/InfinitePagination_Union_UserMessage__AssistantMessage__';
import type { UserMessage_Output } from '../models/UserMessage_Output';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class MessagesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Conversation Messages
     * Get all messages for a specific conversation branch.
     *
     * The branch is determined by the conversation's last_message_id.
     * @param conversationId
     * @param projectId
     * @returns InfinitePagination_Union_UserMessage__AssistantMessage__ Successful Response
     * @throws ApiError
     */
    public getConversationMessagesProjectsProjectIdConversationsConversationIdMessagesGet(
        conversationId: string,
        projectId: string,
    ): CancelablePromise<InfinitePagination_Union_UserMessage__AssistantMessage__> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/projects/{project_id}/conversations/{conversation_id}/messages',
            path: {
                'conversation_id': conversationId,
                'project_id': projectId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Append Messages Sso
     * Append multiple messages to a given conversation.
     *
     * If the conversation does not exist, it will be created with the first messages.
     *
     * Args:
     * conversation_id: ID of the conversation to append messages to
     * project_id: ID of the project the conversation belongs to
     * body: AppendMessagesBody
     * message_service: Message service dependency
     * conversation_service: Conversation service dependency
     *
     * Returns:
     * The list of appended messages
     * @param conversationId
     * @param projectId
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public appendMessagesSsoProjectsProjectIdConversationsConversationIdMessagesPost(
        conversationId: string,
        projectId: string,
        requestBody: AppendMessagesBody,
    ): CancelablePromise<Array<(UserMessage_Output | AssistantMessage_Output)>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/projects/{project_id}/conversations/{conversation_id}/messages',
            path: {
                'conversation_id': conversationId,
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Conversation Messages Sso
     * Get all messages for a specific conversation branch.
     *
     * The branch is determined by the conversation's last_message_id.
     * @param conversationId
     * @returns InfinitePagination_Union_UserMessage__AssistantMessage__ Successful Response
     * @throws ApiError
     */
    public getConversationMessagesSsoProjectsProjectIdConversationsSsoConversationIdMessagesGet(
        conversationId: string,
    ): CancelablePromise<InfinitePagination_Union_UserMessage__AssistantMessage__> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/projects/{project_id}/conversations/sso/{conversation_id}/messages',
            path: {
                'conversation_id': conversationId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Append Messages
     * Append multiple messages to a given conversation.
     *
     * If the conversation does not exist, it will be created with the first messages.
     *
     * Args:
     * conversation_id: ID of the conversation to append messages to
     * project_id: ID of the project the conversation belongs to
     * body: AppendMessagesBody
     * message_service: Message service dependency
     * conversation_service: Conversation service dependency
     *
     * Returns:
     * The list of appended messages
     * @param conversationId
     * @param projectId
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public appendMessagesProjectsProjectIdConversationsSsoConversationIdMessagesPost(
        conversationId: string,
        projectId: string,
        requestBody: AppendMessagesBody,
    ): CancelablePromise<Array<(UserMessage_Output | AssistantMessage_Output)>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/projects/{project_id}/conversations/sso/{conversation_id}/messages',
            path: {
                'conversation_id': conversationId,
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Message Feedback
     * @param projectId
     * @param messageId
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public updateMessageFeedbackProjectsProjectIdMessagesMessageIdFeedbackPatch(
        projectId: string,
        messageId: string,
        requestBody: FeedbackMessage,
    ): CancelablePromise<(UserMessage_Output | AssistantMessage_Output)> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/projects/{project_id}/messages/{message_id}/feedback',
            path: {
                'project_id': projectId,
                'message_id': messageId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Message Feedback Sso
     * @param projectId
     * @param messageId
     * @param token Token for authorization
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public updateMessageFeedbackSsoProjectsProjectIdMessagesSsoMessageIdFeedbackPatch(
        projectId: string,
        messageId: string,
        token: string,
        requestBody: FeedbackMessage,
    ): CancelablePromise<(UserMessage_Output | AssistantMessage_Output)> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/projects/{project_id}/messages/sso/{message_id}/feedback',
            path: {
                'project_id': projectId,
                'message_id': messageId,
            },
            query: {
                'token': token,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
