/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScheduledTask } from '../models/ScheduledTask';
import type { TaskUpdatePayload } from '../models/TaskUpdatePayload';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class TasksService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Update Task
     * Update an existing cron job.
     *
     * Args:
     * task_id: UUID of the task to update
     * payload: Task update payload containing updated fields
     * task_service: Cron service dependency
     *
     * Returns:
     * The updated task
     *
     * Raises:
     * HTTPException: If cron job is not found or update fails
     * @param taskId
     * @param requestBody
     * @returns ScheduledTask Successful Response
     * @throws ApiError
     */
    public updateTaskTasksTaskIdPut(
        taskId: string,
        requestBody: TaskUpdatePayload,
    ): CancelablePromise<ScheduledTask> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/tasks/{task_id}',
            path: {
                'task_id': taskId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Task
     * Get a Task by ID.
     * @param taskId
     * @returns ScheduledTask Successful Response
     * @throws ApiError
     */
    public getTaskTasksTaskIdGet(
        taskId: string,
    ): CancelablePromise<ScheduledTask> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/tasks/{task_id}',
            path: {
                'task_id': taskId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get All Tasks
     * Get all cron jobs for an organization.
     *
     * Args:
     * task_service: Cron service dependency
     * user_org: User organization containing org ID
     * project_id: Optional project ID to filter tasks by project
     *
     * Returns:
     * List of cron jobs
     *
     * Raises:
     * HTTPException: If retrieving cron jobs fails
     * @param projectId
     * @returns ScheduledTask Successful Response
     * @throws ApiError
     */
    public getAllTasksTasksGet(
        projectId?: (string | null),
    ): CancelablePromise<Array<ScheduledTask>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/tasks',
            query: {
                'project_id': projectId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Task
     * Delete a cron job.
     *
     * Args:
     * cron_id: ID of the cron job to delete
     * task_service: Cron service dependency
     *
     * Returns:
     * Status message indicating success
     *
     * Raises:
     * HTTPException: If cron job is not found or deletion fails
     * @param cronId
     * @returns string Successful Response
     * @throws ApiError
     */
    public deleteTaskTasksCronIdDelete(
        cronId: string,
    ): CancelablePromise<Record<string, string>> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/tasks/{cron_id}',
            path: {
                'cron_id': cronId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
