/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UsageLimitType } from './UsageLimitType';
/**
 * Model for usage limit display.
 */
export type UsageLimitMetadata = {
    /**
     * ID of the resource (project/user) this limit applies to
     */
    resource_id: string;
    /**
     * Name of the resource
     */
    name: string;
    type: UsageLimitType;
    daily_token_limit: (number | null);
    /**
     * Current token usage for the day
     */
    daily_token_usage?: number;
};

