/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { KnowledgeBaseRole } from './KnowledgeBaseRole';
export type UpdateKnowledgeBaseRBACRequest = {
    subject_type: UpdateKnowledgeBaseRBACRequest.subject_type;
    role: KnowledgeBaseRole;
    subject_id: string;
};
export namespace UpdateKnowledgeBaseRBACRequest {
    export enum subject_type {
        USER = 'user',
        GROUP = 'group',
    }
}

