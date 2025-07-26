/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A class representing the selected resources to be indexed in a website knowledge base.
 *
 * Attributes:
 * original_search_term (str): The search term that the user did input to get the selected resources.
 * This is used by the frontend to re-create the same folder structure that was displayed when the
 * user made first selected which pages to index, so the selection can easily be edited.
 * selected_resources (list[str]): The list of resource IDs that were selected from the website source.
 */
export type SelectedWebsiteSource = {
    original_search_term: string;
    selected_resources: Array<string>;
};

