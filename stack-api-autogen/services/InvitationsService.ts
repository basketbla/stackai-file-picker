/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Invitation } from '../models/Invitation';
import type { InvitationRequest } from '../models/InvitationRequest';
import type { InvitationResponse } from '../models/InvitationResponse';
import type { SeatsUsage } from '../models/SeatsUsage';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class InvitationsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Invited Users To Org
     * Get all the users invited to the user's organization.
     * @returns Invitation Successful Response
     * @throws ApiError
     */
    public getInvitedUsersToOrgInvitationsGet(): CancelablePromise<Array<Invitation>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/invitations',
        });
    }
    /**
     * Invite Users To Org
     * @param requestBody
     * @returns InvitationResponse Successful Response
     * @throws ApiError
     */
    public inviteUsersToOrgInvitationsPost(
        requestBody: InvitationRequest,
    ): CancelablePromise<Array<InvitationResponse>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/invitations',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Invitations Left
     * @returns SeatsUsage Successful Response
     * @throws ApiError
     */
    public getInvitationsLeftInvitationsInvitationsLeftGet(): CancelablePromise<SeatsUsage> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/invitations/invitations-left',
        });
    }
    /**
     * Invite Users To Org Bulk
     * @param requestBody
     * @returns InvitationResponse Successful Response
     * @throws ApiError
     */
    public inviteUsersToOrgBulkInvitationsBulkPost(
        requestBody: Array<InvitationRequest>,
    ): CancelablePromise<Array<InvitationResponse>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/invitations/bulk',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Invitation
     * Delete an invitation to the user's organization.
     * @param email
     * @returns void
     * @throws ApiError
     */
    public deleteInvitationInvitationsEmailDelete(
        email: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/invitations/{email}',
            path: {
                'email': email,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Add Invited User To Org
     * Accept an invitation to an organization.
     * @param token Invitation token
     * @returns void
     * @throws ApiError
     */
    public addInvitedUserToOrgInvitationsAcceptPost(
        token: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/invitations/accept',
            query: {
                'token': token,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
