/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StackInodeTypeEnum } from './StackInodeTypeEnum';
export type Body_create_resource_knowledge_bases__knowledge_base_id__resources_post = {
    resource_type: StackInodeTypeEnum;
    resource_path: string;
    created_at?: string;
    modified_at?: (string | null);
    file?: (Blob | null);
};

