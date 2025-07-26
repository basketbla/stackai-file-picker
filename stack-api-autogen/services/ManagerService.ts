/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InfinitePagination_Conversation_ } from '../models/InfinitePagination_Conversation_';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ManagerService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get User Conversations
     * @param projectId
     * @returns InfinitePagination_Conversation_ Successful Response
     * @throws ApiError
     */
    public getUserConversationsProjectsProjectIdManagerUserConversationsGet(
        projectId: string,
    ): CancelablePromise<InfinitePagination_Conversation_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/projects/{project_id}/manager/user-conversations',
            path: {
                'project_id': projectId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
