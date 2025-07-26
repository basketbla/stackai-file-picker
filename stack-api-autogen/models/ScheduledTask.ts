/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TaskType } from './TaskType';
export type ScheduledTask = {
    id: string;
    cron_id: string;
    title: string;
    instructions: string;
    cron_expression: string;
    human_expression: string;
    type: TaskType;
    project_id: string;
    org_id: string;
    conversation_id: (string | null);
    timezone: string;
};

