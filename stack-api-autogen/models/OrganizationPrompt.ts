/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserProfile } from './UserProfile';
export type OrganizationPrompt = {
    org_id: string;
    prompt_id: string;
    name: string;
    content: string;
    description: (string | null);
    /**
     * The posix 1970 timestamp of the update in milliseconds.
     */
    created_at?: number;
    created_by: UserProfile;
    /**
     * The posix 1970 timestamp of the update in milliseconds.
     */
    updated_at?: number;
    updated_by: UserProfile;
};

