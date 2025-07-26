/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChatUIOptionsResponse } from '../models/ChatUIOptionsResponse';
import type { NewMessageRequest } from '../models/NewMessageRequest';
import type { ReloadMessageRequest } from '../models/ReloadMessageRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ChatService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Chat Ui
     * @param projectId
     * @param draft
     * @returns ChatUIOptionsResponse Successful Response
     * @throws ApiError
     */
    public getChatUiProjectsProjectIdChatUiGet(
        projectId: string,
        draft: boolean = false,
    ): CancelablePromise<ChatUIOptionsResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/projects/{project_id}/chat/ui',
            path: {
                'project_id': projectId,
            },
            query: {
                'draft': draft,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Chat With Assistant
     * Chat with an AI assistant.
     *
     * Args:
     * ----
     * project_metadata (ProjectMetadata): The project metadata from header dependency
     * chat_service (AsisstantService): The assistant service instance
     * request (NewMessageRequest): The chat request containing:
     * - conversation_id: Optional ID of an existing conversation
     * - message: The user's message to the assistant
     * - attachments: Optional list of attachment IDs
     *
     * Returns:
     * -------
     * StreamingResponse: Server-sent events stream containing the assistant's responses.
     * The response is streamed as the assistant generates the reply.
     * @param projectId
     * @param xApiKey
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public chatWithAssistantProjectsProjectIdChatAssistantPost(
        projectId: string,
        xApiKey: string,
        requestBody: NewMessageRequest,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/projects/{project_id}/chat/assistant',
            path: {
                'project_id': projectId,
            },
            headers: {
                'X-Api-Key': xApiKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Reload Chat Message
     * Reload a chat message from the assistant.
     *
     * Args:
     * ----
     * project_metadata (ProjectMetadata): The project metadata from header dependency
     * chat_service (AsisstantService): The assistant service
     * message_id (str): ID of the message to reload
     * request (ReloadMessageRequest): The reload request containing:
     * - conversation_id: ID of the existing conversation
     * - message: The message to reload
     * - attachments: Optional list of attachment IDs
     *
     * Returns:
     * -------
     * StreamingResponse: Server-sent events stream containing the assistant's reloaded response.
     * The response is streamed as the assistant regenerates the reply.
     * @param messageId ID of the message to reload
     * @param projectId
     * @param xApiKey
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public reloadChatMessageProjectsProjectIdChatReloadMessageIdPost(
        messageId: string,
        projectId: string,
        xApiKey: string,
        requestBody: ReloadMessageRequest,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/projects/{project_id}/chat/reload/{message_id}',
            path: {
                'message_id': messageId,
                'project_id': projectId,
            },
            headers: {
                'X-Api-Key': xApiKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Chat With Assistant Sso
     * Chat with an AI assistant.
     *
     * Args:
     * ----
     * project_metadata (ProjectMetadata): The project metadata from header dependency
     * chat_service (AsisstantService): The assistant service instance
     * request (NewMessageRequest): The chat request containing:
     * - conversation_id: Optional ID of an existing conversation
     * - message: The user's message to the assistant
     * - attachments: Optional list of attachment IDs
     *
     * Returns:
     * -------
     * StreamingResponse: Server-sent events stream containing the assistant's responses.
     * The response is streamed as the assistant generates the reply.
     * @param projectId
     * @param token Token for authorization
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public chatWithAssistantSsoProjectsProjectIdChatSsoAssistantPost(
        projectId: string,
        token: string,
        requestBody: NewMessageRequest,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/projects/{project_id}/chat/sso/assistant',
            path: {
                'project_id': projectId,
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
    /**
     * Reload Chat Message Sso
     * Reload a chat message from the assistant.
     *
     * Args:
     * ----
     * project_metadata (ProjectMetadata): The project metadata from header dependency
     * chat_service (AsisstantService): The assistant service
     * message_id (str): ID of the message to reload
     * request (ReloadMessageRequest): The reload request containing:
     * - conversation_id: ID of the existing conversation
     * - message: The message to reload
     * - attachments: Optional list of attachment IDs
     *
     * Returns:
     * -------
     * StreamingResponse: Server-sent events stream containing the assistant's reloaded response.
     * The response is streamed as the assistant regenerates the reply.
     * @param messageId ID of the message to reload
     * @param projectId
     * @param token Token for authorization
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public reloadChatMessageSsoProjectsProjectIdChatSsoReloadMessageIdPost(
        messageId: string,
        projectId: string,
        token: string,
        requestBody: ReloadMessageRequest,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/projects/{project_id}/chat/sso/reload/{message_id}',
            path: {
                'message_id': messageId,
                'project_id': projectId,
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
