/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProviderCredentialsOption } from './ProviderCredentialsOption';
export type ProviderConnectionType = {
    /**
     * The type of the connection
     */
    type: string;
    required?: boolean;
    default?: (number | string | null);
    options?: (Array<ProviderCredentialsOption> | null);
    label: string;
    help: string;
    url: string;
    placeholder: string;
};

