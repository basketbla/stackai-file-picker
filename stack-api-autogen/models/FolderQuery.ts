/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Query parameters for folder retrieval.
 *
 * Args:
 * offset (int): The offset of the folders to return as a number of rows. Defaults to 0.
 * limit (int): The limit of the folders to return as a number of rows. Defaults to 100.
 * query (str): The search query to filter folders by name. If provided, only folders whose names contain the query
 * string will be returned.
 * include_public_folders (bool): Whether to include public folders in the results. Defaults to True.
 * include_personal_folders (bool): Whether to include personal folders in the results. Defaults to False.
 * include_empty_folders (bool): Whether to include empty folders in the results. Defaults to False.
 */
export type FolderQuery = {
    offset?: number;
    limit?: (number | null);
    query?: (string | null);
    include_public_folders?: boolean;
    include_private_folders?: boolean;
    include_personal_folders?: boolean;
    include_empty_folders?: boolean;
};

