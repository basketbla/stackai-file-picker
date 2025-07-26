/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProjectLogsBehaviour } from './ProjectLogsBehaviour';
import type { ProjectTypeEnum } from './ProjectTypeEnum';
export type ProjectMetadata = {
    project_id: string;
    org_id: string;
    project_type?: ProjectTypeEnum;
    name: string;
    /**
     * The posix 1970 timestamp when the project was created.
     */
    created_at?: number;
    /**
     * The posix 1970 timestamp when the project was last updated.
     */
    modified_at?: number;
    /**
     * The id of the folder where the project is located.
     */
    folder_id?: (string | null);
    /**
     * The user id of the user who owns the project.
     */
    project_owner?: (string | null);
    path: string;
    /**
     * The id of the published version of the project.
     */
    published_version_id?: (number | null);
    /**
     * The user id of the user who published the project.
     */
    published_by?: (string | null);
    /**
     * The posix 1970 timestamp when the project was published.
     */
    published_at?: (number | null);
    is_published?: boolean;
    is_locked?: boolean;
    /**
     * The id of the project to evaluate if any.
     */
    project_to_evaluate_id?: (string | null);
    /**
     * The behaviour of the project logs.
     */
    project_logs_behaviour?: ProjectLogsBehaviour;
    /**
     * Project's token daily usage HARD limit
     */
    daily_token_limit?: (number | null);
    /**
     * The date for which the daily token usage is being tracked
     */
    daily_token_date?: (string | null);
    /**
     * Total tokens used on the daily_token_date
     */
    daily_token_usage?: number;
    /**
     * The last time the token usage was sent to the user
     */
    token_usage_last_sent?: (string | null);
    /**
     * The number of errors from the last run
     */
    streak_of_errors?: number;
};

