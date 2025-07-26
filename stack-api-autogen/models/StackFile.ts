/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StackFileStatusEnum } from './StackFileStatusEnum';
import type { StackInodeTypeEnum } from './StackInodeTypeEnum';
import type { StackVFSPath } from './StackVFSPath';
/**
 * Represents a file inode in the Stack Virtual File System.
 *
 * Attributes
 * ----------
 * - inode_id (InodeIDType | None): The unique identifier for the file.
 * - inode_type (StackInodeTypeEnum): The type of the inode, must be StackInodeTypeEnum.FILE.
 * - content_hash (str): The hash of the content of the file.
 * - content_mime (str): The MIME type of the content of the file.
 * - size (int): The size of the file in bytes.
 */
export type StackFile = {
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
    content_hash: string;
    content_mime: string;
    size: number;
    status: StackFileStatusEnum;
};

