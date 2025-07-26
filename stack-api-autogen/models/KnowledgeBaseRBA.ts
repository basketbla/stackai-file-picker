/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { KnowledgeBaseRole } from './KnowledgeBaseRole';
/**
 * A class representing the role-based access control for a knowledge base.
 */
export type KnowledgeBaseRBA = {
    org_level_role: (KnowledgeBaseRole | null);
    user_roles: Record<string, Array<string>>;
    group_roles: Record<string, Array<string>>;
};

