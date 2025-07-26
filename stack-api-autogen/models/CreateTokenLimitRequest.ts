/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UsageLimitType } from './UsageLimitType';
/**
 * Request model for creating a new token limit.
 */
export type CreateTokenLimitRequest = {
    /**
     * Maximum number of tokens allowed per day
     */
    daily_limit: number;
    /**
     * Resource IDs this limit applies to
     */
    resource_ids: Array<string>;
    /**
     * Type of resource this limit applies to
     */
    resource_type: UsageLimitType;
};

