/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateUserNotification } from '../models/UpdateUserNotification';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class NotificationsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get All User Notifications
     * Get notifications for a specific user.
     *
     * Args:
     * ----
     * user (UserProfile): The user profile dependency.
     * organization (Organization): The organization dependency.
     * notification_service (NotificationService): The notification service dependency
     *
     * Returns:
     * -------
     * list[UserNotificationBase]: The list of notifications for the user.
     * @returns any Successful Response
     * @throws ApiError
     */
    public getAllUserNotificationsNotificationsGet(): CancelablePromise<Array<any>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/notifications/',
        });
    }
    /**
     * Delete Notification
     * Delete a notification by its ID.
     *
     * Args:
     * ----
     * notification_id (str): The ID of the notification to delete.
     * user (UserProfile): The user profile dependency.
     * notification_service (NotificationService): The notification service dependency
     * created_at (datetime.datetime): The created at date of the notification.
     *
     * Returns:
     * -------
     * dict: The response indicating the success of the deletion.
     * @param notificationId
     * @param createdAt
     * @returns any Successful Response
     * @throws ApiError
     */
    public deleteNotificationNotificationsNotificationIdDelete(
        notificationId: string,
        createdAt: string,
    ): CancelablePromise<Record<string, any>> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/notifications/{notification_id}',
            path: {
                'notification_id': notificationId,
            },
            query: {
                'created_at': createdAt,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Notification
     * Update a notification.
     * @param notificationId
     * @param createdAt
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public updateNotificationNotificationsNotificationIdPatch(
        notificationId: string,
        createdAt: string,
        requestBody: UpdateUserNotification,
    ): CancelablePromise<Record<string, any>> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/notifications/{notification_id}',
            path: {
                'notification_id': notificationId,
            },
            query: {
                'created_at': createdAt,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete All User Notifications
     * Delete all notifications for a specific user.
     *
     * Args:
     * ----
     * user (UserProfile): The user profile dependency.
     * organization (Organization): The organization dependency
     * notification_service (NotificationService): The notification service dependency
     *
     * Returns:
     * -------
     * dict: The response indicating the success of the deletion.
     * @returns any Successful Response
     * @throws ApiError
     */
    public deleteAllUserNotificationsNotificationsAllDelete(): CancelablePromise<Record<string, any>> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/notifications/all/',
        });
    }
    /**
     * Get Users From Org By Role
     * Get users from organization by role.
     * @param notificationId
     * @param roleName
     * @returns any Successful Response
     * @throws ApiError
     */
    public getUsersFromOrgByRoleNotificationsNotificationIdPost(
        notificationId: string,
        roleName: string,
    ): CancelablePromise<Record<string, any>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/notifications/{notification_id}/',
            path: {
                'notification_id': notificationId,
            },
            query: {
                'role_name': roleName,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
