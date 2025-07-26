/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Folder = {
    id?: (string | null);
    /**
     * The name of the folder, it is used like a path
     */
    name: string;
    /**
     * DEPRECATED. A list containing emails and group ids that have access to the folder
     * @deprecated
     */
    access: Array<string>;
    /**
     * A list containing user ids that have access to the folder
     */
    user_id_access_list?: Array<string>;
    /**
     * A list containing group ids that have access to the folder
     */
    group_id_access_list?: Array<string>;
    personal_folder_owner_id?: (string | null);
};

