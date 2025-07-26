/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StackInodeTypeEnum } from './StackInodeTypeEnum';
import type { StackVFSPath } from './StackVFSPath';
/**
 * Represents a directory inode in the Stack Virtual File System.
 *
 * Attributes
 * ----------
 * - inode_id (str | None): The unique identifier for the directory.
 * - inode_type (StackInodeTypeEnum): Inode type, must be StackInodeTypeEnum.DIRECTORY
 */
export type StackDirectory = {
    knowledge_base_id: string;
    created_at?: string;
    modified_at?: string;
    indexed_at?: (string | null);
    inode_type?: StackInodeTypeEnum;
    resource_id: string;
    inode_path: StackVFSPath;
    dataloader_metadata?: Record<string, any>;
    user_metadata?: Record<string, any>;
    inode_id: (string | null);
};

