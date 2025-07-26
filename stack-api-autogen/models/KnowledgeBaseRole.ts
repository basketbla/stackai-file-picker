/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Enumerates all the possible roles for a user in a knowledge base.
 *
 * Attributes
 * ----------
 * - ADMIN: Admin permissions allow full control over the knowledge base, including deletion.
 * - EDITOR: Editor permissions allow the user to modify the knowledge base, but not delete it.
 * - VIEWER: Viewer permissions allow the user to view the knowledge base, but not modify it.
 */
export enum KnowledgeBaseRole {
    VIEWER = 'viewer',
    EDITOR = 'editor',
    ADMIN = 'admin',
}
