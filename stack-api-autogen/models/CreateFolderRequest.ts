/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateFolderRequest = {
    name: string;
    /**
     * DEPRECATED field, kept for backward compatibility
     * @deprecated
     */
    access?: Array<string>;
    /**
     * User ids of users who have access to the folder
     */
    user_id_access_list?: Array<string>;
    /**
     * Group ids of users who have access to the folder
     */
    group_id_access_list?: Array<string>;
};

