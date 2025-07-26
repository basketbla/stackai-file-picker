/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Model to represent the cron webhook details.
 */
export type CronWebhook = {
    cron_job_id: number;
    url: string;
    total_successes: number;
    total_failures: number;
    number_failed_time: number;
};

